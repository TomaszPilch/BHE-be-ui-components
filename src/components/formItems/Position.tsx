import React, { memo } from 'react'

// components
import TextInput, { TextFieldProps } from './TextField'
import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

// types

export type PositionFormFieldConfig = FieldConfigBasicTypeStack<'position'>

export interface PositionProps extends DefaultFieldProps<undefined | string> {
  inputProps: Partial<TextFieldProps<'text'>>
  formFieldConfig: PositionFormFieldConfig
}

const Position = (props: PositionProps) => {
  const handleOnChange = (column: string, value: string) => {
    if (typeof props.onChange === 'function') {
      props.onChange(column, value)
    }
  }

  const handleOnBlur = (column: string, value: string) => {
    if (typeof props.onBlur === 'function') {
      props.onBlur(column, value)
    }
  }

  const { editable, formFieldConfig, inputProps, placeholder, label, value, t } = props

  if (!editable) {
    return <span>{value}</span>
  }
  return (
    <TextInput
      formFieldConfig={formFieldConfig}
      label={label}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      placeholder={placeholder}
      value={value === null ? '' : `${value}`}
      t={t}
      {...inputProps}
    />
  )
}

Position.defaultProps = {
  editable: true,
  inputProps: {},
  label: '',
  placeholder: '',
  touched: false,
}

export default memo(Position)
