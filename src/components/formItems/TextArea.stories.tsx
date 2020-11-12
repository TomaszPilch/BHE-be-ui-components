import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import TextArea, { TextAreaProps } from './TextArea'
import { translateFunction } from '../../utilities/stories'

export default {
  title: 'FormItems/TextArea',
  component: TextArea,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<TextAreaProps> = (args) => {
  const [value, setValue] = useState<string | number | null>('')

  return (
    <TextArea
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
  label: 'Text area label',
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'textArea',
  },
}

export const Longer = Template.bind({})
Longer.args = {
  label: 'Text area label',
  inputProps: {
    rows: 250,
  },
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'textArea',
  },
}

export const Error = Template.bind({})
Error.args = {
  label: 'Text area label',
  touched: true,
  value: undefined,
  t: translateFunction,
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'textArea',
    validation: {
      isRequired: true,
    },
  },
}
