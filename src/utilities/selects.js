// @flow
import { useState, useEffect } from 'react'
import { formatString } from './utilities'

const processValue = (column: string, value: string, translateFunction?: Function) => {
  if (typeof translateFunction === 'function') {
    return translateFunction([`select.${column}.${value}`, value])
  }
  return value
}

const createStringOption = (value: string, column: string, translateFunction?: Function) => ({
  id: value,
  value,
  label: processValue(column, value, translateFunction),
})

const createObjectOption = (item: Object, column: string, translateFunction?: Function, pattern: string = '') => ({
  id: item.id,
  value: item.id,
  label: processValue(column, formatString(pattern, item), translateFunction),
})

export const useFieldWithOptions = (
  column: string,
  values: Object[] | string[],
  translateFunction?: Function,
  pattern?: string,
  formFieldConfig?: Object,
) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (Array.isArray(values) && values.length) {
      const newOptions = []
      values.forEach((item) => {
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
  fetchResource: Function,
  resourceName: string,
  resourceVersion: number,
  translateFunction?: Function,
  pattern?: string,
  formFieldConfig?: Object,
) => {
  const resourceValues = fetchResource(resourceName)
  const [options, setOptions] = useFieldWithOptions(column, resourceValues, translateFunction, pattern, formFieldConfig)
  return [options, setOptions]
}
