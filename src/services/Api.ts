import axios, { AxiosInstance, AxiosResponse } from 'axios'
import getConfig from 'next/config'
import authInterceptor from './authInterceptor'

import { FilterType, ListDataTypeResponse, ListSettingsType, LoadFormDataResponse } from '../types/ViewTypes'
import { PresentationItemFromServer, UserType } from '../types/UserTypes'
import { NavigationItem } from '../types/NavigationTypes'
import { FormConfigWithTab } from '../types/FormTypes'
import { DailyPictureResponseType } from '../types/DailyPictureTypes'
import { TranslationsType } from '../types/TranslationTypes'

const { publicRuntimeConfig } = getConfig()

export const serverUrl = publicRuntimeConfig.apiUrl

export const createApi = () =>
  axios.create({
    baseURL: `${serverUrl}/api/v1`,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const createSelfApi = () =>
  axios.create({
    baseURL: `/api`,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export interface ApiLoginEndpointsType {
  login: (data: Object) => Promise<AxiosResponse<{ accessToken: string }>>
}

export const loginEndpoints = (api: AxiosInstance): ApiLoginEndpointsType => ({
  login: (data: Object) => api.post('/login', data),
})

export interface ApiEndpointsType {
  postSingleImageUpload: (data: Object) => Promise<AxiosResponse<Object>>
  postSingleFileUpload: (data: Object) => Promise<AxiosResponse<Object>>
  addData: (module: string, data: Object) => Promise<AxiosResponse<Object>>
  addValidateData: (module: string, data: Object) => Promise<AxiosResponse<Object>>
  editValidateData: (module: string, data: Object) => Promise<AxiosResponse<Object>>

  editPayment: (data: Object) => Promise<AxiosResponse<Object>>
  editData: (module: string, data: Object) => Promise<AxiosResponse<Object>>
  updateData: (module: string, data: Object) => Promise<AxiosResponse<Object>>
  setActualGroup: (data: Object) => Promise<AxiosResponse<{ selectedGroupId: number }>>

  actualUser: () => Promise<
    AxiosResponse<{ user: UserType; presentations: PresentationItemFromServer[]; navigation: NavigationItem[] }>
  >
  locale: () => Promise<AxiosResponse<TranslationsType>>
  listSettings: () => Promise<AxiosResponse<ListSettingsType>>

  listWidgetSettings: (module: string, widgetName: string) => Promise<AxiosResponse<Object>>
  listData: (
    module: string,
    page: number,
    limit: number,
    orderColumn: string,
    orderDirection: 'ASC' | 'DESC',
    filter: FilterType,
  ) => Promise<AxiosResponse<ListDataTypeResponse>>
  listWidgetData: (
    module: string,
    widgetName: string,
    page: number,
    limit: number,
    orderColumn: string,
    orderDirection: 'ASC' | 'DESC',
    filter: FilterType,
    parentId: number,
    parentModule: string,
  ) => Promise<AxiosResponse<ListDataTypeResponse>>
  getAddConfig: (module: string) => Promise<AxiosResponse<{ module: string; config: FormConfigWithTab }>>
  getViewConfig: (module: string) => Promise<AxiosResponse<{ module: string; config: FormConfigWithTab }>>
  getEditConfig: (module: string) => Promise<AxiosResponse<{ module: string; config: FormConfigWithTab }>>
  getAddData: (module: string, id?: number) => Promise<AxiosResponse<LoadFormDataResponse>>
  getViewData: (module: string, id?: number) => Promise<AxiosResponse<LoadFormDataResponse>>
  getEditData: (module: string, id?: number) => Promise<AxiosResponse<LoadFormDataResponse>>
  getResources: (resourceName: string) => Promise<AxiosResponse<Object>>
  getDailyPicture: () => Promise<AxiosResponse<DailyPictureResponseType>>

  removeItems: (module: string, itemIds: number[]) => Promise<AxiosResponse<Object>>
  removeItemsWithMultipleParams: (module: string, items: Object[]) => Promise<AxiosResponse<Object>>

  serverUrl: string
  setHeader: (name: string, value: string) => void
}

const endpoints = (api: AxiosInstance): ApiEndpointsType => {
  const setHeader = (name: string, value: string) => {
    if (value) {
      api.defaults.headers.common[name] = value
    } else {
      delete api.defaults.headers.common[name]
    }
  }

  api.interceptors.response.use((response) => response, authInterceptor)

  return {
    // post
    postSingleImageUpload: (data: Object) => api.post('upload/image', data),
    postSingleFileUpload: (data: Object) => api.post('upload/file', data),
    addData: (module: string, data: Object) => api.post(`add/${module}`, data),
    addValidateData: (module: string, data: Object) => api.post(`add/validate/${module}`, data),
    editValidateData: (module: string, data: Object) => api.post(`edit/validate/${module}`, data),

    // put
    editPayment: (data: Object) => api.put('payment/', data),
    editData: (module: string, data: Object) => api.put(`edit/${module}`, data),
    updateData: (module: string, data: Object) => api.put(`edit/${module}`, data),
    setActualGroup: (data: Object) => api.put('user/group', data),

    // get
    actualUser: () => api.get('user/actual'),
    locale: () => api.get('locale/'),
    listSettings: () => api.get('list/settings'),
    listWidgetSettings: (module: string, widgetName: string) =>
      api.get('list/widget-settings', { params: { module, widgetName } }),
    listData: (
      module: string,
      page: number,
      limit: number,
      orderColumn: string,
      orderDirection: 'ASC' | 'DESC',
      filter: FilterType,
    ) => api.get(`list/${module}/${page}/${limit}/${orderColumn}/${orderDirection}`, { params: { filter } }),
    listWidgetData: (
      module: string,
      widgetName: string,
      page: number,
      limit: number,
      orderColumn: string,
      orderDirection: 'ASC' | 'DESC',
      filter: FilterType,
      parentId: number,
      parentModule: string,
    ) =>
      api.get(`list/${module}/${page}/${limit}/${orderColumn}/${orderDirection}`, {
        params: { filter, widgetName, parentId, parentModule },
      }),
    getAddConfig: (module: string) => api.get(`add/config/${module}`),
    getViewConfig: (module: string) => api.get(`view/config/${module}`),
    getEditConfig: (module: string) => api.get(`edit/config/${module}`),
    getAddData: (module: string, id?: number) => api.get(`add/${module}/${id}`),
    getViewData: (module: string, id?: number) => api.get(`view/${module}/${id}`),
    getEditData: (module: string, id?: number) => api.get(`edit/${module}/${id}`),
    getResources: (resourceName: string) => api.get(`resources/${resourceName}`),
    getDailyPicture: () => api.get('general/daily-picture'),

    // delete
    removeItems: (module: string, itemIds: number[]) => api.delete(`delete/${module}`, { params: { itemIds } }),
    removeItemsWithMultipleParams: (module: string, items: Object[]) => api.delete(`delete/${module}`, { data: items }),

    // helpers
    serverUrl,
    setHeader,
  }
}

export default endpoints
