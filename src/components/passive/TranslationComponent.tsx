import React from 'react'

import { TranslateFunctionType } from '../../types/TranslationTypes'

export type TranslationComponentProps = {
  column: { [key: string]: any }
  t: TranslateFunctionType
  value: string | number | boolean | Object
  module: string
}

const TranslationComponent = (props: TranslationComponentProps) => {
  if (typeof props.value === 'undefined') {
    return null
  }
  const {
    module,
    value,
    column: { key },
  } = props
  const columnArray = key.split('.')
  return <span>{props.t(`select.${module}.${columnArray[columnArray.length - 1]}.${value}`)}</span>
}

export default TranslationComponent
