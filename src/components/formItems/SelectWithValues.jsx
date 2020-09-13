// @flow
import React from 'react'

import SelectCore from './SelectCore'

import { useFieldWithOptions } from '../../utilities/selects'

// types
import type { SelectCoreProps } from './SelectCore'

export type SelectWithValuesProps = SelectCoreProps

const SelectWithValues = (props: SelectWithValuesProps) => {
  const { column, pattern, values } = props.formFieldConfig
  const [options] = useFieldWithOptions(
    column,
    values ? values.asMutable() : [],
    props.t,
    pattern,
    props.formFieldConfig,
    props.options,
  )

  return <SelectCore {...props} options={options} />
}

export default SelectWithValues
