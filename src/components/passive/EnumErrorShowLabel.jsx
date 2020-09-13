// @flow
import React from 'react'

type EnumErrorShowLabelProps = {
  value: string | number | boolean,
}

const EnumErrorShowLabel = (props: EnumErrorShowLabelProps) => {
  if (!props.value) {
    return null
  }

  return <span className={`enum-error-show-label enum-error-show-label--${props.value}`}>{props.value}</span>
}

export default EnumErrorShowLabel
