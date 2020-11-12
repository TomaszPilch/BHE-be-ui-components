import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

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
  const [value, setValue] = useState('')

  return (
    <Code
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
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'code',
    code: 'html',
  },
}
