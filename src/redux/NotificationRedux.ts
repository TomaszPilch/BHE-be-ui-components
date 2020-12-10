import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {
  IAddErrorNotification,
  IAddInfoNotification,
  IAddNotification,
  IAddSuccessNotification,
  INotificationReduxActions,
  INotificationReduxCreators,
  INotificationReduxTypes,
  NotificationReduxStore,
} from './types/NotificationReduxTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<INotificationReduxTypes, INotificationReduxCreators>({
  addErrorNotification: ['message', 'title', 'translate'],
  addSuccessNotification: ['message', 'title', 'translate'],
  addInfoNotification: ['message', 'title', 'translate'],
  addNotification: ['notificationType', 'message', 'title', 'translate'],
  clearNotifications: null,
})

export const ErrorTypes = Types
export default Creators

export const NOTIFICATION_TYPES = {
  success: 'success',
  error: 'error',
  info: 'info',
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: NotificationReduxStore = Immutable({
  notificationToShow: [],
})

/* ------------- Reducers ------------- */

export const addNotificationR = (
  state: NotificationReduxStore,
  { notificationType, message, title = '', translate = false }: IAddNotification,
) =>
  state.merge({
    // @ts-ignore
    notificationToShow: [...state.notificationToShow, { type: notificationType, message, title, translate }],
  })

export const addError = (state: NotificationReduxStore, { message, title, translate }: IAddErrorNotification) =>
  addNotificationR(state, {
    type: 'ADD_NOTIFICATION',
    notificationType: NOTIFICATION_TYPES.error,
    message,
    title,
    translate,
  })

export const addSuccess = (state: NotificationReduxStore, { message, title, translate }: IAddSuccessNotification) =>
  addNotificationR(state, {
    type: 'ADD_NOTIFICATION',
    notificationType: NOTIFICATION_TYPES.success,
    message,
    title,
    translate,
  })

export const addInfo = (state: NotificationReduxStore, { message, title, translate }: IAddInfoNotification) =>
  addNotificationR(state, {
    type: 'ADD_NOTIFICATION',
    notificationType: NOTIFICATION_TYPES.success,
    message,
    title,
    translate,
  })

export const clearNotificationsR = (state: NotificationReduxStore) => state.merge({ notificationToShow: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<NotificationReduxStore, INotificationReduxActions>(INITIAL_STATE, {
  [Types.ADD_ERROR_NOTIFICATION]: addError,
  [Types.ADD_SUCCESS_NOTIFICATION]: addSuccess,
  [Types.ADD_INFO_NOTIFICATION]: addInfo,
  [Types.ADD_NOTIFICATION]: addNotificationR,
  [Types.CLEAR_NOTIFICATIONS]: clearNotificationsR,
})
