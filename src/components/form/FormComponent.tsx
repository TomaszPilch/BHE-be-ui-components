import Immutable from 'seamless-immutable'
import React, { useState, useEffect, useCallback, Dispatch, SetStateAction, FormEvent } from 'react'

// components
import { PrimaryButton } from '@fluentui/react'
import FormComponentItem from './FormComponentItem'

// utils
import { validate } from '../../utilities/validation'

// types
import {
  FormConfig,
  DefaultFieldActionProps,
  CustomFormComponentType,
  ImmutableDataType,
  ActionOnBlur,
  ActionOnChange,
} from '../../types/FormTypes'
import { FetchResourceType } from '../../utilities/selects'
import { TranslateFunctionType } from '../../types/TranslationTypes'

type StandaloneDataProps = {
  standalone: true
  data?: ImmutableDataType
}

type DataProps = {
  standalone: false
  data: ImmutableDataType
}

interface PropTypes extends DefaultFieldActionProps<any> {
  customFormComponents?: CustomFormComponentType
  data?: ImmutableDataType
  defaultData?: ImmutableDataType
  editable: boolean
  fetchResources: FetchResourceType
  formConfig: FormConfig
  labelPrefix: string
  onSubmit: (data: Object) => void
  resourceVersion: number
  showSubmitButton: boolean
  submitButtonText: string
  t: TranslateFunctionType
  touched?: boolean
}

export type FormComponentProps = (StandaloneDataProps & PropTypes) | (DataProps & PropTypes)

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
export const useFormComponentHooks = (
  props: FormComponentProps,
): [
  boolean,
  ImmutableDataType,
  Dispatch<SetStateAction<ImmutableDataType>>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  ActionOnBlur<any>,
  ActionOnChange<any>,
] => {
  const [standalone] = useState<boolean>(!props.data)
  const [data, setData] = useState<ImmutableDataType>(props.defaultData ? props.defaultData : Immutable({}))
  const [touched, setTouched] = useState<boolean>(false)

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

  const handleSubmit = (event: FormEvent<HTMLFormElement> | React.MouseEvent<PrimaryButton | HTMLSpanElement>) => {
    const { formConfig, onSubmit } = props
    if (event && 'preventDefault' in event) {
      event.preventDefault()
    }
    const dataToValidate = (standalone ? data : props.data) as ImmutableDataType
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
      {formConfig.map((fieldConfig) => (
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
