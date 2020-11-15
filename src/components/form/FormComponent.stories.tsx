import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import FormComponent, { FormComponentProps } from './FormComponent'
import { CustomFormConfig } from '../formItems'
import { translateFunction } from '../../utilities/stories'

export default {
  title: 'Form/FormComponent',
  component: FormComponent,
  argTypes: {},
  args: {
    onChange: console.log,
    onBlur: console.log,
    onSubmit: console.log,
  },
} as Meta

const Template: Story<FormComponentProps<CustomFormConfig>> = (args) => {
  return <FormComponent {...args} />
}

export const Standalone = Template.bind({})
Standalone.args = {
  t: translateFunction,
  showSubmitButton: true,
  standalone: true,
  formConfig: [
    {
      type: 'datetime',
      column: 'dateColumn',
      name: 'Datetime field',
    },
    {
      type: 'bool',
      name: 'Bool label',
      column: 'boolValue',
    },
  ],
}
