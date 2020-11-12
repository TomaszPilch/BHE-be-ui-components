// @flow
import axios from 'axios'
import getConfig from 'next/config'
import authInterceptor from './authInterceptor'

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

export const loginEndpoints = (api: Object) => ({
  login: (data) => api.post('/login', data),
  postSingleImageUpload: (data) => api.post('/upload', data),
})

const endpoints = (api: Object) => {
  const setHeader = (name, value) => {
    if (value) {
      api.defaults.headers.common[name] = value
    } else {
      delete api.defaults.headers.common[name]
    }
  }

  api.interceptors.response.use((response) => response, authInterceptor)

  return {
    // post
    postSingleFileUpload: (data) => api.post('upload/file', data),
    addData: (module, data) => api.post(`add/${module}`, data),
    addValidateData: (module, data) => api.post(`add/validate/${module}`, data),
    editValidateData: (module, data) => api.post(`edit/validate/${module}`, data),

    // put
    editPayment: (data) => api.put('payment/', data),
    editData: (module, data) => api.put(`edit/${module}`, data),
    updateData: (module, data) => api.put(`edit/${module}`, data),
    setActualGroup: (data) => api.put('user/group', data),

    // get
    actualUser: () => api.get('user/actual'),
    isLoggedIn: () => api.get('login/logged-in'),
    locale: () => api.get('locale/'),
    listSettings: () => api.get('list/settings'),
    listWidgetSettings: (module, widgetName) => api.get('list/widget-settings', { params: { module, widgetName } }),
    listData: (module, page, limit, orderColumn, orderDirection, filter) =>
      api.get(`list/${module}/${page}/${limit}/${orderColumn}/${orderDirection}`, { params: { filter } }),
    listWidgetData: (module, widgetName, page, limit, orderColumn, orderDirection, filter, parentId, parentModule) =>
      api.get(`list/${module}/${page}/${limit}/${orderColumn}/${orderDirection}`, {
        params: { filter, widgetName, parentId, parentModule },
      }),
    getAddConfig: (module) => api.get(`add/config/${module}`),
    getViewConfig: (module) => api.get(`view/config/${module}`),
    getEditConfig: (module, id) => api.get(`edit/config/${module}/${id}`),
    getAddData: (module, id) => api.get(`add/${module}/${id}`),
    getViewData: (module, id) => api.get(`view/${module}/${id}`),
    getEditData: (module, id) => api.get(`edit/${module}/${id}`),
    getResources: (resourceName) => api.get(`resources/${resourceName}`),
    getDailyPicture: () => api.get('general/daily-picture'),

    // delete
    removeItems: (module, itemIds) => api.delete(`delete/${module}`, { params: { itemIds } }),
    removeItemsWithMultipleParams: (module, items) => api.delete(`delete/${module}`, { data: items }),

    // helpers
    serverUrl,
    setHeader,
  }
}

export default endpoints
