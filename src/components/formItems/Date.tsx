import React, { memo } from 'react'
import moment from 'moment'
import { DatePicker, DayOfWeek, Label } from '@fluentui/react'

// functions
import { useFieldValidation } from '../../utilities/validation'
import { getErrorText } from '../../utilities/utilities'

// types
import { DefaultFieldActionProps, DefaultFieldProps } from '../../types/FormTypes'
import { FieldConfigBasicType } from '../../types/FormTypes'

export interface DateFormFieldConfig extends FieldConfigBasicType {
  type: 'date'
}

export interface DateProps extends DefaultFieldProps<undefined | string>, DefaultFieldActionProps<string> {
  formFieldConfig: DateFormFieldConfig
  placeholder?: string
}

const Date = (props: DateProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (date: Date | null | undefined) => {
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
