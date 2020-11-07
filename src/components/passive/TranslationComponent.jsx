// @flow
import React from 'react'

type TranslationComponentProps = {
  column: string,
  t: Function,
  value: string | number | boolean,
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
