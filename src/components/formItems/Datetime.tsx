import React, { memo } from 'react'
import moment, { Moment } from 'moment'
import { Label } from '@fluentui/react'
import DateTimeLibrary from 'react-datetime'

import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'
import { useFieldValidation } from '@bheui/form-logic/lib/utilities/validation'
import { getErrorText } from '@bheui/form-logic/lib/utilities/utilities'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

export type DatetimeFormFieldConfig = FieldConfigBasicTypeStack<'datetime'>

export interface DatetimeProps extends DefaultFieldProps<undefined | string> {
  formFieldConfig: DatetimeFormFieldConfig
}

const Datetime = (props: DatetimeProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (date: Moment | string) => {
    const dateFormatted = moment(date).format('YYYY-MM-DD HH:mm')
    if (typeof props.onChange === 'function') {
      props.onChange(props.formFieldConfig.column, dateFormatted)
    }
    if (typeof props.onBlur === 'function') {
      props.onBlur(props.formFieldConfig.column, dateFormatted)
    }
    setTouched(true)
  }

  const { editable, value, label, t } = props

  if (!editable) {
    const valueMomentNotStrict = moment(value)
    return (
      <div>
        <Label>{label}</Label>
        <span>{valueMomentNotStrict.isValid() ? valueMomentNotStrict.format('YYYY-MM-DD HH:mm:ss') : value}</span>
      </div>
    )
  }

  const valueMoment = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.000Z'], true)
  const valueParsed = valueMoment.isValid() ? valueMoment.toDate() : ''
  const errorText = isValid ? '' : getErrorText(errors, t)
  return (
    <>
      <Label>{props.label}</Label>
      <DateTimeLibrary
        className="rdtWrapper"
        dateFormat="DD.MM.YYYY"
        inputProps={{
          className: 'rdtInput',
        }}
        onChange={handleOnChange}
        timeFormat="HH:mm"
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
