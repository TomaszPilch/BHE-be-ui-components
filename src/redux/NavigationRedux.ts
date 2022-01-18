import { createReducer, createActions } from 'reduxsauce'
import { mergeLeft } from 'ramda'
import { TranslateFunctionType } from '@bheui/form-logic/lib/types/TranslationTypes'

import {
  INavigationReduxActions,
  INavigationReduxCreators,
  INavigationReduxTypes,
  IOnLoadNavigation,
  IOnRequestRedirectTo,
  NavigationReduxStore,
} from './types/NavigationReduxTypes'
import { ActionNames, AllRightsType, NavigationItem } from '../types/NavigationTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<INavigationReduxTypes, INavigationReduxCreators>({
  onRequestRedirectTo: ['redirectTo', 'redirectToAs'],
  onRedirectSuccess: null,
  onLoadNavigation: ['navigation'],
})

export const NavigationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE: NavigationReduxStore = {
  redirectTo: '',
  redirectToAs: '',
  navigation: [],
}

/* ------------- Reducers ------------- */

export const requestRedirectTo = (state: NavigationReduxStore, { redirectTo, redirectToAs }: IOnRequestRedirectTo) =>
  mergeLeft<{ redirectTo: string; redirectToAs?: string }, NavigationReduxStore>({ redirectTo, redirectToAs }, state)

export const redirectSuccess = (state: NavigationReduxStore) =>
  mergeLeft({ redirectTo: INITIAL_STATE.redirectTo, redirectToAs: INITIAL_STATE.redirectToAs }, state)

export const loadNavigation = (state: NavigationReduxStore, { navigation }: IOnLoadNavigation) =>
  mergeLeft({ navigation }, state)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<NavigationReduxStore, INavigationReduxActions>(INITIAL_STATE, {
  [Types.ON_REQUEST_REDIRECT_TO]: requestRedirectTo,
  [Types.ON_REDIRECT_SUCCESS]: redirectSuccess,
  [Types.ON_LOAD_NAVIGATION]: loadNavigation,
})

/* ------------- Helpers ------------- */

export const USER_RIGHTS = {
  LIST: 1,
  VIEW: 2,
  ADD: 4,
  EDIT: 8,
  DELETE: 16,
} as { [key: string]: number }

export function getNavigationItem(navigation: NavigationItem[], moduleName: string, url = ''): NavigationItem {
  return navigation.reduce<NavigationItem>(
    (acc: NavigationItem, item: NavigationItem) => {
      if (item.isParent) {
        const fromChildrenNavigation = getNavigationItem(item.items, moduleName, url)
        acc = fromChildrenNavigation && fromChildrenNavigation.actions ? fromChildrenNavigation : acc
      } else if (item.name === moduleName || item.url === `/${url}`) {
        acc = item
      }
      return acc
    },
    { actions: 0, isParent: false, items: [], name: '', url: '' },
  )
}

export const hasRightsForAction = (
  navigation: NavigationItem[],
  moduleName: string,
  action: number,
): false | number => {
  const navigationItem = getNavigationItem(navigation, moduleName)
  return navigationItem && navigationItem.actions & action
}

export const getAllRights = (navigation: NavigationItem[], moduleName: string) =>
  Object.keys(USER_RIGHTS).reduce<AllRightsType>((acc, action) => {
    const right: number = USER_RIGHTS[action]
    acc[right] = hasRightsForAction(navigation, moduleName, right)
    return acc
  }, {})

export const getActionsArray = (rights: AllRightsType, moduleActions: ActionNames, t: TranslateFunctionType) => {
  const actions = []
  if (rights[USER_RIGHTS.VIEW] && moduleActions.indexOf('view') !== -1) {
    actions.push({
      key: 0,
      label: t('general.view'),
      action: USER_RIGHTS.VIEW,
    })
  }
  if (rights[USER_RIGHTS.EDIT] && moduleActions.indexOf('edit') !== -1) {
    actions.push({
      key: 1,
      label: t('general.edit'),
      action: USER_RIGHTS.EDIT,
    })
  }
  if (rights[USER_RIGHTS.DELETE] && moduleActions.indexOf('delete') !== -1) {
    actions.push({
      key: 2,
      label: t('general.delete'),
      action: USER_RIGHTS.DELETE,
    })
  }
  return actions
}
