// @flow
import React, { memo } from 'react'
import moment from 'moment'
import { Label } from '@fluentui/react'
import DateTime from 'react-datetime'

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
  touched: boolean,
  value: string,
}

const Datetime = (props: DatetimeProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (date: Date) => {
    const dateFormatted = moment(date).format('YYYY-MM-DD HH:mm')
    props.onChange(props.formFieldConfig.column, dateFormatted)
    props.onBlur(props.formFieldConfig.column, dateFormatted)
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
      <DateTime
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
