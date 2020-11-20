import React from 'react'
import { TranslateFunctionType } from '../../types/TranslationTypes'

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

export type ValueToStringProps = {
  value: string | number | boolean | Object
  t: TranslateFunctionType
}

const ValueToString = (props: ValueToStringProps) => <span>{valueToString(props.value, props.t)}</span>

export default ValueToString
