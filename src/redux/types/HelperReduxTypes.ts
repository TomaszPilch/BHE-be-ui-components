import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import { Action } from 'redux'

export interface IHelperReduxTypes extends DefaultActionTypes {
  ON_HELPER_INIT_DATA: 'onHelperInitData'
  ON_HELPER_SINGLE_FILE_UPLOAD: 'onHelperSingleFileUpload'
  ON_HELPER_SINGLE_FILE_UPLOAD_SUCCESS: 'onHelperSingleFileUploadSuccess'
  ON_HELPER_STOP_FETCHING: 'onHelperStopFetching'
  GET_RESOURCES_REQUEST: 'GET_RESOURCES_REQUEST'
  GET_RESOURCES_REQUEST_SUCCESS: 'getResourcesRequestSuccess'
}

export interface IOnHelperInitData extends Action<'ON_HELPER_INIT_DATA'> {
  name: string
  initData: Object
}

export interface IOnHelperSingleFileUpload extends Action<'ON_HELPER_SINGLE_FILE_UPLOAD'> {
  name: string
  data: string
  fileType: string
}

export interface IOnHelperSingleFileUploadSuccess extends Action<'ON_HELPER_SINGLE_FILE_UPLOAD_SUCCESS'> {
  name: string
  filename: string
}

export interface IOnHelperStopFetching extends Action<'ON_HELPER_STOP_FETCHING'> {
  name: string
}

export interface IGetResourcesRequest extends Action<'GET_RESOURCES_REQUEST'> {
  resourceName: string
}

export interface IGetResourcesRequestSuccess extends Action<'GET_RESOURCES_REQUEST_SUCCESS'> {
  resourceName: string
  data: Object
}

export interface IHelperReduxCreators extends DefaultActionCreators {
  onHelperInitData: (name: string, initData: Object) => IOnHelperInitData
  onHelperSingleFileUpload: (name: string, data: string, fileType: string) => IOnHelperSingleFileUpload
  onHelperSingleFileUploadSuccess: (name: string, filename: string) => IOnHelperSingleFileUploadSuccess
  onHelperStopFetching: (name: string) => IOnHelperStopFetching
  getResourcesRequest: (resourceName: string) => IGetResourcesRequest
  getResourcesRequestSuccess: (resourceName: string, data: Object) => IGetResourcesRequestSuccess
}

export type IHelperReduxActions =
  | IOnHelperInitData
  | IOnHelperSingleFileUpload
  | IOnHelperSingleFileUploadSuccess
  | IOnHelperStopFetching
  | IGetResourcesRequest
  | IGetResourcesRequestSuccess

export type HelperReduxStore = {
  data: { [key: string]: Object }
  fetching: { [key: string]: boolean }
  resources: Object
  resourcesVersion: number
}
