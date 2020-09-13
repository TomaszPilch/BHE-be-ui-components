// @flow
import React, { useState } from 'react'
import classNames from 'classnames'
import { Panel, PanelType, FontIcon, Nav, DefaultButton } from '@fluentui/react'

// types
import type { Navigation } from '../types/NavigationTypes'
import type { UserGroup } from '../types/UserTypes'

type Props = {
  navigation: Navigation,
  onChangePresentationId: (number) => void,
  onChangeRedirectUrl: (string) => void,
  onChangeUserGroup: (number) => void,
  presentationId: string,
  presentationIds: string[],
  selectedGroup: UserGroup,
  t: Function,
  userGroups: Array<UserGroup>,
}

const drawerLogoWrapper = classNames({
  logoWrapper: true,
  logoWrapperFull: true,
})

const Header = (props: Props) => {
  const [opened, setOpened] = useState(false)

  const handleChangePresentationId = (event, presentation) => {
    props.onChangePresentationId(presentation.key)
  }

  const handleChangeUserGroup = (event, group) => {
    props.onChangeUserGroup(group.key)
  }

  const handleOnLinkClick = (event, link) => {
    if (link.localUrl && link.localUrlAs) {
      setOpened(false)
      props.onChangeRedirectUrl(link.localUrl, link.localUrlAs)
    }
  }

  const links = [
    {
      name: props.t('modules.dashboard.menuTitle'),
      localUrl: '/',
      icon: 'ViewDashboard',
    },
    ...props.navigation.map((navigationItem) => {
      const url = Array.isArray(navigationItem.items) && navigationItem.items.length === 0 && navigationItem.url
      return {
        name: props.t(`modules.${navigationItem.name}.menuTitle`),
        localUrl: '/[module]',
        localUrlAs: url,
        isExpanded: false,
        icon:
          Array.isArray(navigationItem.items) && navigationItem.items.length > 0 ? '' : navigationItem.fabricIcon || '',
        links:
          Array.isArray(navigationItem.items) &&
          navigationItem.items.length > 0 &&
          navigationItem.items.map((navigationChild) => ({
            name: props.t(`modules.${navigationChild.name}.menuTitle`),
            localUrl: '/[module]',
            localUrlAs: navigationChild.url,
            icon: navigationChild.fabricIcon || '',
          })),
      }
    }),
  ]

  return (
    <>
      <div className="top-bar ms-depth-4">
        <div className="top-bar__left">
          <div className="logo-wrapper" />
          <FontIcon
            className="top-bar__icon"
            iconName="CollapseMenu"
            onClick={() => {
              setOpened(true)
            }}
          />
        </div>
        <div className="top-bar__content" />
        <div className="top-bar__right">
          <div className="top-bar__actions">
            {props.presentationIds.length > 0 && (
              <div className="top-bar__action">
                <DefaultButton
                  menuProps={{
                    items: props.presentationIds
                      .filter((id) => id !== props.presentationId)
                      .map((presentationId) => ({
                        key: presentationId,
                        text: presentationId,
                        onClick: handleChangePresentationId,
                      })),
                  }}
                  text={`${props.presentationId}`}
                />
              </div>
            )}
            {props.userGroups.length > 0 && (
              <div className="top-bar__action top-bar__action--margins">
                <DefaultButton
                  menuProps={{
                    items: props.userGroups
                      .filter((group) => group.key !== props.selectedGroup.key)
                      .map((group) => ({
                        key: group.key,
                        text: group.label,
                        onClick: handleChangeUserGroup,
                      })),
                  }}
                  text={`${props.selectedGroup.label}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Panel
        isOpen={opened}
        onDismiss={() => {
          setOpened(false)
        }}
        type={PanelType.smallFixedNear}
      >
        <div className="drawer-body">
          <div className="topBar">
            <div className="columnLeft">
              <div className={drawerLogoWrapper} />
            </div>
          </div>
          <Nav
            groups={[
              {
                links,
              },
            ]}
            onLinkClick={handleOnLinkClick}
          />
        </div>
      </Panel>
    </>
  )
}

Header.defaultProps = {
  onChangePresentationId: () => {},
  onChangeRedirectUrl: () => {},
  onChangeUserGroup: () => {},
  presentationIds: [],
  userGroups: [],
}

export default Header
