// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onHelperInitData: ['name', 'initData'],
  onHelperSingleFileUpload: ['name', 'data', 'fileType'],
  onHelperSingleFileUploadSuccess: ['name', 'filename'],
  onHelperStopFetching: ['name'],
  getResourcesRequest: ['resourceName'],
  getResourcesRequestSuccess: ['resourceName', 'data'],
})

export const HelperTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: {},
  resources: {},
  resourcesVersion: 0,
})

/* ------------- Reducers ------------- */

export const onInitData = (state, { name, initData }) => {
  const data = { ...state.data }
  const fetching = { ...state.fetching }
  data[name] = initData
  fetching[name] = false
  return state.merge({ data })
}

export const onSingleFileUpload = (state, { name }) => {
  const fetching = { ...state.fetching }
  fetching[name] = true
  return state.merge({ fetching })
}

export const onSingleFileUploadSuccess = (state, { name, filename }) => {
  const data = { ...state.data }
  const fetching = { ...state.fetching }
  data[name] = { ...data[name], filename }
  fetching[name] = false
  return state.merge({ data, fetching })
}

export const stopFetching = (state, { name }) => {
  const fetching = { ...state.fetching }
  fetching[name] = false
  return state.merge({ fetching })
}

const getResourcesRequestSuccessR = (state, { resourceName, data }) =>
  state
    .setIn(['resources', resourceName], data)
    .set(
      'resourcesVersion',
      Array.isArray(data) && data.length
        ? state.getIn(['resourcesVersion'], 0) + 1
        : state.getIn(['resourcesVersion'], 0),
    )

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_HELPER_INIT_DATA]: onInitData,
  [Types.ON_HELPER_SINGLE_FILE_UPLOAD]: onSingleFileUpload,
  [Types.ON_HELPER_SINGLE_FILE_UPLOAD_SUCCESS]: onSingleFileUploadSuccess,
  [Types.ON_HELPER_STOP_FETCHING]: stopFetching,
  [Types.GET_RESOURCES_REQUEST]: (state) => state,
  [Types.GET_RESOURCES_REQUEST_SUCCESS]: getResourcesRequestSuccessR,
})
