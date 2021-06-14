import React, { useCallback, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { assocPath } from 'ramda'

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

const TemplateWithCustomData: Story<FormComponentProps<CustomFormConfig>> = (args) => {
  const [data, setData] = useState({})

  const onChange = useCallback((key, value) => {
    setData((prevData) => assocPath([key], value, prevData))
  }, [])

  return <FormComponent {...args} data={data} onChange={onChange} onSubmit={console.log} />
}

export const CustomData = TemplateWithCustomData.bind({})
CustomData.args = {
  t: translateFunction,
  showSubmitButton: true,
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
