import React, { memo } from 'react'

import formItems from '../formItems'

// types
import { CustomFormComponentType, DefaultFieldActionProps, FieldConfig } from '../../types/FormTypes'
import { FetchResourceType } from '../../utilities/selects'
import { TranslateFunctionType } from '../../types/TranslationTypes'

export interface FormComponentItemProps extends DefaultFieldActionProps<any> {
  customFormComponents?: CustomFormComponentType
  editable?: boolean
  fetchResources?: FetchResourceType
  t: TranslateFunctionType
  touched?: boolean
  resourceVersion?: number
  labelPrefix: string
  fieldConfig: FieldConfig
  data: { [key: string]: any }
}

const emptyObject = {}
const FormComponentItem = (props: FormComponentItemProps) => {
  const {
    customFormComponents,
    data,
    editable,
    fetchResources,
    fieldConfig,
    labelPrefix,
    onBlur,
    onChange,
    resourceVersion,
    t,
    touched,
  } = props
  const fieldKey = fieldConfig.column

  if (!fieldConfig) {
    return <span key={fieldKey}>Field config not defined for {fieldKey}</span>
  }

  let Component = formItems[fieldConfig.type]
  if (customFormComponents && customFormComponents[fieldConfig.type]) {
    Component = customFormComponents[fieldConfig.type]
  }
  if (!Component) {
    return (
      <span key={fieldKey}>
        Component not defined for {fieldKey} - {fieldConfig.type}
      </span>
    )
  }

  let value = data[fieldConfig.column]
  if (typeof value === 'undefined') {
    value = ''
  }
  return (
    <Component
      key={fieldKey}
      data={fieldConfig.sendFullData ? data : undefined}
      editable={editable}
      fetchResources={fetchResources}
      formFieldConfig={fieldConfig}
      iconProps={fieldConfig.translated ? { iconName: 'Translate' } : emptyObject}
      inputProps={fieldConfig.inputProps || emptyObject}
      label={t(`${labelPrefix}${fieldConfig.name}`)}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={fieldConfig.defaultValue || ''}
      resourceVersion={resourceVersion}
      t={t}
      touched={touched}
      value={value}
    />
  )
}

export default memo(FormComponentItem)
