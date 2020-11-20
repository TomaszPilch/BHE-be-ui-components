import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { formatString } from './utilities'

import { TranslateFunctionType } from '../types/TranslationTypes'

export type SelectItem = {
  id: string | number
  value: null | string | number
  label: string
}

export type FetchResourceType = (key: string) => SelectItem[] | string[]

const processValue = (column: string, value: string, translateFunction?: TranslateFunctionType): string => {
  if (typeof translateFunction === 'function') {
    return translateFunction([`select.${column}.${value}`, value])
  }
  return value
}

const createStringOption = (value: string, column: string, translateFunction?: TranslateFunctionType) => ({
  id: value,
  value,
  label: processValue(column, value, translateFunction),
})

const createObjectOption = (
  item: SelectItem,
  column: string,
  translateFunction?: TranslateFunctionType,
  pattern: string = '',
) => ({
  id: item.id,
  value: item.id,
  label: processValue(column, formatString(pattern, item), translateFunction),
})

export const useFieldWithOptions = (
  column: string,
  values: SelectItem[] | string[],
  translateFunction?: TranslateFunctionType,
  pattern?: string,
  formFieldConfig?: Object,
): [SelectItem[], Dispatch<SetStateAction<SelectItem[]>>] => {
  const [options, setOptions] = useState<SelectItem[]>([])

  useEffect(() => {
    if (Array.isArray(values) && values.length) {
      const newOptions: SelectItem[] = []
      values.forEach((item: SelectItem | string) => {
        switch (typeof item) {
          case 'string':
            newOptions.push(createStringOption(item, column, translateFunction))
            break
          case 'object':
            newOptions.push(createObjectOption(item, column, translateFunction, pattern))
            break
        }
      })
      setOptions(newOptions)
    }
  }, [pattern, formFieldConfig])

  return [options, setOptions]
}

export const useFieldWithFetchResourcesOption = (
  column: string,
  fetchResource: FetchResourceType,
  resourceName: string,
  _resourceVersion: number,
  translateFunction?: TranslateFunctionType,
  pattern?: string,
  formFieldConfig?: Object,
): [SelectItem[], Dispatch<SetStateAction<SelectItem[]>>] => {
  const resourceValues = fetchResource(resourceName)
  const [options, setOptions] = useFieldWithOptions(column, resourceValues, translateFunction, pattern, formFieldConfig)
  return [options, setOptions]
}
