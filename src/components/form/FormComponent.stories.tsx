import React, { useCallback, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { assocPath } from 'ramda'
import { PrimaryButton } from '@fluentui/react'

import FormFactory, { FormComponentProps } from '@bheui/form-logic/lib/components/FormFactory'

import formElements, { CustomFormConfig } from '../formItems'
import { translateFunction } from '../../utilities/stories'

export default {
  title: 'Form/FormFactory',
  component: FormFactory,
  argTypes: {},
  args: {
    onChange: console.log,
    onBlur: console.log,
    onSubmit: console.log,
  },
} as Meta

const Template: Story<FormComponentProps<CustomFormConfig>> = (args) => {
  return <FormFactory {...args} />
}

export const Standalone = Template.bind({})
Standalone.args = {
  standalone: true,
  t: translateFunction,
  formComponents: formElements,
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
  submitButtonComponentCreator: (onSubmit) => (
    <div className="submitButtonWrapper">
      <PrimaryButton onClick={onSubmit} text="submit" type="submit" />
    </div>
  ),
}

const TemplateWithCustomData: Story<FormComponentProps<CustomFormConfig>> = (args) => {
  const [data, setData] = useState({})

  const onChange = useCallback((key, value) => {
    setData((prevData) => assocPath([key], value, prevData))
  }, [])

  // @ts-ignore
  return <FormFactory {...args} data={data} onChange={onChange} onSubmit={console.log} />
}

export const CustomData = TemplateWithCustomData.bind({})
CustomData.args = {
  t: translateFunction,
  formComponents: formElements,
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
  submitButtonComponentCreator: (onSubmit) => (
    <div className="submitButtonWrapper">
      <PrimaryButton onClick={onSubmit} text="submit" type="submit" />
    </div>
  ),
}
