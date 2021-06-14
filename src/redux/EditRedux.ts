// external libs
import { createReducer, createActions } from 'reduxsauce'
import { assoc, assocPath, pipe, path } from 'ramda'

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
  toBase64: ['data', 'fileData'],
  uploadFileRequest: ['data', 'fileBinary'],
})

export const EditTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE: EditReduxStore = {
  fetching: false,
  fetchingConfig: false,
  configs: {} as { [key: string]: FormConfig },
  data: {} as Object,
  dataChanged: false,
  validationErrors: {} as ValidationErrorsType,
}

/* ------------- Reducers ------------- */

export const onEditLoadFormConfigRequestR = (state: EditReduxStore, { data }: IOnEditLoadFormConfigRequest) =>
  pipe<EditReduxStore, EditReduxStore, EditReduxStore>(
    assoc('fetchingConfig', true),
    assocPath(['data', data.module], {}),
  )(state)

export const onEditLoadFormConfigRequestSuccessR = (
  state: EditReduxStore,
  { module, config }: IOnEditLoadFormConfigRequestSuccess,
) =>
  pipe<EditReduxStore, EditReduxStore, EditReduxStore, EditReduxStore>(
    assoc('fetchingConfig', false),
    assocPath(['data', module], DataObjectInit(config)),
    assocPath(['configs', module], config),
  )(state)

export const onEditSetFetchingR = (state: EditReduxStore, { fetching }: IOnEditSetFetching) =>
  assoc('fetching', fetching, state)

export const onEditChangeDataR = (state: EditReduxStore, { path, value }: IOnEditChangeData) =>
  pipe<EditReduxStore, EditReduxStore, EditReduxStore>(
    assocPath(['data', ...path], value),
    assoc('dataChanged', true),
  )(state)

export const onEditLoadFormDataRequestR = (state: EditReduxStore) => assoc('fetching', true, state)

export const onEditLoadFormDataRequestSuccess = (
  state: EditReduxStore,
  { name, data }: IOnEditLoadFormDataRequestSuccess,
) => {
  const dataWitTexts = data.texts && Array.isArray(data.texts) ? { ...data, texts: data.texts[0] } : data
  const dataObject = state.dataChanged ? path([name], state.data) : dataWitTexts
  return pipe<EditReduxStore, EditReduxStore, EditReduxStore>(
    assoc('fetching', true),
    assocPath(['data', name], dataObject),
  )(state)
}

export const onEditValidationRequestR = (state: EditReduxStore) => assoc('fetching', true, state)

export const onEditChangeValidationErrorsR = (
  state: EditReduxStore,
  { validationErrors }: IOnEditChangeValidationErrors,
) => assoc('validationErrors', validationErrors, state)

export const onEditChangeValidationErrorR = (state: EditReduxStore, { path, data }: IOnEditChangeValidationError) =>
  assocPath(['validationErrors', ...path], data, state)

export const onEditSaveRequestR = (state: EditReduxStore) => assoc('fetching', true, state)

export const onEditSaveRequestSuccessR = (state: EditReduxStore) => assoc('fetching', false, state)

export const onUpdateColumnRequestR = (state: EditReduxStore) => assoc('fetching', true, state)

export const onUpdateColumnRequestSuccessR = (state: EditReduxStore) => assoc('fetching', false, state)

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
  [Types.TO_BASE64]: (state) => state,
  [Types.UPLOAD_FILE_REQUEST]: (state) => state,
})
