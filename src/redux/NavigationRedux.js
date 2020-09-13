// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onRequestRedirectTo: ['redirectTo', 'redirectToAs'],
  onRedirectSuccess: null,
  onLoadNavigation: ['navigation'],
})

export const NavigationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  redirectTo: '',
  redirectToAs: '',
  navigation: [],
})

/* ------------- Reducers ------------- */

export const requestRedirectTo = (state, { redirectTo, redirectToAs }) => state.merge({ redirectTo, redirectToAs })

export const redirectSuccess = (state) =>
  state.merge({ redirectTo: INITIAL_STATE.redirectTo, redirectToAs: INITIAL_STATE.redirectToAs })

export const loadNavigation = (state, { navigation }) => state.merge({ navigation })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
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
}

export const getNavigationItem = (navigation, moduleName, url = '') =>
  navigation.reduce((acc, item) => {
    if (item.isParent) {
      const fromChildrenNavigation = getNavigationItem(item.items, moduleName, url)
      acc = fromChildrenNavigation && fromChildrenNavigation.actions ? fromChildrenNavigation : acc
    } else if (item.name === moduleName || item.url === `/${url}`) {
      acc = item
    }
    return acc
  }, {})

export const hasRightsForAction = (navigation, moduleName, action) => {
  const navigationItem = getNavigationItem(navigation, moduleName)
  return navigationItem && navigationItem.actions & action
}

export const getAllRights = (navigation, moduleName) =>
  Object.keys(USER_RIGHTS).reduce((acc, action) => {
    acc[USER_RIGHTS[action]] = hasRightsForAction(navigation, moduleName, USER_RIGHTS[action])
    return acc
  }, {})

export const getActionsArray = (rights, moduleActions, t) => {
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
