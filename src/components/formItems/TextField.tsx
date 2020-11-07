import React, { FormEvent, memo } from 'react'

// components
import { TextField as FabricTextField, Label } from '@fluentui/react'
import { ITextFieldProps } from 'office-ui-fabric-react/lib/components/TextField/TextField.types'

// utils
import { getErrorText } from '../../utilities/utilities'

// hooks
import { useFieldValidation } from '../../utilities/validation'

// types
import { DefaultFieldActionProps, DefaultFieldProps } from '../../types/FormTypes'

export interface TextFieldProps extends DefaultFieldProps<undefined | string>, DefaultFieldActionProps<string> {
  iconProps: Object
  placeholder: string
  type?: string
  inputProps: ITextFieldProps
}

const TextField = (props: TextFieldProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (_event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setTouched(true)
    props.onChange(props.formFieldConfig.column, newValue || '')
  }

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      value={props.value}
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
