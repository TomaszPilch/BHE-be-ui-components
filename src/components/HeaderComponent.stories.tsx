import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import HeaderComponent, { HeaderComponentProps } from './HeaderComponent'
import { translateFunction } from '../utilities/stories'

export default {
  title: 'General/HeaderComponent',
  component: HeaderComponent,
  argTypes: {},
} as Meta

const Template: Story<HeaderComponentProps> = (args) => {
  return <HeaderComponent {...args} />
}

export const Default = Template.bind({})
Default.args = {
  navigation: [
    {
      actions: 0,
      isParent: false,
      items: [],
      name: 'test',
      url: '/test',
      fabricIcon: 'Edit',
    },
  ],
  presentationId: 'en',
  selectedGroup: { key: 1, label: 'a' },
  t: translateFunction,
  presentationIds: ['en'],
  userGroups: [{ key: 1, label: 'a' }],
}
