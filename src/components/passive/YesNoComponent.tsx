import React from 'react'

// types
type YesNoPropsTypes = {
  t: Function
  value: string | number | boolean
}

const YesNoComponent = (props: YesNoPropsTypes) => (
  <span>{props.value ? props.t('general.yes') : props.t('general.no')}</span>
)

export default YesNoComponent
