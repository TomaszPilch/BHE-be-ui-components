import React, { memo } from 'react'
import moment from 'moment'
import { DatePicker, DayOfWeek, Label } from '@fluentui/react'

import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'
import { useFieldValidation } from '@bheui/form-logic/lib/utilities/validation'
import { getErrorText } from '@bheui/form-logic/lib/utilities/utilities'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

export type DateFormFieldConfig = FieldConfigBasicTypeStack<'date'>

export interface DateProps extends DefaultFieldProps<undefined | string> {
  formFieldConfig: DateFormFieldConfig
}

const Date = (props: DateProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (date: Date | null | undefined) => {
    const dateFormatted = moment(date).format('YYYY-MM-DD')
    if (typeof props.onChange === 'function') {
      props.onChange(props.formFieldConfig.column, dateFormatted)
    }
    if (typeof props.onBlur === 'function') {
      props.onBlur(props.formFieldConfig.column, dateFormatted)
    }
    setTouched(true)
  }

  const { editable, placeholder, value, label, t } = props

  if (!editable) {
    const valueMomentNotStrict = moment(value)
    return (
      <div>
        <Label>{props.label}</Label>
        <span>{valueMomentNotStrict.isValid() ? valueMomentNotStrict.format('YYYY-MM-DD HH:mm:ss') : value}</span>
      </div>
    )
  }

  const valueMoment = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.000Z'], true)
  const valueParsed = valueMoment.isValid() ? valueMoment.toDate() : undefined
  const errorText = isValid ? '' : getErrorText(errors, t)
  return (
    <>
      <DatePicker
        firstDayOfWeek={DayOfWeek.Monday}
        isRequired={props.formFieldConfig.validation && props.formFieldConfig.validation.isRequired}
        label={label}
        onSelectDate={handleOnChange}
        placeholder={placeholder}
        value={valueParsed}
      />
      {!isValid && touched && (
        <p className="error-message">
          <span>{errorText}</span>
        </p>
      )}
    </>
  )
}

Date.defaultProps = {
  editable: true,
  label: '',
  placeholder: '',
  touched: false,
}

export default memo(Date)
