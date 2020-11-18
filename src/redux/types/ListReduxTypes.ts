import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce'
import { Action } from 'redux'
import { ImmutableArray, ImmutableObject } from 'seamless-immutable'

import {
  DataItemType,
  FilterType,
  ListDataType,
  ListDataTypeResponse,
  ListSettingsType,
  PaginatorType,
  SortObjectType,
} from '../../types/ViewTypes'

export interface IListReduxTypes extends DefaultActionTypes {
  ON_LOAD_LIST_SETTINGS: 'ON_LOAD_LIST_SETTINGS'
  ON_LOAD_LIST_SETTINGS_SUCCESS: 'onLoadListSettingsSuccess'
  ON_LOAD_LIST_DATA: 'ON_LOAD_LIST_DATA'
  ON_LOAD_LIST_DATA_SUCCESS: 'onLoadListDataSuccess'
  ON_LIST_DELETE_REQUEST: 'onListDeleteRequest'
  ON_LIST_DELETE_REQUEST_CONFIRMED: 'ON_LIST_DELETE_REQUEST_CONFIRMED'
  ON_LIST_STOP_FETCHING: 'onListStopFetching'
  ON_LOAD_LIST_WIDGET_SETTINGS: 'ON_LOAD_LIST_WIDGET_SETTINGS'
  ON_LOAD_LIST_WIDGET_DATA: 'ON_LOAD_LIST_WIDGET_DATA'
  ON_LOAD_LIST_WIDGET_DATA_SUCCESS: 'onLoadListWidgetDataSuccess'
  ON_WIDGET_STOP_FETCHING: 'onWidgetStopFetching'
  ON_CHANGE_REFRESH_SIG: 'onChangeRefreshSig'
  ON_CHANGE_FILTER_DATA: 'onChangeFilterData'
}

export interface IOnLoadListSettings extends Action<'ON_LOAD_LIST_SETTINGS'> {}

export interface IOnLoadListSettingsSuccess extends Action<'ON_LOAD_LIST_SETTINGS_SUCCESS'> {
  settings: ListSettingsType
}

export interface IOnLoadListData extends Action<'ON_LOAD_LIST_DATA'> {
  module: string
  page: number
  limit: number
  orderColumn?: string
  orderDirection?: 'DESC' | 'ASC'
  filter: FilterType
}

export interface IOnLoadListDataSuccess extends Action<'ON_LOAD_LIST_DATA_SUCCESS'> {
  data: ListDataTypeResponse
}

export interface IOnListDeleteRequest extends Action<'ON_LIST_DELETE_REQUEST'> {
  modalOpened: boolean
  itemsToDelete: DataItemType[]
}

export interface IOnListDeleteRequestConfirmed extends Action<'ON_LIST_DELETE_REQUEST_CONFIRMED'> {
  moduleName: string
  items: DataItemType[]
}

export interface IOnListStopFetching extends Action<'ON_LIST_STOP_FETCHING'> {}

export interface IOnLoadListWidgetSettings extends Action<'ON_LOAD_LIST_WIDGET_SETTINGS'> {
  module: string
  widgetName: string
}

export interface IOnLoadListWidgetData extends Action<'ON_LOAD_LIST_WIDGET_DATA'> {
  module: string
  widgetName: string
  page: number
  limit: number
  orderColumn?: string
  orderDirection?: 'DESC' | 'ASC'
  filter: FilterType
  parentId: number
  parentModule: string
}

export interface IOnLoadListWidgetDataSuccess extends Action<'ON_LOAD_LIST_WIDGET_DATA_SUCCESS'> {
  module: string
  widgetName: string
  data: ListDataTypeResponse
}

export interface IOnWidgetStopFetching extends Action<'ON_WIDGET_STOP_FETCHING'> {}

export interface IOnChangeRefreshSig extends Action<'ON_CHANGE_REFRESH_SIG'> {
  refreshSig: boolean
}

export interface IOnChangeFilterData extends Action<'ON_CHANGE_FILTER_DATA'> {
  path: string[]
  data: FilterType
}

export interface IListReduxCreators extends DefaultActionCreators {
  onLoadListSettings: () => IOnLoadListSettings
  onLoadListSettingsSuccess: (settings: ListSettingsType) => IOnLoadListSettingsSuccess
  onLoadListData: (
    module: string,
    page: number,
    limit: number,
    orderColumn: string | undefined,
    orderDirection: 'DESC' | 'ASC' | undefined,
    filter: FilterType,
  ) => IOnLoadListData
  onLoadListDataSuccess: (data: ListDataTypeResponse) => IOnLoadListDataSuccess
  onListDeleteRequest: (
    modalOpened: boolean,
    itemsToDelete: DataItemType[] | ImmutableArray<DataItemType>,
  ) => IOnListDeleteRequest
  onListDeleteRequestConfirmed: (
    moduleName: string,
    items: DataItemType[] | ImmutableArray<DataItemType>,
  ) => IOnListDeleteRequestConfirmed
  onListStopFetching: () => IOnListStopFetching
  onLoadListWidgetSettings: (module: string, widgetName: string) => IOnLoadListWidgetSettings
  onLoadListWidgetData: (
    module: string,
    widgetName: string,
    page: number,
    limit: number,
    orderColumn: string | undefined,
    orderDirection: 'DESC' | 'ASC' | undefined,
    filter: FilterType,
    parentId: number,
    parentModule: string,
  ) => IOnLoadListWidgetData
  onLoadListWidgetDataSuccess: (
    module: string,
    widgetName: string,
    data: ListDataTypeResponse,
  ) => IOnLoadListWidgetDataSuccess
  onWidgetStopFetching: () => IOnWidgetStopFetching
  onChangeRefreshSig: (refreshSig: boolean) => IOnChangeRefreshSig
  onChangeFilterData: (path: string[], data: FilterType) => IOnChangeFilterData
}

export type IListReduxActions =
  | IOnLoadListSettings
  | IOnLoadListSettingsSuccess
  | IOnLoadListData
  | IOnLoadListDataSuccess
  | IOnListDeleteRequest
  | IOnListDeleteRequestConfirmed
  | IOnListStopFetching
  | IOnLoadListWidgetSettings
  | IOnLoadListWidgetData
  | IOnLoadListWidgetDataSuccess
  | IOnWidgetStopFetching
  | IOnChangeRefreshSig
  | IOnChangeFilterData

export type ListReduxStore = ImmutableObject<{
  data: ListDataType
  fetching: boolean
  filterData: FilterType
  isSelected: boolean
  itemsToDelete: DataItemType[]
  listSettings: ListSettingsType
  modalOpened: boolean
  paginator: PaginatorType
  refreshSig: boolean
  settingsLoaded: boolean
  sort: SortObjectType
  widgetData: ListDataType
}>
