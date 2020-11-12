import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import TextField, { TextFieldProps } from './TextField'
import { translateFunction } from '../../utilities/stories'

export default {
  title: 'FormItems/TextField',
  component: TextField,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<TextFieldProps<'text'>> = (args) => {
  const [value, setValue] = useState('')

  return (
    <TextField
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
  label: 'Text field label',
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'text',
  },
}

export const Error = Template.bind({})
Error.args = {
  label: 'Text field label with error',
  value: undefined,
  touched: true,
  t: translateFunction,
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'text',
    validation: {
      isRequired: true,
    },
  },
}
