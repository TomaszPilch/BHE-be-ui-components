// @flow
// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addErrorNotification: ['message', 'title', 'translate'],
  addSuccessNotification: ['message', 'title', 'translate'],
  addInfoNotification: ['message', 'title', 'translate'],
  addNotification: ['type', 'message', 'title', 'translate'],
  clearNotifications: null,
})

export const ErrorTypes = Types
export default Creators

export const NOTIFICATION_TYPES = {
  success: 'success',
  error: 'error',
  info: 'info',
}

export type NotificationType = {
  type: 'success' | 'error' | 'info',
  message: string,
  title: string,
  translate: boolean,
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // eslint-disable-line
  notificationToShow: [],
})

/* ------------- Reducers ------------- */

export const addNotificationR = (state, { type, message, title = '', translate = false }) =>
  state.merge({
    notificationToShow: [...state.notificationToShow, { type, message, title, translate }],
  })

export const addError = (state, { message, title, translate }) =>
  addNotificationR(state, {
    type: NOTIFICATION_TYPES.error,
    message,
    title,
    translate,
  })

export const addSuccess = (state, { message, title, translate }) =>
  addNotificationR(state, {
    type: NOTIFICATION_TYPES.success,
    message,
    title,
    translate,
  })

export const addInfo = (state, { message, title, translate }) =>
  addNotificationR(state, {
    type: NOTIFICATION_TYPES.success,
    message,
    title,
    translate,
  })

export const clearNotificationsR = (state) => state.merge({ notificationToShow: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ERROR_NOTIFICATION]: addError,
  [Types.ADD_SUCCESS_NOTIFICATION]: addSuccess,
  [Types.ADD_INFO_NOTIFICATION]: addInfo,
  [Types.ADD_NOTIFICATION]: addNotificationR,
  [Types.CLEAR_NOTIFICATIONS]: clearNotificationsR,
})
