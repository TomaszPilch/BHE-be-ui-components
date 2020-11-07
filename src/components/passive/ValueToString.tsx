import React from 'react'

import { TranslateFunctionType } from '../../types/TranslationTypes'

export const valueToString = (value: any, t: Function) =>
  value === null
    ? ''
    : Array.isArray(value)
    ? `${t('valueToString.typeArray')}`
    : typeof value === 'object'
    ? `${t('valueToString.typeObject')}`
    : value

type ValueToStringProps = {
  value: any
  t: TranslateFunctionType
}

const ValueToString = (props: ValueToStringProps) => <span>{valueToString(props.value, props.t)}</span>

export default ValueToString
