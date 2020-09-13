// @flow
import React from 'react'
import { Breadcrumb } from '@fluentui/react'

// utils

// types

type TitleWithBreadcrumbsProps = {
  action?: string,
  changeRedirectUrl: (string) => void,
  module: string,
  navigationItem?: Object,
  t: Function,
  title: string,
}

const actionToTitleKey = {
  ADD: 'addTitle',
  EDIT: 'editTitle',
  VIEW: 'viewTitle',
}

const TitleWithBreadcrumbs = (props: TitleWithBreadcrumbsProps) => {
  const items = []
  if (props.navigationItem) {
    items.push(
      {
        key: 'dashboard',
        text: props.t(`modules.dashboard.listTitle`),
        onClick: () => {
          props.changeRedirectUrl('/')
        },
      },
      {
        key: props.navigationItem.name,
        text: props.t(`modules.${props.navigationItem.name}.listTitle`),
        isCurrentItem: !props.action,
        onClick: () => {
          props.changeRedirectUrl('/[module]', `/${props.module}`)
        },
      },
    )
    if (props.action) {
      items.push({
        key: props.action,
        text: props.t(`modules.${props.navigationItem.name}.${actionToTitleKey[props.action]}`),
        isCurrentItem: true,
      })
    }
  }
  return (
    <div className="title-component">
      <span className="ms-fontSize-32 title-component__title">{props.title}</span>
      <Breadcrumb className="m-0 m-l-1" items={items} />
    </div>
  )
}

TitleWithBreadcrumbs.defaultProps = {
  changeRedirectUrl: () => {},
}

export default TitleWithBreadcrumbs
