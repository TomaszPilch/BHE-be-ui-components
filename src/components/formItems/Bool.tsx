import React, { memo } from 'react'
import { Label, Toggle } from '@fluentui/react'

import YesNoComponent from '../passive/YesNoComponent'

// types
import { DefaultFieldActionProps, DefaultFieldProps, FieldConfigBasicType } from '../../types/FormTypes'

export interface BoolFormFieldFormConfig extends FieldConfigBasicType {
  type: 'bool'
}

export interface BoolProps extends DefaultFieldProps<string | boolean>, DefaultFieldActionProps<boolean> {
  formFieldConfig: BoolFormFieldFormConfig
}

const Bool = (props: BoolProps) => {
  const handleOnChange = (_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    props.onChange(props.formFieldConfig.column, !!checked)
    props.onBlur(props.formFieldConfig.column, !!checked)
  }

  if (!props.editable) {
    return (
      <div>
        <Label>{props.label}</Label>
        <YesNoComponent t={props.t} value={!!props.value} />
      </div>
    )
  }
  return <Toggle checked={!!props.value} label={props.label} offText="Off" onChange={handleOnChange} onText="On" />
}

Bool.defaultProps = {
  editable: true,
  touched: false,
}

export default memo(Bool)
