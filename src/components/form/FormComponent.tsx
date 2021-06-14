import React, { useState, useEffect, useCallback, Dispatch, SetStateAction, FormEvent } from 'react'
import { assoc } from 'ramda'

// components
import { PrimaryButton } from '@fluentui/react'
import FormComponentItem from './FormComponentItem'

// utils
import { validate } from '../../utilities/validation'

// types
import {
  DefaultFieldActionProps,
  CustomFormComponentType,
  FormDataType,
  ActionOnBlur,
  ActionOnChange,
  FormConfig,
} from '../../types/FormTypes'
import { FetchResourceType } from '../../utilities/selects'
import { TranslateFunctionType } from '../../types/TranslationTypes'

type StandaloneDataProps = {
  standalone: true
  data?: FormDataType
}

type DataProps = {
  standalone: false
  data: FormDataType
}

interface PropTypes<CustomFormConfig extends FormConfig> extends DefaultFieldActionProps<any> {
  customFormComponents?: CustomFormComponentType
  data?: FormDataType
  defaultData?: FormDataType
  editable: boolean
  fetchResources: FetchResourceType
  formConfig: CustomFormConfig
  labelPrefix: string
  onSubmit: (data: Object) => void
  resourceVersion: number
  showSubmitButton: boolean
  submitButtonText: string
  t: TranslateFunctionType
  touched?: boolean
}

export type FormComponentProps<CustomFormConfig extends FormConfig> =
  | (StandaloneDataProps & PropTypes<CustomFormConfig>)
  | (DataProps & PropTypes<CustomFormConfig>)

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

function useFormComponentHooksFunction<CustomFormConfig extends FormConfig>(
  props: FormComponentProps<CustomFormConfig>,
): [
  boolean,
  FormDataType,
  Dispatch<SetStateAction<FormDataType>>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  ActionOnBlur<any>,
  ActionOnChange<any>,
] {
  const [standalone] = useState<boolean>(!props.data)
  const [data, setData] = useState<FormDataType>(props.defaultData ? props.defaultData : {})
  const [touched, setTouched] = useState<boolean>(false)

  useEffect(() => {
    if (props.defaultData) {
      setData(props.defaultData)
    }
  }, [props.defaultData])

  const handleOnBlur = useCallback((name: string, value: string) => {
    if (standalone) {
      setData((prevData) => assoc(name, value, prevData))
    }
    props.onBlur(name, value)
  }, [])

  const handleOnChange = useCallback((name: string, value: string) => {
    if (standalone) {
      setData((prevData) => assoc(name, value, prevData))
    }
    props.onChange(name, value)
  }, [])
  return [standalone, data, setData, touched, setTouched, handleOnBlur, handleOnChange]
}

export const useFormComponentHooks = useFormComponentHooksFunction

function FormComponent<CustomFormConfig extends FormConfig>(props: FormComponentProps<CustomFormConfig>) {
  const [standalone, data, , touched, setTouched, handleOnBlur, handleOnChange] = useFormComponentHooks(props)

  const handleSubmit = (event: FormEvent<HTMLFormElement> | React.MouseEvent<PrimaryButton | HTMLSpanElement>) => {
    const { formConfig, onSubmit } = props
    if (event && 'preventDefault' in event) {
      event.preventDefault()
    }
    const dataToValidate = (standalone ? data : props.data) as FormDataType
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
      {formConfig.map((fieldConfig: any) => {
        if (fieldConfig.visible === false) {
          return null
        }
        return (
          <FormComponentItem
            key={fieldConfig.name}
            customFormComponents={customFormComponents}
            data={!standalone && props.data ? props.data : data}
            editable={editable}
            fetchResources={fetchResources}
            fieldConfig={fieldConfig}
            labelPrefix={labelPrefix}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            resourceVersion={resourceVersion}
            t={t}
            touched={touched}
          />
        )
      })}
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
