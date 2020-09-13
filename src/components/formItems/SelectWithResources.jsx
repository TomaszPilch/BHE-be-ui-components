// @flow
import React from 'react'

import SelectCore from './SelectCore'
import { useFieldWithFetchResourcesOption } from '../../utilities/selects'

// types
import type { SelectCoreProps } from './SelectCore'

export type SelectWithResourcesProps = SelectCoreProps & {
  fetchResources: (string) => any,
  resourceVersion: number,
  t: Function,
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
