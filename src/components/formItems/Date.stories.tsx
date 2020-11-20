import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Date, { DateProps } from './Date'

export default {
  title: 'FormItems/Date',
  component: Date,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<DateProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Date
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
  label: 'Date label',
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'date',
  },
}
