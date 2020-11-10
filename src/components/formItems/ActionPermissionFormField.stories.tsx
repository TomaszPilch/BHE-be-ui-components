import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import ActionPermissionFormField, { ActionPermissionFormFieldProps } from './ActionPermissionFormField'

export default {
  title: 'FormItems/ActionPermissionFormField',
  component: ActionPermissionFormField,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<ActionPermissionFormFieldProps> = (args) => <ActionPermissionFormField {...args} />

const translateFunction = (k: string | string[]) => k.toString()

export const Default = Template.bind({})
Default.args = {
  t: translateFunction,
  label: 'Button',
  formFieldConfig: {
    column: 'test',
    component: '',
    name: 'test',
  },
}

export const Error = Template.bind({})
Error.args = {
  t: translateFunction,
  value: undefined,
  touched: true,
  formFieldConfig: {
    column: 'test',
    component: '',
    name: 'test',
    validation: {
      isRequired: true,
    },
  },
}
