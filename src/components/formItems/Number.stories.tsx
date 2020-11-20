import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Number, { NumberFieldProps } from './Number'
import { translateFunction } from '../../utilities/stories'

export default {
  title: 'FormItems/Number',
  component: Number,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<NumberFieldProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Number
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
  label: 'Number label',
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'number',
  },
}

export const Error = Template.bind({})
Error.args = {
  label: 'Number label with error',
  value: undefined,
  touched: true,
  t: translateFunction,
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'number',
    validation: {
      isRequired: true,
    },
  },
}
