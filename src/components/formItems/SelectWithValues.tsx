import React from 'react'

import SelectCore, { SelectCoreFormFieldConfig } from './SelectCore'

import { SelectItem, useFieldWithOptions } from '../../utilities/selects'

// types
import type { SelectCoreProps } from './SelectCore'

export interface SelectWithValuesFormFieldConfig extends SelectCoreFormFieldConfig {
  pattern?: string
  values: SelectItem[] | string[]
}

export interface SelectWithValuesProps extends SelectCoreProps<SelectItem> {
  formFieldConfig: SelectWithValuesFormFieldConfig
}

const SelectWithValues = (props: SelectWithValuesProps) => {
  const { column, pattern, values } = props.formFieldConfig

  const [options] = useFieldWithOptions(column, values, props.t, pattern, props.formFieldConfig)

  return <SelectCore {...props} options={options} />
}

export default SelectWithValues
