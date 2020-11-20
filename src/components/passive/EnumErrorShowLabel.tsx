import React from 'react'

export type EnumErrorShowLabelProps = {
  value: string | number | boolean | Object
}

const EnumErrorShowLabel = (props: EnumErrorShowLabelProps) => {
  if (!props.value) {
    return null
  }

  return <span className={`enum-error-show-label enum-error-show-label--${props.value}`}>{props.value}</span>
}

export default EnumErrorShowLabel
