// @flow
import React from 'react'

export const valueToString = (value: any, t: Function) =>
  value === null
    ? ''
    : Array.isArray(value)
    ? `${t('valueToString.typeArray')}`
    : typeof value === 'object'
    ? `${t('valueToString.typeObject')}`
    : value

type ValueToStringProps = {
  value: any,
  t: Function,
}

const ValueToString = (props: ValueToStringProps) => <span>{valueToString(props.value, props.t)}</span>

export default ValueToString
