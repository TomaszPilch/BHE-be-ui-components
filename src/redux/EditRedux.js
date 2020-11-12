// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// core
import DataObjectInit from '../__core/DataObjectInit'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
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

export const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingConfig: false,
  configs: {},
  data: {},
  dataChanged: false,
  validationErrors: {},
})

/* ------------- Reducers ------------- */

export const onEditLoadFormConfigRequestR = (state, { data }) =>
  state.set('fetchingConfig', true).setIn(['data', data.module], {})

export const onEditLoadFormConfigRequestSuccessR = (state, { module, config }) =>
  state
    .set('fetchingConfig', false)
    .setIn(['data', module], DataObjectInit(config))
    .setIn(['configs', module], config)

export const onEditSetFetchingR = (state, { fetching }) => state.set('fetching', fetching)

export const onEditChangeDataR = (state, { path, value }) =>
  state.setIn(['data', ...path], value).set('dataChanged', true)

export const onEditLoadFormDataRequestR = (state) => state.set('fetching', true)

export const onEditLoadFormDataRequestSuccess = (state, { name, data }) => {
  const dataWitTexts = data.texts && Array.isArray(data.texts) ? { ...data, texts: data.texts[0] } : data
  const dataObject = state.dataChanged ? state.data.getIn([name]) : dataWitTexts
  return state.set('fetching', true).setIn(['data', name], dataObject)
}

export const onEditValidationRequestR = (state) => state.set('fetching', true)

export const onEditChangeValidationErrorsR = (state, { validationErrors }) =>
  state.set('validationErrors', validationErrors)

export const onEditChangeValidationErrorR = (state, { path, data }) => state.setIn(['validationErrors', ...path], data)

export const onEditSaveRequestR = (state) => state.set('fetching', true)

export const onEditSaveRequestSuccessR = (state) => state.set('fetching', false)

export const onUpdateColumnRequestR = (state) => state.set('fetching', true)

export const onUpdateColumnRequestSuccessR = (state) => state.set('fetching', false)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
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
