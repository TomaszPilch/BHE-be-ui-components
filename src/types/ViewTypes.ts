export type ListSettingsType = {
  [key: string]: Object
}

export type FilterType = {}

export type PaginatorType = {
  page: number
  limit: number
  maxPage: number
  maxCount: number
}

export type SortObjectType = {
  column: string
  direction: 'ASC' | 'DESC'
}

export type ListDataType = {}

export type ListDataTypeResponse = {
  limit?: number
  count?: number
  maxPage?: number
  page?: number
  data: Object[]
  module: string
  orderColumn?: string
  orderDirection: 'ASC' | 'DESC'
}

export type FormConfigRequestData = {
  module: string
}

export type LoadFormDataResponse = {
  texts: Object | Object[]
}
