// @flow
import React from 'react'

export const valueToString = (value: any, t: Function) => {
  if (value === null) {
    return ''
  }
  if (Array.isArray(value)) {
    return `${t('valueToString.typeArray')}`
  }
  if (typeof value === 'object') {
    return `${t('valueToString.typeObject')}`
  }
  if (typeof value === 'boolean') {
    return `${t(`valueToString.typeBoolean.${value.toString()}`)}`
  }
  return value
}

type ValueToStringProps = {
  value: any,
  t: Function,
}

const ValueToString = (props: ValueToStringProps) => <span>{valueToString(props.value, props.t)}</span>

export default ValueToString
