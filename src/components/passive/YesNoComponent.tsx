import React from 'react'

import { TranslateFunctionType } from '../../types/TranslationTypes'

// types
export type YesNoPropsTypes = {
  t: TranslateFunctionType
  value: string | number | boolean | Object
}

const YesNoComponent = (props: YesNoPropsTypes) => (
  <span>{props.value ? props.t('general.yes') : props.t('general.no')}</span>
)

export default YesNoComponent
