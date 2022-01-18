import React from 'react'

import {
  FetchResourceType,
  SelectItem,
  useFieldWithFetchResourcesOption,
} from '@bheui/form-logic/lib/utilities/selects'

import SelectCore, { SelectCoreFormFieldConfig } from './SelectCore'

import { SelectCoreProps } from './SelectCore'

export interface SelectWithResourcesFormFieldConfig extends SelectCoreFormFieldConfig {
  type: 'select'
  resourceName: string
  pattern?: string
}

export interface SelectWithResourcesProps extends SelectCoreProps<SelectItem> {
  fetchResources: FetchResourceType
  resourceVersion: number
  formFieldConfig: SelectWithResourcesFormFieldConfig
}

const SelectWithResources = (props: SelectWithResourcesProps) => {
  const { column, resourceName, pattern } = props.formFieldConfig
  const [options] = useFieldWithFetchResourcesOption(
    column,
    props.fetchResources,
    resourceName,
    props.resourceVersion,
    props.t,
    pattern,
    props.resourceVersion,
  )

  return <SelectCore {...props} options={options} />
}

export default SelectWithResources
