export type ListSettingFilterOptionType = {
  key: string
  translate: boolean
  type: 'textBox' | 'selectBox'
  in: string[]
  options: string[]
}

export type ListSettingsItem = {
  filterOptions: ListSettingFilterOptionType[]
  listColumns: string[]
  customListComponents?: {
    [key: string]:
      | string
      | {
          name: string
          [key: string]: any
        }
  }
  columnValues: DataItemType
}

export type ListSettingsType = {
  [key: string]: ListSettingsItem
}

export type DataItemType = {
  id: number | string
  [key: string]: any
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
  type: 'ADD' | 'EDIT' | 'VIEW'
  id?: number
}

export type LoadFormDataResponse = {
  texts: Object | Object[]
}
