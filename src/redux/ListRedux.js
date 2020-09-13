// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// core

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onLoadListSettings: null,
  onLoadListSettingsSuccess: ['settings'],
  onLoadListData: ['module', 'page', 'limit', 'orderColumn', 'orderDirection', 'filter'],
  onLoadListDataSuccess: ['data'],
  onListDeleteRequest: ['modalOpened', 'itemsToDelete'],
  onListDeleteRequestConfirmed: ['moduleName', 'items'],
  onListStopFetching: null,
  onLoadListWidgetSettings: ['module', 'widgetName'],
  onLoadListWidgetData: [
    'module',
    'widgetName',
    'page',
    'limit',
    'orderColumn',
    'orderDirection',
    'filter',
    'parentId',
    'parentModule',
  ],
  onLoadListWidgetDataSuccess: ['module', 'widgetName', 'data'],
  onWidgetStopFetching: null,
  onChangeRefreshSig: ['refreshSig'],
  onChangeFilterData: ['path', 'data'],
})

export const ListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: false,
  filterData: {},
  isSelected: true,
  itemsToDelete: [],
  listSettings: {},
  modalOpened: false,
  paginator: {},
  refreshSig: false,
  settingsLoaded: false,
  sort: {},
  widgetData: {},
})

/* ------------- Reducers ------------- */

const onLoadSettingsR = (state) => state.set('settingsLoaded', false)

const onLoadListSettingsSuccessR = (state, { settings }) =>
  state.set('listSettings', settings).set('settingsLoaded', true)

const onLoadDataR = (state) => state.merge({ fetching: true, isSelected: false })

const onLoadListDataSuccessR = (state, { data }) => {
  const paginatorObject = {
    limit: data.limit || 20,
    maxCount: data.count || 0,
    maxPage: data.maxPage || 1,
    page: data.page || 1,
  }
  const arrayOfItems = data.data || []
  return state
    .set('fetching', false)
    .setIn(['data', data.module], arrayOfItems)
    .setIn(['paginator', data.module], paginatorObject)
    .setIn(['sort', data.module], {
      column: data.orderColumn || 'id',
      direction: data.orderDirection || 'DESC',
    })
}

const onListStopFetchingR = (state) => state.merge({ fetching: false })

const onListDeleteRequestR = (state, { modalOpened, itemsToDelete }) => state.merge({ modalOpened, itemsToDelete })

const onListDeleteRequestConfirmedR = (state) => state.merge({ modalOpened: false, itemsToDelete: [] })

const onLoadListWidgetSettingsR = (state) => state.set('fetching', true)

const onLoadListWidgetDataR = (state) => state.set('fetching', true)

const onWidgetStopFetchingR = (state) => state.set('fetching', false)

const onChangeRefreshSigR = (state, { refreshSig }) => state.set('refreshSig', refreshSig)

const onChangeFilterDataR = (state, { path, data }) => state.setIn(['filterData', ...path], data)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_LOAD_LIST_SETTINGS]: onLoadSettingsR,
  [Types.ON_LOAD_LIST_SETTINGS_SUCCESS]: onLoadListSettingsSuccessR,
  [Types.ON_LOAD_LIST_DATA]: onLoadDataR,
  [Types.ON_LOAD_LIST_DATA_SUCCESS]: onLoadListDataSuccessR,
  [Types.ON_LIST_DELETE_REQUEST]: onListDeleteRequestR,
  [Types.ON_LIST_DELETE_REQUEST_CONFIRMED]: onListDeleteRequestConfirmedR,
  [Types.ON_LIST_STOP_FETCHING]: onListStopFetchingR,
  [Types.ON_LOAD_LIST_WIDGET_SETTINGS]: onLoadListWidgetSettingsR,
  [Types.ON_LOAD_LIST_WIDGET_DATA]: onLoadListWidgetDataR,
  [Types.ON_LOAD_LIST_WIDGET_DATA_SUCCESS]: onLoadListDataSuccessR,
  [Types.ON_WIDGET_STOP_FETCHING]: onWidgetStopFetchingR,
  [Types.ON_CHANGE_REFRESH_SIG]: onChangeRefreshSigR,
  [Types.ON_CHANGE_FILTER_DATA]: onChangeFilterDataR,
})

export const getColumnValue = (item, column) => {
  if (column.indexOf('.') !== -1) {
    return column.split('.').reduce((acc, columnName) => {
      if (Array.isArray(acc) && acc[0] && acc[0][columnName]) {
        acc = acc[0][columnName]
      } else if (!Array.isArray(acc) && acc[columnName]) {
        acc = acc[columnName]
      } else {
        acc = ''
      }
      return acc
    }, item)
  }

  return item[column]
}

export const valueToString = (value, t) => {
  if (value === null) {
    return ''
  } else if (Array.isArray(value)) {
    return t('valueToString.typeArray')
  } else if (typeof value === 'object') {
    return t('valueToString.typeObject')
  }
  return value
}
