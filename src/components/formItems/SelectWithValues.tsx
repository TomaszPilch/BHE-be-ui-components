import React from 'react'

import SelectCore from './SelectCore'

import { SelectItem, useFieldWithOptions } from '../../utilities/selects'

// types
import type { SelectCoreProps } from './SelectCore'

export interface SelectWithValuesProps extends SelectCoreProps<SelectItem> {}

const SelectWithValues = (props: SelectWithValuesProps) => {
  const { column, pattern, values } = props.formFieldConfig
  const [options] = useFieldWithOptions(
    column,
    values ? values.asMutable() : [],
    props.t,
    pattern,
    props.formFieldConfig,
  )

  return <SelectCore {...props} options={options} />
}

export default SelectWithValues
