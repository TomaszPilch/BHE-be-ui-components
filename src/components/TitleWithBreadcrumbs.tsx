import React, { memo } from 'react'
import { Breadcrumb } from '@fluentui/react'

import { ChangeRedirectUrlType, NavigationItem, RightName } from '../types/NavigationTypes'
import { TranslateFunctionType } from '../types/TranslationTypes'

type TitleWithBreadcrumbsProps = {
  action?: RightName
  changeRedirectUrl: ChangeRedirectUrlType
  module: string
  navigationItem?: NavigationItem
  t: TranslateFunctionType
  title: string
}

const actionToTitleKey = {
  ADD: 'addTitle',
  EDIT: 'editTitle',
  VIEW: 'viewTitle',
  LIST: 'listTitle',
  DELETE: 'listTitle',
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

export default memo(TitleWithBreadcrumbs)
