// @flow
import React, { memo } from 'react'

import SelectWithValues from './SelectWithValues'
import SelectWithResources from './SelectWithResources'
import MultiSelect from './MultiSelect'

// types
import type { SelectWithResourcesProps } from './SelectWithResources'
import type { SelectWithValuesProps } from './SelectWithValues'

export type SelectProps = SelectWithResourcesProps | SelectWithValuesProps

const Select = (props: SelectProps) => {
  const { resourceName, multi, values } = props.formFieldConfig

  if (resourceName) {
    return <SelectWithResources {...props} />
  }
  if (multi) {
    let options = []
    if (typeof values === 'object') {
      options = Object.keys(values).map((value) => ({
        label: values[value][0],
        value,
      }))
    }
    return <MultiSelect {...props} options={options} />
  }

  return <SelectWithValues {...props} />
}

export default memo(Select)
