import React from 'react'
import ReactSelect from 'react-select'
import { Label } from '@fluentui/react'

import { ValueType } from 'react-select/src/types'
import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'
import { SelectItem } from '@bheui/form-logic/lib/utilities/selects'
import { useFieldValidation } from '@bheui/form-logic/lib/utilities/validation'
import { getErrorText } from '@bheui/form-logic/lib/utilities/utilities'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

export interface SelectCoreFormFieldConfig extends FieldConfigBasicTypeStack<any> {
  className?: string
}

export interface SelectCoreProps<OptionType> extends DefaultFieldProps<undefined | string | number | null> {
  formFieldConfig: SelectCoreFormFieldConfig
  options: OptionType[]
}

function SelectCore<OptionType extends SelectItem, FieldConfig = any>(props: SelectCoreProps<OptionType>) {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (selected: ValueType<OptionType>) => {
    setTouched(true)
    let selectedValue: string | number | null = ''
    if (typeof selected === 'object' && selected !== null && 'value' in selected) {
      selectedValue = selected.value
    }
    if (typeof props.onChange === 'function') {
      props.onChange(props.formFieldConfig.column, selectedValue)
    }
    if (typeof props.onBlur === 'function') {
      props.onBlur(props.formFieldConfig.column, selectedValue)
    }
  }

  const handleNoOptions = (_obj: { inputValue: string }) => props.t('general.selectNoOptions')

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
  if (typeof props.value !== 'undefined') {
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
        noOptionsMessage={handleNoOptions}
        onChange={handleOnChange}
        options={props.options}
        placeholder={props.placeholder || props.t('general.selectValue')}
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
