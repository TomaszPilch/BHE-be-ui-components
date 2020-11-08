// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// core
import DataObjectInit from '../__core/DataObjectInit'

import {
  EditReduxStore,
  IEditReduxActions,
  IEditReduxCreators,
  IEditReduxTypes,
  IOnEditChangeData,
  IOnEditChangeValidationError,
  IOnEditChangeValidationErrors,
  IOnEditLoadFormConfigRequest,
  IOnEditLoadFormConfigRequestSuccess,
  IOnEditLoadFormDataRequestSuccess,
  IOnEditSetFetching,
} from './types/EditReduxTypes'
import { ValidationErrorsType } from '../utilities/validationRules'
import { FormConfig } from '../types/FormTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<IEditReduxTypes, IEditReduxCreators>({
  onEditLoadFormConfigRequest: ['data'],
  onEditLoadFormConfigRequestSuccess: ['module', 'config'],
  onEditSetFetching: ['fetching'],
  onEditChangeData: ['path', 'value'],
  onEditLoadFormDataRequest: ['data'],
  onEditLoadFormDataRequestSuccess: ['name', 'data'],
  onEditValidationRequest: ['data'],
  onEditChangeValidationErrors: ['validationErrors'],
  onEditChangeValidationError: ['path', 'data'],
  onEditSaveRequest: ['data'],
  onEditSaveRequestSuccess: ['data'],
  onUpdateColumnRequest: ['data'],
  onUpdateColumnRequestSuccess: ['data'],
})

export const EditTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE: EditReduxStore = Immutable({
  fetching: false,
  fetchingConfig: false,
  configs: {} as { [key: string]: FormConfig },
  data: {} as Object,
  dataChanged: false,
  validationErrors: {} as ValidationErrorsType,
})

/* ------------- Reducers ------------- */

export const onEditLoadFormConfigRequestR = (state: EditReduxStore, { data }: IOnEditLoadFormConfigRequest) =>
  state.set('fetchingConfig', true).setIn(['data', data.module], {})

export const onEditLoadFormConfigRequestSuccessR = (
  state: EditReduxStore,
  { module, config }: IOnEditLoadFormConfigRequestSuccess,
) =>
  state.set('fetchingConfig', false).setIn(['data', module], DataObjectInit(config)).setIn(['configs', module], config)

export const onEditSetFetchingR = (state: EditReduxStore, { fetching }: IOnEditSetFetching) =>
  state.set('fetching', fetching)

export const onEditChangeDataR = (state: EditReduxStore, { path, value }: IOnEditChangeData) =>
  state.setIn(['data', ...path], value).set('dataChanged', true)

export const onEditLoadFormDataRequestR = (state: EditReduxStore) => state.set('fetching', true)

export const onEditLoadFormDataRequestSuccess = (
  state: EditReduxStore,
  { name, data }: IOnEditLoadFormDataRequestSuccess,
) => {
  const dataWitTexts = data.texts && Array.isArray(data.texts) ? { ...data, texts: data.texts[0] } : data
  const dataObject = state.dataChanged ? state.data.getIn([name]) : dataWitTexts
  return state.set('fetching', true).setIn(['data', name], dataObject)
}

export const onEditValidationRequestR = (state: EditReduxStore) => state.set('fetching', true)

export const onEditChangeValidationErrorsR = (
  state: EditReduxStore,
  { validationErrors }: IOnEditChangeValidationErrors,
) => state.set('validationErrors', validationErrors)

export const onEditChangeValidationErrorR = (state: EditReduxStore, { path, data }: IOnEditChangeValidationError) =>
  state.setIn(['validationErrors', ...path], data)

export const onEditSaveRequestR = (state: EditReduxStore) => state.set('fetching', true)

export const onEditSaveRequestSuccessR = (state: EditReduxStore) => state.set('fetching', false)

export const onUpdateColumnRequestR = (state: EditReduxStore) => state.set('fetching', true)

export const onUpdateColumnRequestSuccessR = (state: EditReduxStore) => state.set('fetching', false)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<EditReduxStore, IEditReduxActions>(INITIAL_STATE, {
  [Types.ON_EDIT_LOAD_FORM_CONFIG_REQUEST]: onEditLoadFormConfigRequestR,
  [Types.ON_EDIT_LOAD_FORM_CONFIG_REQUEST_SUCCESS]: onEditLoadFormConfigRequestSuccessR,
  [Types.ON_EDIT_SET_FETCHING]: onEditSetFetchingR,
  [Types.ON_EDIT_CHANGE_DATA]: onEditChangeDataR,
  [Types.ON_EDIT_LOAD_FORM_DATA_REQUEST]: onEditLoadFormDataRequestR,
  [Types.ON_EDIT_LOAD_FORM_DATA_REQUEST_SUCCESS]: onEditLoadFormDataRequestSuccess,
  [Types.ON_EDIT_VALIDATION_REQUEST]: onEditValidationRequestR,
  [Types.ON_EDIT_CHANGE_VALIDATION_ERRORS]: onEditChangeValidationErrorsR,
  [Types.ON_EDIT_CHANGE_VALIDATION_ERROR]: onEditChangeValidationErrorR,
  [Types.ON_EDIT_SAVE_REQUEST]: onEditSaveRequestR,
  [Types.ON_EDIT_SAVE_REQUEST_SUCCESS]: onEditSaveRequestSuccessR,
  [Types.ON_UPDATE_COLUMN_REQUEST]: onUpdateColumnRequestR,
  [Types.ON_UPDATE_COLUMN_REQUEST_SUCCESS]: onUpdateColumnRequestSuccessR,
})
