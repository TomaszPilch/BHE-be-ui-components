import { createReducer, createActions } from 'reduxsauce'
import { assoc, assocPath, pipe, pathOr } from 'ramda'

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

export const INITIAL_STATE: HelperReduxStore = {
  data: {} as { [key: string]: Object },
  fetching: {} as { [key: string]: boolean },
  resources: {} as Object,
  resourcesVersion: 0,
}

/* ------------- Reducers ------------- */

export const onInitData = (state: HelperReduxStore, { name, initData }: IOnHelperInitData) =>
  pipe<HelperReduxStore, HelperReduxStore, HelperReduxStore>(
    assocPath(['data', name], initData),
    assocPath(['fetching', name], false),
  )(state)

export const onSingleFileUpload = (state: HelperReduxStore, { name }: IOnHelperSingleFileUpload) =>
  assocPath(['fetching', name], true, state)

export const onSingleFileUploadSuccess = (
  state: HelperReduxStore,
  { name, filename }: IOnHelperSingleFileUploadSuccess,
) =>
  pipe<HelperReduxStore, HelperReduxStore, HelperReduxStore>(
    assocPath(['data', name, 'filename'], filename),
    assocPath(['fetching', name], false),
  )(state)

export const stopFetching = (state: HelperReduxStore, { name }: IOnHelperStopFetching) =>
  assocPath(['fetching', name], false, state)

const getResourcesRequestSuccessR = (state: HelperReduxStore, { resourceName, data }: IGetResourcesRequestSuccess) =>
  pipe<HelperReduxStore, HelperReduxStore, HelperReduxStore>(
    assocPath(['resources', resourceName], data),
    assoc(
      'resourcesVersion',
      Array.isArray(data) && data.length
        ? pathOr(0, ['resourcesVersion'], state) + 1
        : pathOr(0, ['resourcesVersion'], state),
    ),
  )(state)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<HelperReduxStore, IHelperReduxActions>(INITIAL_STATE, {
  [Types.ON_HELPER_INIT_DATA]: onInitData,
  [Types.ON_HELPER_SINGLE_FILE_UPLOAD]: onSingleFileUpload,
  [Types.ON_HELPER_SINGLE_FILE_UPLOAD_SUCCESS]: onSingleFileUploadSuccess,
  [Types.ON_HELPER_STOP_FETCHING]: stopFetching,
  [Types.GET_RESOURCES_REQUEST]: (state) => state,
  [Types.GET_RESOURCES_REQUEST_SUCCESS]: getResourcesRequestSuccessR,
})
