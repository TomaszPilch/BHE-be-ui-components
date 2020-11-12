import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Select, { SelectProps } from './Select'
import { translateFunction } from '../../utilities/stories'

export default {
  title: 'FormItems/Select',
  component: Select,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<SelectProps> = (args) => {
  const [value, setValue] = useState<string | number | null>('')

  return (
    <Select
      // @ts-ignore
      value={value}
      {...args}
      onChange={(_name, value) => {
        setValue(value)
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Select label',
  formFieldConfig: {
    values: ['one', 'two'],
    column: 'test',
    name: 'test',
    type: 'select',
  },
}

export const Error = Template.bind({})
Error.args = {
  label: 'Select label with error',
  value: undefined,
  touched: true,
  t: translateFunction,
  formFieldConfig: {
    values: ['one', 'two'],
    column: 'test',
    name: 'test',
    type: 'select',
    validation: {
      isRequired: true,
    },
  },
}

export const WithResources = Template.bind({})
WithResources.args = {
  label: 'Select label with error',
  t: translateFunction,
  fetchResources: () => ['one', 'two', 'three'],
  formFieldConfig: {
    resourceName: 'resource',
    column: 'test',
    name: 'test',
    type: 'select',
  },
}
