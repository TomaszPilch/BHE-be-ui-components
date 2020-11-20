import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Bool, { BoolProps } from './Bool'
import { translateFunction } from '../../utilities/stories'

export default {
  title: 'FormItems/Bool',
  component: Bool,
  argTypes: {
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
  },
} as Meta

const Template: Story<BoolProps> = (args) => {
  const [checked, setChecked] = useState(false)

  return (
    <Bool
      // @ts-ignore
      value={checked}
      {...args}
      onChange={(_name, value) => {
        setChecked(value)
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'bool field',
  t: translateFunction,
  formFieldConfig: {
    column: 'test',
    name: 'test',
    type: 'bool',
  },
}
