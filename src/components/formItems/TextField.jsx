// @flow
import React, { memo } from 'react'

// components
import { TextField as FabricTextField, Label } from '@fluentui/react'

// utils
import { getErrorText } from '../../utilities/utilities'

// hooks
import { useFieldValidation } from '../../utilities/validation'

// types
import type { FieldConfig } from '../../types/FormTypes'

export type TextFieldProps = {
  editable: boolean,
  formFieldConfig: FieldConfig,
  iconProps: Object,
  inputProps: Object,
  label: string,
  onBlur: (string) => void,
  onChange: (string) => void,
  placeholder: string,
  touched: boolean,
  type?: string,
  value: string,
}

const TextField = (props: TextFieldProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    setTouched(true)
    props.onChange(props.formFieldConfig.column, event.target.value)
  }

  const handleOnBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    setTouched(true)
    props.onBlur(props.formFieldConfig.column, event.target.value)
  }

  if (!props.editable) {
    return (
      <div>
        <Label>{props.label}</Label>
        <span>{props.value}</span>
      </div>
    )
  }
  const errorText = isValid ? '' : getErrorText(errors, props.t)
  return (
    <FabricTextField
      errorMessage={(touched && errorText) || ''}
      iconProps={props.iconProps}
      label={props.label}
      name={props.formFieldConfig.column}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      placeholder={props.placeholder}
      required={props.formFieldConfig.validation && props.formFieldConfig.validation.isRequired}
      type={props.type}
      value={props.value || ''}
      {...props.inputProps}
    />
  )
}

TextField.defaultProps = {
  editable: true,
  iconProps: {},
  inputProps: {},
  label: '',
  placeholder: '',
  touched: false,
  value: '',
}

export default memo(TextField)
