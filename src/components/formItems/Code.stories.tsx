import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import packageJson from '../../../package.json'
import Code, { CodeProps } from './Code'

export default {
  title: 'FormItems/Code',
  component: Code,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<CodeProps> = (args) => {
  const [value, setValue] = useState(args.value || '')

  return (
    <Code
      {...args}
      value={value}
      onChange={(_name, value) => {
        setValue(value)
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'code',
    code: 'html',
  },
}

export const WithDefaultValueJson = Template.bind({})
WithDefaultValueJson.args = {
  value: packageJson,
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'code',
    code: 'json',
  },
}

export const WithDefaultValueString = Template.bind({})
WithDefaultValueString.args = {
  value: JSON.stringify(packageJson),
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'code',
    code: 'json',
  },
}
