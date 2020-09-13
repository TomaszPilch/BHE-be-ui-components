// @flow
import React, { memo } from 'react'

import TextField from './TextField'

import type { TextFieldProps } from './TextField'

const NumberField = (props: TextFieldProps) => {
  return <TextField {...props} type="number" />
}

export default memo(NumberField)
