// @flow
import React, { memo } from 'react'
import { Stack, Toggle } from '@fluentui/react'

// components

// functions
import { useFieldValidation } from '../../utilities/validation'
import { getErrorText } from '../../utilities/utilities'

// types
import type { FieldConfig } from '../../types/FormTypes'

type ActionPermissionFormFieldProps = {
  editable: boolean,
  formFieldConfig: FieldConfig,
  onBlur: (string) => void,
  onChange: (string) => void,
  touched: boolean,
  value: number,
}

const stackTokens = { childrenGap: 10 }
const ActionPermissionFormField = (props: ActionPermissionFormFieldProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const { editable, value, formFieldConfig, t } = props
  const valueParsed = value ? parseInt(value) : 0

  const handleOnChange = (checked: boolean, action: number) => {
    let newValue = valueParsed
    if (checked) {
      newValue += action
    } else {
      newValue -= action
    }
    props.onChange(formFieldConfig.column, newValue)
    props.onBlur(formFieldConfig.column, newValue)
    setTouched(true)
  }

  const errorText = isValid ? '' : getErrorText(errors, t)
  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Toggle
          checked={(value & 1) > 0}
          disabled={!editable}
          label={t('general.action.list')}
          onChange={(event, checked) => {
            handleOnChange(checked, 1)
          }}
        />
        <Toggle
          checked={(value & 2) > 0}
          disabled={!editable}
          label={t('general.action.view')}
          onChange={(event, checked) => {
            handleOnChange(checked, 2)
          }}
        />
        <Toggle
          checked={(value & 4) > 0}
          disabled={!editable}
          label={t('general.action.add')}
          onChange={(event, checked) => {
            handleOnChange(checked, 4)
          }}
        />
        <Toggle
          checked={(value & 8) > 0}
          disabled={!editable}
          label={t('general.action.edit')}
          onChange={(event, checked) => {
            handleOnChange(checked, 8)
          }}
        />
        <Toggle
          checked={(value & 16) > 0}
          disabled={!editable}
          label={t('general.action.delete')}
          onChange={(checked) => {
            handleOnChange(checked, 16)
          }}
        />
      </Stack>
      {!isValid && touched && (
        <p className="error-message">
          <span>{errorText}</span>
        </p>
      )}
    </Stack>
  )
}

ActionPermissionFormField.defaultProps = {
  editable: true,
  touched: false,
}

export default memo(ActionPermissionFormField)
