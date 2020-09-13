// @flow
import React, { memo } from 'react'

import formItems from '../formItems'

const emptyObject = {}
const FormComponentItem = (props) => {
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
    standalone,
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

  let value = standalone ? data[fieldConfig.column] : props.data[fieldConfig.column]
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
      touched={props.touched || touched}
      value={value}
    />
  )
}

export default memo(FormComponentItem)
