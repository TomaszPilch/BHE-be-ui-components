// @flow
import React, { memo } from 'react'

// components
import TextInput from './TextField'

// types
import type { FieldConfig } from '../../types/FormTypes'

type PositionProps = {
  editable: boolean,
  formFieldConfig: FieldConfig,
  inputProps: Object,
  label: string,
  onBlur: (string) => void,
  onChange: (string) => void,
  placeholder: string,
  touched: boolean,
  value: string,
}

const Position = (props: PositionProps) => {
  const handleOnChange = (value) => {
    props.onChange(props.formFieldConfig.column, value)
  }

  const handleOnBlur = (value) => {
    props.onBlur(props.formFieldConfig.column, value)
  }

  const { editable, formFieldConfig, inputProps, placeholder, label, value } = props

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
