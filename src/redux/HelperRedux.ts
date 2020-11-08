import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import {
  HelperReduxStore,
  IGetResourcesRequestSuccess,
  IHelperReduxActions,
  IHelperReduxCreators,
  IHelperReduxTypes,
  IOnHelperInitData,
  IOnHelperSingleFileUpload,
  IOnHelperSingleFileUploadSuccess,
  IOnHelperStopFetching,
} from './types/HelperReduxTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<IHelperReduxTypes, IHelperReduxCreators>({
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

export const INITIAL_STATE: HelperReduxStore = Immutable({
  data: {} as { [key: string]: Object },
  fetching: {} as { [key: string]: boolean },
  resources: {} as Object,
  resourcesVersion: 0,
})

/* ------------- Reducers ------------- */

export const onInitData = (state: HelperReduxStore, { name, initData }: IOnHelperInitData) =>
  state.setIn(['data', name], initData).setIn(['fetching', name], false)

export const onSingleFileUpload = (state: HelperReduxStore, { name }: IOnHelperSingleFileUpload) =>
  state.setIn(['fetching', name], true)

export const onSingleFileUploadSuccess = (
  state: HelperReduxStore,
  { name, filename }: IOnHelperSingleFileUploadSuccess,
) => state.setIn(['data', name, 'filename'], filename).setIn(['fetching', name], false)

export const stopFetching = (state: HelperReduxStore, { name }: IOnHelperStopFetching) =>
  state.setIn(['fetching', name], false)

const getResourcesRequestSuccessR = (state: HelperReduxStore, { resourceName, data }: IGetResourcesRequestSuccess) =>
  state
    .setIn(['resources', resourceName], data)
    .set(
      'resourcesVersion',
      Array.isArray(data) && data.length
        ? state.getIn(['resourcesVersion'], 0) + 1
        : state.getIn(['resourcesVersion'], 0),
    )

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<HelperReduxStore, IHelperReduxActions>(INITIAL_STATE, {
  [Types.ON_HELPER_INIT_DATA]: onInitData,
  [Types.ON_HELPER_SINGLE_FILE_UPLOAD]: onSingleFileUpload,
  [Types.ON_HELPER_SINGLE_FILE_UPLOAD_SUCCESS]: onSingleFileUploadSuccess,
  [Types.ON_HELPER_STOP_FETCHING]: stopFetching,
  [Types.GET_RESOURCES_REQUEST]: (state) => state,
  [Types.GET_RESOURCES_REQUEST_SUCCESS]: getResourcesRequestSuccessR,
})
