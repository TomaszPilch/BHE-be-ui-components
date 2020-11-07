import React from 'react'
import ReactSelect from 'react-select'
import { Label } from '@fluentui/react'

import { useFieldValidation } from '../../utilities/validation'
import { getErrorText } from '../../utilities/utilities'
import { DefaultFieldActionProps, DefaultFieldProps } from '../../types/FormTypes'
import { ValueType } from 'react-select/src/types'
import { SelectItem } from '../../utilities/selects'

export interface SelectCoreProps<OptionType, FieldConfig = any>
  extends DefaultFieldProps<undefined | string, FieldConfig>,
    DefaultFieldActionProps<string | number> {
  options: OptionType[]
}

function SelectCore<OptionType extends SelectItem, FieldConfig = any>(props: SelectCoreProps<OptionType, FieldConfig>) {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (selected: ValueType<OptionType>) => {
    setTouched(true)
    let selectedValue: string | number = ''
    if (typeof selected === 'object' && selected !== null && 'value' in selected) {
      selectedValue = selected.value
    }
    props.onChange(props.formFieldConfig.column, selectedValue)
    props.onBlur(props.formFieldConfig.column, selectedValue)
  }

  const errorText = isValid ? '' : getErrorText(errors, props.t)
  if (!props.editable) {
    const selectedOption = props.options.find((option) => props.value === option.value)
    if (selectedOption && selectedOption.label) {
      return (
        <div className={props.formFieldConfig.className || ''}>
          <Label>{props.label}</Label> {selectedOption.label}
        </div>
      )
    }
    return null
  }

  let selectedValue = null
  if ( typeof props.value !== "undefined") {
    selectedValue = props.options.find((option) => `${option.value}` === `${props.value}`)
  }

  return (
    <div className={props.formFieldConfig.className || ''}>
      <Label
        htmlFor={props.formFieldConfig.name}
        required={props.formFieldConfig.validation && props.formFieldConfig.validation.isRequired}
      >
        {props.label}
      </Label>
      <ReactSelect
        className="select-component"
        classNamePrefix="select"
        id={props.formFieldConfig.name}
        isClearable
        onChange={handleOnChange}
        options={props.options}
        value={selectedValue}
      />
      {!isValid && touched && (
        <p className="error-message">
          <span>{errorText}</span>
        </p>
      )}
    </div>
  )
}

SelectCore.defaultProps = {
  editable: true,
  onChange: () => {},
  touched: false,
}

export default SelectCore
