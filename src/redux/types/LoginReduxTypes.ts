import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import { Action } from 'redux'
import { ImmutableObject } from 'seamless-immutable'

import { DailyImageType, DailyPictureResponseType } from '../../types/DailyPictureTypes'
import { TranslationsType } from '../../types/TranslationTypes'

export interface ILoginReduxTypes extends DefaultActionTypes {
  GET_DAILY_PICTURE: 'GET_DAILY_PICTURE'
  GET_DAILY_PICTURE_SUCCESS: 'getDailyPictureSuccess'
  ON_GET_LOCALE: 'ON_GET_LOCALE'
  ON_GET_LOCALE_SUCCESS: 'onGetLocaleSuccess'
  ON_LOGIN: 'ON_LOGIN'
  ON_LOGIN_SUCCESS: 'onLoginSuccess'
  ON_LOGIN_FAILURE: 'onLoginFailure'
}

export interface IGetDailyPicture extends Action<'GET_DAILY_PICTURE'> {}

export interface IGetDailyPictureSuccess extends Action<'GET_DAILY_PICTURE_SUCCESS'> {
  dailyPicture: DailyPictureResponseType
}

export interface IOnGetLocale extends Action<'ON_GET_LOCALE'> {}

export interface IOnGetLocaleSuccess extends Action<'ON_GET_LOCALE_SUCCESS'> {
  translations: TranslationsType
}

export interface IOnLogin extends Action<'ON_LOGIN'> {
  data: Object
}

export interface IOnLoginSuccess extends Action<'ON_LOGIN_SUCCESS'> {}

export interface IOnLoginFailure extends Action<'ON_LOGIN_FAILURE'> {
  errorCode: string
}

export interface ILoginReduxCreators extends DefaultActionCreators {
  getDailyPicture: () => IGetDailyPicture
  getDailyPictureSuccess: (dailyPicture: DailyPictureResponseType) => IGetDailyPictureSuccess
  onGetLocale: () => IOnGetLocale
  onGetLocaleSuccess: (translations: TranslationsType) => IOnGetLocaleSuccess
  onLogin: (data: Object) => IOnLogin
  onLoginSuccess: () => IOnLoginSuccess
  onLoginFailure: (errorCode: string) => IOnLoginFailure
}

export type ILoginReduxActions =
  | IGetDailyPicture
  | IGetDailyPictureSuccess
  | IOnGetLocale
  | IOnGetLocaleSuccess
  | IOnLogin
  | IOnLoginSuccess
  | IOnLoginFailure

export type LoginReduxStore = ImmutableObject<{
  errorCode: string
  fetching: boolean
  fetchingLocale: boolean
  logged: boolean
  translations: TranslationsType
  dailyImages: DailyImageType[]
}>
