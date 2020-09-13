// @flow
import React, { memo } from 'react'
import { Label, Toggle } from '@fluentui/react'

import YesNoComponent from '../passive/YesNoComponent'

// types
import type { FieldConfig } from '../../types/FormTypes'

type BoolProps = {
  editable: boolean,
  formFieldConfig: FieldConfig,
  label: string,
  onBlur: (string) => void,
  onChange: (string) => void,
  touched: boolean,
  t: Function,
  value: string,
}

const Bool = (props: BoolProps) => {
  const handleOnChange = (event: SyntheticInputEvent<HTMLInputElement>, checked: boolean) => {
    props.onChange(props.formFieldConfig.column, checked)
    props.onBlur(props.formFieldConfig.column, checked)
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
