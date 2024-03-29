import React, { memo } from 'react'
import { Stack, Toggle } from '@fluentui/react'
import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'
import { useFieldValidation } from '@bheui/form-logic/lib/utilities/validation'
import { getErrorText } from '@bheui/form-logic/lib/utilities/utilities'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

export type ActionPermissionFormFieldFormConfig = FieldConfigBasicTypeStack<'actionPermission'>

export interface ActionPermissionFormFieldProps extends DefaultFieldProps<number | string> {
  formFieldConfig: ActionPermissionFormFieldFormConfig
}

const stackTokens = { childrenGap: 10 }
const ActionPermissionFormField = (props: ActionPermissionFormFieldProps) => {
  const [isValid, errors, , touched, setTouched] = useFieldValidation(props.formFieldConfig, props.value, props.touched)

  const { editable, value, formFieldConfig, t } = props
  let valueParsed = value ? value : 0
  if (typeof valueParsed === 'string' && value) {
    valueParsed = parseInt(valueParsed, 10)
  }

  const handleOnChange = (checked: undefined | boolean, action: number) => {
    let newValue = valueParsed as number
    if (checked) {
      newValue += action
    } else {
      newValue -= action
    }
    if (typeof props.onChange === 'function') {
      props.onChange(formFieldConfig.column, newValue)
    }
    if (typeof props.onBlur === 'function') {
      props.onBlur(formFieldConfig.column, newValue)
    }
    setTouched(true)
  }

  const errorText = isValid ? '' : getErrorText(errors, t)
  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Toggle
          checked={((valueParsed as number) & 1) > 0}
          disabled={!editable}
          label={t('general.action.list')}
          onChange={(_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
            handleOnChange(checked, 1)
          }}
        />
        <Toggle
          checked={((valueParsed as number) & 2) > 0}
          disabled={!editable}
          label={t('general.action.view')}
          onChange={(_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
            handleOnChange(checked, 2)
          }}
        />
        <Toggle
          checked={((valueParsed as number) & 4) > 0}
          disabled={!editable}
          label={t('general.action.add')}
          onChange={(_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
            handleOnChange(checked, 4)
          }}
        />
        <Toggle
          checked={((valueParsed as number) & 8) > 0}
          disabled={!editable}
          label={t('general.action.edit')}
          onChange={(_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
            handleOnChange(checked, 8)
          }}
        />
        <Toggle
          checked={((valueParsed as number) & 16) > 0}
          disabled={!editable}
          label={t('general.action.delete')}
          onChange={(_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
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
