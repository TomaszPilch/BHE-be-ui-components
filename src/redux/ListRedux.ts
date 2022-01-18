import { createReducer, createActions } from 'reduxsauce'
import { assocPath, mergeLeft, assoc, pipe } from 'ramda'
import { TranslateFunctionType } from '@bheui/form-logic/lib/types/TranslationTypes'

import {
  IListReduxActions,
  IListReduxCreators,
  IListReduxTypes,
  IOnChangeFilterData,
  IOnChangeRefreshSig,
  IOnListDeleteRequest,
  IOnLoadListDataSuccess,
  IOnLoadListSettingsSuccess,
  ListReduxStore,
} from './types/ListReduxTypes'
import {
  DataItemType,
  FilterType,
  ListDataType,
  ListSettingsType,
  PaginatorType,
  SortObjectType,
} from '../types/ViewTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<IListReduxTypes, IListReduxCreators>({
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

export const INITIAL_STATE: ListReduxStore = {
  data: {} as ListDataType,
  fetching: false,
  filterData: {} as FilterType,
  isSelected: true,
  itemsToDelete: [] as DataItemType[],
  listSettings: {} as ListSettingsType,
  modalOpened: false,
  paginator: {} as PaginatorType,
  refreshSig: false,
  settingsLoaded: false,
  sort: {} as SortObjectType,
  widgetData: {} as ListDataType,
}

/* ------------- Reducers ------------- */

const onLoadSettingsR = (state: ListReduxStore) => assoc('settingsLoaded', false, state)

const onLoadListSettingsSuccessR = (state: ListReduxStore, { settings }: IOnLoadListSettingsSuccess) =>
  pipe(assoc('listSettings', settings), assoc('settingsLoaded', true))(state)

const onLoadDataR = (state: ListReduxStore) => mergeLeft({ fetching: true, isSelected: false }, state)

const onLoadListDataSuccessR = (state: ListReduxStore, { data }: IOnLoadListDataSuccess) => {
  const paginatorObject = {
    limit: data.limit || 20,
    maxCount: data.count || 0,
    maxPage: data.maxPage || 1,
    page: data.page || 1,
  }
  const arrayOfItems = data.data || []
  return pipe<ListReduxStore, ListReduxStore, ListReduxStore, ListReduxStore, ListReduxStore>(
    assoc('fetching', false),
    assocPath(['data', data.module], arrayOfItems),
    assocPath(['paginator', data.module], paginatorObject),
    assocPath(['sort', data.module], {
      column: data.orderColumn || 'id',
      direction: data.orderDirection || 'DESC',
    }),
  )(state)
}

const onListStopFetchingR = (state: ListReduxStore) => mergeLeft({ fetching: false }, state)

const onListDeleteRequestR = (state: ListReduxStore, { modalOpened, itemsToDelete }: IOnListDeleteRequest) =>
  mergeLeft({ modalOpened, itemsToDelete }, state)

const onListDeleteRequestConfirmedR = (state: ListReduxStore) =>
  mergeLeft({ modalOpened: false, itemsToDelete: [] }, state)

const onLoadListWidgetSettingsR = (state: ListReduxStore) => assoc('fetching', true, state)

const onLoadListWidgetDataR = (state: ListReduxStore) => assoc('fetching', true, state)

const onWidgetStopFetchingR = (state: ListReduxStore) => assoc('fetching', false, state)

const onChangeRefreshSigR = (state: ListReduxStore, { refreshSig }: IOnChangeRefreshSig) =>
  assoc('refreshSig', refreshSig, state)

const onChangeFilterDataR = (state: ListReduxStore, { path, data }: IOnChangeFilterData) =>
  assocPath(['filterData', ...path], data, state)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<ListReduxStore, IListReduxActions>(INITIAL_STATE, {
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

export const getColumnValue = (item: { [key: string]: any }, column: string) => {
  if (column.indexOf('.') !== -1) {
    return column.split('.').reduce<{ [key: string]: any } | string>((acc, columnName) => {
      if (Array.isArray(acc) && acc[0] && acc[0][columnName]) {
        acc = acc[0][columnName]
      } else if (!Array.isArray(acc) && typeof acc !== 'string' && acc[columnName]) {
        acc = acc[columnName]
      } else {
        acc = ''
      }
      return acc
    }, item)
  }

  return item[column] as string
}

export const valueToString = (value: any, t: TranslateFunctionType) => {
  if (value === null) {
    return ''
  } else if (Array.isArray(value)) {
    return t('valueToString.typeArray')
  } else if (typeof value === 'object') {
    return t('valueToString.typeObject')
  }
  return value
}
