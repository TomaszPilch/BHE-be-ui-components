// @flow
import React, { memo } from 'react'
import moment from 'moment'
import { DatePicker, DayOfWeek, Label } from '@fluentui/react'

// functions
import { useFieldValidation } from '../../utilities/validation'
import { getErrorText } from '../../utilities/utilities'

// types
import type { FieldConfig } from '../../types/FormTypes'

type DatetimeProps = {
  editable: boolean,
  formFieldConfig: FieldConfig,
  label: string,
  onBlur: (string) => void,
  onChange: (string) => void,
  placeholder: string,
  touched: boolean,
  value: string,
}

const Datetime = (props: DatetimeProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (date: Date) => {
    const dateFormatted = moment(date).format('YYYY-MM-DD')
    props.onChange(props.formFieldConfig.column, dateFormatted)
    props.onBlur(props.formFieldConfig.column, dateFormatted)
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
  const valueParsed = valueMoment.isValid() ? valueMoment.toDate() : ''
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

Datetime.defaultProps = {
  editable: true,
  label: '',
  placeholder: '',
  touched: false,
}

export default memo(Datetime)
