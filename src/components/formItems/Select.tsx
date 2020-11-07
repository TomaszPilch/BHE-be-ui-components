// @flow
import React, { memo } from 'react'

import SelectWithValues from './SelectWithValues'
import SelectWithResources from './SelectWithResources'

// types
import type { SelectWithResourcesProps } from './SelectWithResources'
import type { SelectWithValuesProps } from './SelectWithValues'

export type SelectProps = SelectWithResourcesProps | SelectWithValuesProps

const Select = (props: SelectProps) => {
  const { resourceName } = props.formFieldConfig

  if (resourceName) {
    return <SelectWithResources {...(props as SelectWithResourcesProps)} />
  }

  return <SelectWithValues {...props} />
}

export default memo(Select)
