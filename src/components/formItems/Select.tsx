// @flow
import React, { memo } from 'react'

import SelectWithValues from './SelectWithValues'
import SelectWithResources from './SelectWithResources'

// types
import type { SelectWithResourcesProps } from './SelectWithResources'
import type { SelectWithValuesProps } from './SelectWithValues'

export type SelectProps = SelectWithResourcesProps | SelectWithValuesProps

const Select = (props: SelectProps) => {
  if ('resourceName' in props.formFieldConfig) {
    return <SelectWithResources {...(props as SelectWithResourcesProps)} />
  }

  return <SelectWithValues {...(props as SelectWithValuesProps)} />
}

export default memo(Select)
