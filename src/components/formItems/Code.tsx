import React, { memo } from 'react'
import AceEditor from 'react-ace'
import { Label } from '@fluentui/react'

import 'brace/mode/json'
import 'brace/mode/html'
import 'brace/mode/xml'
import 'brace/theme/tomorrow'
import 'brace/mode/jade'
import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'
import { useFieldValidation } from '@bheui/form-logic/lib/utilities/validation'
import { getErrorText } from '@bheui/form-logic/lib/utilities/utilities'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

export interface CodeFormFieldConfig extends FieldConfigBasicTypeStack<'code'> {
  code?: 'json' | 'html' | 'xml' | 'jade' | string
}

export interface CodeProps extends DefaultFieldProps<undefined | string | Object> {
  formFieldConfig: CodeFormFieldConfig
}

const Code = (props: CodeProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const handleOnChange = (value: string) => {
    setTouched(true)
    if (typeof props.onChange === 'function') {
      props.onChange(props.formFieldConfig.column, value)
    }
  }

  const handleOnBlur = () => {
    setTouched(true)
    if (typeof props.onBlur === 'function') {
      props.onBlur(props.formFieldConfig.column, props.value || '')
    }
  }

  const errorText = isValid ? '' : getErrorText(errors, props.t)
  return (
    <>
      <Label
        htmlFor={props.formFieldConfig.name}
        required={props.formFieldConfig.validation && props.formFieldConfig.validation.isRequired}
      >
        {props.label}
      </Label>
      <AceEditor
        mode={'json' || props.formFieldConfig.code ? props.formFieldConfig.code : ''}
        name={props.formFieldConfig.column}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        readOnly={!props.editable}
        tabSize={2}
        theme="tomorrow"
        value={typeof props.value === 'string' ? props.value : JSON.stringify(props.value, null, '\t')}
      />
      {!isValid && touched && (
        <p className="error-message">
          <span>{errorText}</span>
        </p>
      )}
    </>
  )
}

Code.defaultProps = {
  editable: true,
  touched: false,
}

export default memo(Code)
