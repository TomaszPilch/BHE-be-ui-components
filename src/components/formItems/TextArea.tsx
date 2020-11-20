import React from 'react'

// components
import TextField from './TextField'

// types
import type { TextFieldProps } from './TextField'

export interface TextAreaProps extends TextFieldProps<'textArea'> {}

const TextArea = (props: TextAreaProps) => {
  return <TextField {...props} inputProps={{ multiline: true, rows: 5, ...props.inputProps }} />
}

export default TextArea
