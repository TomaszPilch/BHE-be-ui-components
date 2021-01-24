import React, { memo } from 'react'

import TextField from './TextField'

import { TextFieldProps } from './TextField'

export interface NumberFieldProps extends TextFieldProps<'number'> {}

const NumberField = (props: NumberFieldProps) => {
  return <TextField {...props} type="number" value={typeof props.value === 'number' ? `${props.value}` : props.value} />
}

export default memo(NumberField)
