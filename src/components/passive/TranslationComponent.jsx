// @flow
import React from 'react'

type TranslationComponentProps = {
  column: string,
  t: Function,
  value: string | number | boolean,
}

const TranslationComponent = (props: TranslationComponentProps) => {
  if (!props.value) {
    return null
  }

  const columnArray = props.column.split('.')
  return <span>{props.t(`select.${columnArray[columnArray.length - 1]}.${props.value}`)}</span>
}

export default TranslationComponent
