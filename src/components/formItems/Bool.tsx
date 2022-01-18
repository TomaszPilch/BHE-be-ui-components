import React, { memo } from 'react'
import { Label, Toggle } from '@fluentui/react'

import YesNoComponent from '../passive/YesNoComponent'
import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

export type BoolFormFieldFormConfig = FieldConfigBasicTypeStack<'bool'>

export interface BoolProps extends DefaultFieldProps<string | boolean> {
  formFieldConfig: BoolFormFieldFormConfig
}

const Bool = (props: BoolProps) => {
  const handleOnChange = (_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    if (typeof props.onChange === 'function') {
      props.onChange(props.formFieldConfig.column, !!checked)
    }
    if (typeof props.onBlur === 'function') {
      props.onBlur(props.formFieldConfig.column, !!checked)
    }
  }

  if (!props.editable) {
    return (
      <div>
        <Label>{props.label}</Label>
        <YesNoComponent t={props.t} value={!!props.value} />
      </div>
    )
  }
  return (
    <Toggle
      checked={!!props.value}
      label={props.label}
      offText={props.t('general.no')}
      onChange={handleOnChange}
      onText={props.t('general.yes')}
    />
  )
}

Bool.defaultProps = {
  editable: true,
  touched: false,
}

export default memo(Bool)
