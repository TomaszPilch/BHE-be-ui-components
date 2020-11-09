import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import { Action } from 'redux'
import { ImmutableObject } from 'seamless-immutable'

import { FormConfig, FormConfigWithTab } from '../../types/FormTypes'
import { ValidationErrorsType } from '../../utilities/validationRules'
import { EditDataSaveType, FormConfigRequestData, LoadFormDataResponse } from '../../types/ViewTypes'

export interface IEditReduxTypes extends DefaultActionTypes {
  ON_EDIT_LOAD_FORM_CONFIG_REQUEST: 'ON_EDIT_LOAD_FORM_CONFIG_REQUEST'
  ON_EDIT_LOAD_FORM_CONFIG_REQUEST_SUCCESS: 'onEditLoadFormConfigRequestSuccess'
  ON_EDIT_SET_FETCHING: 'onEditSetFetching'
  ON_EDIT_CHANGE_DATA: 'onEditChangeData'
  ON_EDIT_LOAD_FORM_DATA_REQUEST: 'ON_EDIT_LOAD_FORM_DATA_REQUEST'
  ON_EDIT_LOAD_FORM_DATA_REQUEST_SUCCESS: 'onEditLoadFormDataRequestSuccess'
  ON_EDIT_VALIDATION_REQUEST: 'onEditValidationRequest'
  ON_EDIT_CHANGE_VALIDATION_ERRORS: 'onEditChangeValidationErrors'
  ON_EDIT_CHANGE_VALIDATION_ERROR: 'onEditChangeValidationError'
  ON_EDIT_SAVE_REQUEST: 'ON_EDIT_SAVE_REQUEST'
  ON_EDIT_SAVE_REQUEST_SUCCESS: 'onEditSaveRequestSuccess'
  ON_UPDATE_COLUMN_REQUEST: 'ON_UPDATE_COLUMN_REQUEST'
  ON_UPDATE_COLUMN_REQUEST_SUCCESS: 'onUpdateColumnRequestSuccess'
}

export interface IOnEditLoadFormConfigRequest extends Action<'ON_EDIT_LOAD_FORM_CONFIG_REQUEST'> {
  data: FormConfigRequestData
}

export interface IOnEditLoadFormConfigRequestSuccess extends Action<'ON_EDIT_LOAD_FORM_CONFIG_REQUEST_SUCCESS'> {
  module: string
  config: FormConfigWithTab
}

export interface IOnEditSetFetching extends Action<'ON_EDIT_SET_FETCHING'> {
  fetching: boolean
}

export interface IOnEditChangeData extends Action<'ON_EDIT_CHANGE_DATA'> {
  path: string[]
  value: any
}

export interface IOnEditLoadFormDataRequest extends Action<'ON_EDIT_LOAD_FORM_DATA_REQUEST'> {
  data: FormConfigRequestData
}

export interface IOnEditLoadFormDataRequestSuccess extends Action<'ON_EDIT_LOAD_FORM_DATA_REQUEST_SUCCESS'> {
  name: string
  data: LoadFormDataResponse
}

export interface IOnEditValidationRequest extends Action<'ON_EDIT_VALIDATION_REQUEST'> {
  data: Object
}

export interface IOnEditChangeValidationErrors extends Action<'ON_EDIT_CHANGE_VALIDATION_ERRORS'> {
  validationErrors: ValidationErrorsType
}

export interface IOnEditChangeValidationError extends Action<'ON_EDIT_CHANGE_VALIDATION_ERROR'> {
  path: string[]
  data: Object
}

export interface IOnEditSaveRequest extends Action<'ON_EDIT_SAVE_REQUEST'> {
  data: EditDataSaveType
}

export interface IOnEditSaveRequestSuccess extends Action<'ON_EDIT_SAVE_REQUEST_SUCCESS'> {
  data: Object
}

export interface IOnUpdateColumnRequest extends Action<'ON_UPDATE_COLUMN_REQUEST'> {
  data: EditDataSaveType
}

export interface IOnUpdateColumnRequestSuccess extends Action<'ON_UPDATE_COLUMN_REQUEST_SUCCESS'> {
  data: Object
}

export interface IEditReduxCreators extends DefaultActionCreators {
  onEditLoadFormConfigRequest: (data: FormConfigRequestData) => IOnEditLoadFormConfigRequest
  onEditLoadFormConfigRequestSuccess: (module: string, config: FormConfigWithTab) => IOnEditLoadFormConfigRequestSuccess
  onEditSetFetching: (fetching: boolean) => IOnEditSetFetching
  onEditChangeData: (path: string[], value: any) => IOnEditChangeData
  onEditLoadFormDataRequest: (data: FormConfigRequestData) => IOnEditLoadFormDataRequest
  onEditLoadFormDataRequestSuccess: (name: string, data: Object) => IOnEditLoadFormDataRequestSuccess
  onEditValidationRequest: (data: Object) => IOnEditValidationRequest
  onEditChangeValidationErrors: (validationErrors: ValidationErrorsType) => IOnEditChangeValidationErrors
  onEditChangeValidationError: (path: string[], data: Object) => IOnEditChangeValidationError
  onEditSaveRequest: (data: EditDataSaveType) => IOnEditSaveRequest
  onEditSaveRequestSuccess: (data: Object) => IOnEditSaveRequestSuccess
  onUpdateColumnRequest: (data: EditDataSaveType) => IOnUpdateColumnRequest
  onUpdateColumnRequestSuccess: (data: Object) => IOnUpdateColumnRequestSuccess
}

export type IEditReduxActions =
  | IOnEditLoadFormConfigRequest
  | IOnEditLoadFormConfigRequestSuccess
  | IOnEditSetFetching
  | IOnEditChangeData
  | IOnEditLoadFormDataRequest
  | IOnEditLoadFormDataRequestSuccess
  | IOnEditValidationRequest
  | IOnEditChangeValidationErrors
  | IOnEditChangeValidationError
  | IOnEditSaveRequest
  | IOnEditSaveRequestSuccess
  | IOnUpdateColumnRequest
  | IOnUpdateColumnRequestSuccess

export type EditReduxStore = ImmutableObject<{
  fetching: boolean
  fetchingConfig: boolean
  configs: { [key: string]: FormConfig }
  data: Object
  dataChanged: boolean
  validationErrors: ValidationErrorsType
}>
