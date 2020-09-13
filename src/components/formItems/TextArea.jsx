// @flow
import React from 'react'

// components
import TextField from './TextField'

// types
import type { TextFieldProps } from './TextField'

type TextAreaProps = TextFieldProps

const TextArea = (props: TextAreaProps) => {
  return <TextField {...props} inputProps={{ multiline: true, rows: 5 }} />
}

export default TextArea
