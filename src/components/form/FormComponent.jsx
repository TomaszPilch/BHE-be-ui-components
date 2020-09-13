// @flow
import React, { useState, useEffect, useCallback } from 'react'
import Immutable from 'seamless-immutable'

// components
import { PrimaryButton } from '@fluentui/react'
import FormComponentItem from './FormComponentItem'

// utils
import { validate } from '../../utilities/validation'

// types
import type { FormConfig, FieldConfig } from '../../types/FormTypes'

export type FormComponentProps = {
  customFormComponents?: Object,
  data?: Object,
  defaultData?: Object,
  editable: boolean,
  fetchResources: (string) => any,
  formConfig: FormConfig,
  labelPrefix: string,
  onBlur: (string, string) => void,
  onChange: (string, string) => void,
  onSubmit: (Object) => void,
  resourceVersion: number,
  showSubmitButton: boolean,
  submitButtonText: string,
  touched?: boolean,
}

export const formComponentDefaultProps = {
  editable: true,
  fetchResources: () => [],
  labelPrefix: '',
  onBlur: () => {},
  onChange: () => {},
  onSubmit: () => {},
  resourceVersion: 0,
  showSubmitButton: false,
  submitButtonText: 'submit',
}
export const useFormComponentHooks = (props: FormComponentProps) => {
  const [standalone] = useState(!props.data)
  const [data, setData] = useState(props.defaultData ? props.defaultData : Immutable({}))
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (props.defaultData) {
      setData(props.defaultData)
    }
  }, [props.defaultData])

  const handleOnBlur = useCallback((name: string, value: string) => {
    if (standalone) {
      setData((prevData) => prevData.set(name, value))
    }
    props.onBlur(name, value)
  }, [])

  const handleOnChange = useCallback((name: string, value: string) => {
    if (standalone) {
      setData((prevData) => prevData.set(name, value))
    }
    props.onChange(name, value)
  }, [])
  return [standalone, data, setData, touched, setTouched, handleOnBlur, handleOnChange]
}

const FormComponent = (props: FormComponentProps) => {
  const [standalone, data, , touched, setTouched, handleOnBlur, handleOnChange] = useFormComponentHooks(props)

  const handleSubmit = (event) => {
    const { formConfig, onSubmit } = props
    if (event) {
      event.preventDefault()
    }
    const dataToValidate = standalone ? data : props.data
    const [isValid] = validate(formConfig, dataToValidate)
    if (isValid) {
      onSubmit(dataToValidate)
    } else {
      setTouched(true)
    }
  }

  const {
    customFormComponents,
    editable,
    fetchResources,
    formConfig,
    labelPrefix,
    resourceVersion,
    showSubmitButton,
    submitButtonText,
    t,
  } = props

  return (
    <form className="w-100" onSubmit={handleSubmit}>
      {formConfig.map((fieldConfig: FieldConfig) => (
        <FormComponentItem
          key={fieldConfig.name}
          customFormComponents={customFormComponents}
          data={data}
          editable={editable}
          fetchResources={fetchResources}
          fieldConfig={fieldConfig}
          labelPrefix={labelPrefix}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          resourceVersion={resourceVersion}
          standalone={standalone}
          t={t}
          touched={touched}
        />
      ))}
      {showSubmitButton && (
        <div className="submitButtonWrapper">
          <PrimaryButton onClick={handleSubmit} text={submitButtonText} type="submit" />
        </div>
      )}
    </form>
  )
}

FormComponent.defaultProps = formComponentDefaultProps
export default FormComponent
