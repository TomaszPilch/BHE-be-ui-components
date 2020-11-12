import React, { memo } from 'react'
import moment, { Moment } from 'moment'
import { Label } from '@fluentui/react'
import DateTimeLibrary from 'react-datetime'

// functions
import { useFieldValidation } from '../../utilities/validation'
import { getErrorText } from '../../utilities/utilities'

// types
import { DefaultFieldActionProps, DefaultFieldProps, FieldConfigBasicType } from '../../types/FormTypes'

export interface DatetimeFormFieldConfig extends FieldConfigBasicType {
  type: 'datetime'
}

export interface DatetimeProps extends DefaultFieldProps<undefined | string>, DefaultFieldActionProps<string> {
  formFieldConfig: DatetimeFormFieldConfig
}

const Datetime = (props: DatetimeProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (date: Moment | string) => {
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
