import React from 'react'

import SelectCore from './SelectCore'
import { FetchResourceType, SelectItem, useFieldWithFetchResourcesOption } from '../../utilities/selects'

// types
import type { SelectCoreProps } from './SelectCore'

export interface SelectWithResourcesProps
  extends SelectCoreProps<
    SelectItem,
    {
      resourceName: string
    }
  > {
  fetchResources: FetchResourceType
  resourceVersion: number
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
