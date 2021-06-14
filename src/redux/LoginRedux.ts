import { createReducer, createActions } from 'reduxsauce'
import { assoc, mergeLeft } from 'ramda'

import preProcessLocale from '../__core/PreProcessLocale'

import {
  IGetDailyPictureSuccess,
  ILoginReduxActions,
  ILoginReduxCreators,
  ILoginReduxTypes,
  IOnGetLocaleSuccess,
  IOnLoginFailure,
  LoginReduxStore,
} from './types/LoginReduxTypes'
import { TranslationsType } from '../types/TranslationTypes'
import { DailyImageType } from '../types/DailyPictureTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<ILoginReduxTypes, ILoginReduxCreators>({
  getDailyPicture: null,
  getDailyPictureSuccess: ['dailyPicture'],
  onGetLocale: null,
  onGetLocaleSuccess: ['translations'],
  onLogin: ['data'],
  onLoginSuccess: null,
  onLoginFailure: ['errorCode'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE: LoginReduxStore = {
  errorCode: '',
  fetching: false,
  fetchingLocale: false,
  logged: false,
  translations: {} as TranslationsType,
  dailyImages: [] as DailyImageType[],
}

/* ------------- Reducers ------------- */

export const getDailyPictureSuccessR = (state: LoginReduxStore, { dailyPicture }: IGetDailyPictureSuccess) => {
  if (Array.isArray(dailyPicture.images) && dailyPicture.images.length) {
    return assoc('dailyImages', dailyPicture.images, state)
  }
  return state
}

export const onGetLocaleR = (state: LoginReduxStore) => assoc('fetchingLocale', true, state)

export const onGetLocaleSuccessR = (state: LoginReduxStore, { translations }: IOnGetLocaleSuccess) =>
  mergeLeft({ translations: preProcessLocale(translations), fetchingLocale: false }, state)

export const onLoginR = (state: LoginReduxStore) => mergeLeft({ errorCode: '', fetching: true }, state)

export const onLoginSuccessR = (state: LoginReduxStore) => mergeLeft({ fetching: false, logged: true }, state)

export const onLoginFailureR = (state: LoginReduxStore, { errorCode }: IOnLoginFailure) =>
  mergeLeft(
    {
      errorCode,
      fetching: false,
    },
    state,
  )

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<LoginReduxStore, ILoginReduxActions>(INITIAL_STATE, {
  [Types.GET_DAILY_PICTURE]: (state) => state,
  [Types.GET_DAILY_PICTURE_SUCCESS]: getDailyPictureSuccessR,
  [Types.ON_GET_LOCALE]: onGetLocaleR,
  [Types.ON_GET_LOCALE_SUCCESS]: onGetLocaleSuccessR,
  [Types.ON_LOGIN]: onLoginR,
  [Types.ON_LOGIN_SUCCESS]: onLoginSuccessR,
  [Types.ON_LOGIN_FAILURE]: onLoginFailureR,
})
