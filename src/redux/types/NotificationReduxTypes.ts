import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import { Action } from 'redux'
import { ImmutableObject } from 'seamless-immutable'

export type NotificationType = {
  type: 'success' | 'error' | 'info'
  message: string
  title: string
  translate: boolean
}

export interface INotificationReduxTypes extends DefaultActionTypes {
  ADD_ERROR_NOTIFICATION: 'addErrorNotification'
  ADD_SUCCESS_NOTIFICATION: 'addSuccessNotification'
  ADD_INFO_NOTIFICATION: 'addInfoNotification'
  ADD_NOTIFICATION: 'addNotification'
  CLEAR_NOTIFICATIONS: 'clearNotifications'
}

export interface IAddErrorNotification
  extends Action<'ADD_ERROR_NOTIFICATION'>,
    Pick<NotificationType, 'message' | 'title' | 'translate'> {}

export interface IAddSuccessNotification
  extends Action<'ADD_SUCCESS_NOTIFICATION'>,
    Pick<NotificationType, 'message' | 'title' | 'translate'> {}

export interface IAddInfoNotification
  extends Action<'ADD_INFO_NOTIFICATION'>,
    Pick<NotificationType, 'message' | 'title' | 'translate'> {}

export interface IAddNotification
  extends Action<'ADD_NOTIFICATION'>,
    Pick<NotificationType, 'message' | 'title' | 'translate'> {
  notificationType: string
}

export interface IClearNotifications extends Action<'CLEAR_NOTIFICATIONS'> {}

type SetNotificationType<ReturnType> = (message: string, title: string, translate?: boolean) => ReturnType

export interface INotificationReduxCreators extends DefaultActionCreators {
  addErrorNotification: SetNotificationType<IAddErrorNotification>
  addSuccessNotification: SetNotificationType<IAddSuccessNotification>
  addInfoNotification: SetNotificationType<IAddInfoNotification>
  addNotification: (
    notificationType: NotificationType['type'],
    message: string,
    title: string,
    translate?: boolean,
  ) => IAddNotification
  clearNotifications: () => IClearNotifications
}

export type INotificationReduxActions =
  | IAddErrorNotification
  | IAddSuccessNotification
  | IAddInfoNotification
  | IAddNotification
  | IClearNotifications

export type NotificationReduxStore = ImmutableObject<{
  notificationToShow: Array<NotificationType>
}>
