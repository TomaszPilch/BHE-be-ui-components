import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Datetime, { DatetimeProps } from './Datetime'

export default {
  title: 'FormItems/Datetime',
  component: Datetime,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<DatetimeProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Datetime
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
  label: 'Datetime label',
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'datetime',
  },
}
