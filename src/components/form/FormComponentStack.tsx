import React, { useState, useEffect, FormEvent } from 'react'

// components
import { Stack, PrimaryButton } from '@fluentui/react'
import { formComponentDefaultProps, useFormComponentHooks } from './FormComponent'
import FormComponentItem from './FormComponentItem'

// utils
import { validate } from '../../utilities/validation'

// types
import type { FieldConfigBasicType, FieldConfigWithStackRow, FormConfig } from '../../types/FormTypes'
import type { FormComponentProps } from './FormComponent'
import { ImmutableDataType } from '../../types/FormTypes'

const getColumnFromField = (field: FieldConfigBasicType) => (field.stackSettings ? field.stackSettings.column || 0 : 0)
const generateFormConfigWithStackTokens = (formConfig: FormConfig) =>
  formConfig
    .reduce<FieldConfigWithStackRow[]>((acc, field) => {
      let row = acc.length
      if (field.stackSettings) {
        row = field.stackSettings.row || 0
      }
      if (!acc[row] || !Array.isArray(acc[row].items)) {
        acc[row] = {
          items: [],
          tokens: {},
        }
      }
      if (field.stackSettings) {
        acc[row].tokens.childrenGap = field.stackSettings.rowChildrenGap || 15
        if (!acc[row].tokens.padding) {
          acc[row].tokens.padding = 5
        }
        if (field.stackSettings.rowPadding) {
          acc[row].tokens.padding = field.stackSettings.rowPadding
        }
        if (field.stackSettings.rowMaxHeight) {
          acc[row].tokens.maxHeight = field.stackSettings.rowMaxHeight
        }
        if (field.stackSettings.rowMaxWidth) {
          acc[row].tokens.maxWidth = field.stackSettings.rowMaxWidth
        }
      }
      acc[row].items.push(field)
      acc[row].items.sort((field1, field2) => getColumnFromField(field1) - getColumnFromField(field2))
      return acc
    }, [])
    .filter((row) => !!row)

function FormComponentStack<CustomFormConfig extends FormConfig>(props: FormComponentProps<CustomFormConfig>) {
  const [formConfigStack, setFormConfig] = useState(generateFormConfigWithStackTokens(props.formConfig))
  const [standalone, data, , touched, setTouched, handleOnBlur, handleOnChange] = useFormComponentHooks(props)

  useEffect(() => {
    setFormConfig(generateFormConfigWithStackTokens(props.formConfig))
  }, [props.formConfig])

  const handleSubmit = (event: FormEvent<HTMLFormElement> | React.MouseEvent<PrimaryButton | HTMLSpanElement>) => {
    const { formConfig, onSubmit } = props
    if (event) {
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
    labelPrefix,
    resourceVersion,
    showSubmitButton,
    submitButtonText,
    t,
  } = props

  return (
    <Stack styles={{ root: { overflow: 'visible' } }} tokens={{ childrenGap: 10 }}>
      <form className="w-100" onSubmit={handleSubmit}>
        {formConfigStack.map((fieldsRow) => {
          const key = fieldsRow.items.reduce((acc, field) => `${acc}-${field.column}`, '')
          return (
            <Stack
              key={`row-${key}`}
              grow
              horizontal
              horizontalAlign="start"
              styles={{ root: { overflow: 'visible' } }}
              tokens={fieldsRow.tokens}
            >
              {fieldsRow.items.map((fieldConfig) => (
                <Stack
                  key={`component-${fieldConfig.column}`}
                  grow
                  styles={{ root: { overflow: 'visible', display: 'flex' } }}
                  tokens={fieldConfig.tokens}
                >
                  <FormComponentItem
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
                </Stack>
              ))}
            </Stack>
          )
        })}
        {showSubmitButton && (
          <div className="submitButtonWrapper">
            <PrimaryButton onClick={handleSubmit} text={submitButtonText} type="submit" />
          </div>
        )}
      </form>
    </Stack>
  )
}

FormComponentStack.defaultProps = formComponentDefaultProps
export default FormComponentStack
