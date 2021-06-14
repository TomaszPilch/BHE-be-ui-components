import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import { Action } from 'redux'

import { NavigationItem } from '../../types/NavigationTypes'

export interface INavigationReduxTypes extends DefaultActionTypes {
  ON_REQUEST_REDIRECT_TO: 'onRequestRedirectTo'
  ON_REDIRECT_SUCCESS: 'onRedirectSuccess'
  ON_LOAD_NAVIGATION: 'onLoadNavigation'
}

export interface IOnRequestRedirectTo extends Action<'ON_REQUEST_REDIRECT_TO'> {
  redirectTo: string
  redirectToAs?: string
}

export interface IOnRedirectSuccess extends Action<'ON_REDIRECT_SUCCESS'> {}

export interface IOnLoadNavigation extends Action<'ON_LOAD_NAVIGATION'> {
  navigation: NavigationItem[]
}

export interface INavigationReduxCreators extends DefaultActionCreators {
  onRequestRedirectTo: (redirectTo: string, redirectToAs?: string) => IOnRequestRedirectTo
  onRedirectSuccess: () => IOnRedirectSuccess
  onLoadNavigation: (navigation: any) => IOnLoadNavigation
}

export type INavigationReduxActions = IOnRequestRedirectTo | IOnRedirectSuccess | IOnLoadNavigation

export type NavigationReduxStore = {
  redirectTo: string
  redirectToAs: string
  navigation: NavigationItem[]
}
