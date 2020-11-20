import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import { Action } from 'redux'
import { ImmutableObject } from 'seamless-immutable'

import { PresentationItemFromServer, UserGroup, UserType } from '../../types/UserTypes'

export interface IUserReduxTypes extends DefaultActionTypes {
  ON_GET_ACTUAL_USER_REQUEST: 'ON_GET_ACTUAL_USER_REQUEST'
  ON_LOAD_USER: 'onLoadUser'
  ON_CHANGE_PRESENTATION_ID: 'onChangePresentationId'
  ON_CHANGE_USER_GROUP_REQUEST: 'ON_CHANGE_USER_GROUP_REQUEST'
  ON_CHANGE_USER_GROUP_SUCCESS: 'onChangeUserGroupSuccess'
}

export interface IOnGetActualUserRequest extends Action<'ON_GET_ACTUAL_USER_REQUEST'> {}

export interface IOnLoadUser extends Action<'ON_LOAD_USER'> {
  user: UserType
  presentations: PresentationItemFromServer[]
}

export interface IOnChangePresentationId extends Action<'ON_CHANGE_PRESENTATION_ID'> {
  presentationId: number
}

export interface IOnChangeUserGroupRequest extends Action<'ON_CHANGE_USER_GROUP_REQUEST'> {
  selectedGroupId: number
}

export interface IOnChangeUserGroupSuccess extends Action<'ON_CHANGE_USER_GROUP_SUCCESS'> {
  selectedGroupId: number
}

export interface IUserReduxCreators extends DefaultActionCreators {
  onGetActualUserRequest: () => IOnGetActualUserRequest
  onLoadUser: (user: UserType, presentations: PresentationItemFromServer[]) => IOnLoadUser
  onChangePresentationId: (presentationId: string) => IOnChangePresentationId
  onChangeUserGroupRequest: (selectedGroupId: number) => IOnChangeUserGroupRequest
  onChangeUserGroupSuccess: (selectedGroupId: number) => IOnChangeUserGroupSuccess
}

export type IUserReduxActions =
  | IOnGetActualUserRequest
  | IOnLoadUser
  | IOnChangePresentationId
  | IOnChangeUserGroupRequest
  | IOnChangeUserGroupSuccess

export type UserReduxStore = ImmutableObject<{
  userLoaded: boolean
  email: string
  image: string
  username: string
  name: string
  surname: string
  phone: string
  role: number
  userGroups: UserGroup[]
  presentations?: string[]
  presentationIds: string[]
  presentationId: string
  selectedGroup: UserGroup
}>
