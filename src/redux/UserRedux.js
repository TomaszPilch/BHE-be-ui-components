// @flow
// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// types
import type { UserGroup } from '../types/UserTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetActualUserRequest: null,
  onLoadUser: ['user', 'presentations'],
  onChangePresentationId: ['presentationId'],
  onChangeUserGroupRequest: ['selectedGroupId'],
  onChangeUserGroupSuccess: ['selectedGroupId'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userLoaded: false,
  email: '',
  image: '',
  username: '',
  name: '',
  surname: '',
  phone: '',
  role: 0,
  userGroups: [
    {
      key: 0,
      label: 'None',
    },
  ],
  presentationIds: ['en', 'cs', 'pl'],
  presentationId: 'en',
  selectedGroup: {
    key: 0,
    label: 'None',
  },
})

/* ------------- Reducers ------------- */

export const onGetActualUserRequestR = (state) => state.set('userLoaded', false)

export const loadUser = (state, { user, presentations }) =>
  state.merge({
    ...user,
    userLoaded: true,
    presentations: presentations.map((presentation) => presentation.label),
    selectedGroup: user.userGroups.filter((group: UserGroup) => group.key === user.selectedGroupId)[0],
  })

const onChangePresentationIdR = (state, { presentationId }: { presentationId: number }) =>
  state.set('presentationId', presentationId)

const changeUserGroupSuccessR = (state, { selectedGroupId }: { selectedGroupId: number }) =>
  state.set('selectedGroup', state.userGroups.filter((group: UserGroup) => group.key === selectedGroupId)[0])

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_CHANGE_PRESENTATION_ID]: onChangePresentationIdR,
  [Types.ON_CHANGE_USER_GROUP_REQUEST]: (state) => state,
  [Types.ON_CHANGE_USER_GROUP_SUCCESS]: changeUserGroupSuccessR,
  [Types.ON_GET_ACTUAL_USER_REQUEST]: onGetActualUserRequestR,
  [Types.ON_LOAD_USER]: loadUser,
})
