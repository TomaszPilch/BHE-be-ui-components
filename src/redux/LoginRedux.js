// @flow
// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import preProcessLocale from '../__core/PreProcessLocale'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
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

export const INITIAL_STATE = Immutable({
  errorCode: '',
  fetching: false,
  fetchingLocale: false,
  logged: false,
  translations: {},
  dailyImages: [],
})

/* ------------- Reducers ------------- */

export const getDailyPictureSuccessR = (state, { dailyPicture }) => {
  if (Array.isArray(dailyPicture.images) && dailyPicture.images.length) {
    return state.set('dailyImages', dailyPicture.images)
  }
  return state
}

export const onGetLocaleR = (state) => state.merge({ fetchingLocale: true })

export const onGetLocaleSuccessR = (state, { translations }) =>
  state.merge({ translations: preProcessLocale(translations), fetchingLocale: false })

export const onLoginR = (state) => state.merge({ errorCode: '', fetching: true })

export const onLoginSuccessR = (state) => state.merge({ fetching: false, logged: true })

export const onLoginFailureR = (state, { errorCode }) =>
  state.merge({
    errorCode,
    fetching: false,
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DAILY_PICTURE]: (state) => state,
  [Types.GET_DAILY_PICTURE_SUCCESS]: getDailyPictureSuccessR,
  [Types.ON_GET_LOCALE]: onGetLocaleR,
  [Types.ON_GET_LOCALE_SUCCESS]: onGetLocaleSuccessR,
  [Types.ON_LOGIN]: onLoginR,
  [Types.ON_LOGIN_SUCCESS]: onLoginSuccessR,
  [Types.ON_LOGIN_FAILURE]: onLoginFailureR,
})
