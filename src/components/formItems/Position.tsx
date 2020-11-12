import React, { memo } from 'react'

// components
import TextInput, { TextFieldProps } from './TextField'

// types
import { DefaultFieldActionProps, DefaultFieldProps, FieldConfigBasicType } from '../../types/FormTypes'

export interface PositionFormFieldConfig extends FieldConfigBasicType {
  type: 'position'
}

export interface PositionProps extends DefaultFieldProps<undefined | string>, DefaultFieldActionProps<string> {
  inputProps: Partial<TextFieldProps<'text'>>
  placeholder?: string
  formFieldConfig: PositionFormFieldConfig
}

const Position = (props: PositionProps) => {
  const handleOnChange = (column: string, value: string) => {
    props.onChange(column, value)
  }

  const handleOnBlur = (column: string, value: string) => {
    props.onBlur(column, value)
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
