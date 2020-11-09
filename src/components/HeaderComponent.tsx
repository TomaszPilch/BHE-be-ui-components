import React, { useState, memo } from 'react'
import classNames from 'classnames'
import { Panel, PanelType, FontIcon, Nav, DefaultButton } from '@fluentui/react'
import { INavLink } from 'office-ui-fabric-react/lib/components/Nav/Nav.types'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.types'

// types
import { NavigationItem } from '../types/NavigationTypes'
import { UserGroup } from '../types/UserTypes'

type Props = {
  navigation: NavigationItem[]
  onChangePresentationId: (presentation: string) => void
  onChangeRedirectUrl: (url: string, urlAs: string) => void
  onChangeUserGroup: (groupId: string) => void
  presentationId: string
  presentationIds: string[]
  selectedGroup: UserGroup
  t: Function
  userGroups: Array<UserGroup>
}

const drawerLogoWrapper = classNames({
  logoWrapper: true,
  logoWrapperFull: true,
})

const Header = (props: Props) => {
  const [opened, setOpened] = useState(false)

  const handleChangePresentationId = (
    _event?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
    presentation?: IContextualMenuItem,
  ) => {
    if (presentation) {
      props.onChangePresentationId(presentation.key)
    }
  }

  const handleChangeUserGroup = (
    _event?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
    group?: IContextualMenuItem,
  ) => {
    if (group) {
      props.onChangeUserGroup(group.key)
    }
  }

  const handleOnLinkClick = (_ev?: React.MouseEvent<HTMLElement, MouseEvent>, link?: INavLink) => {
    if (link && link.localUrl && link.localUrlAs) {
      setOpened(false)
      props.onChangeRedirectUrl(link.localUrl, link.localUrlAs)
    }
  }

  const links: INavLink[] = [
    {
      name: props.t('modules.dashboard.menuTitle'),
      localUrl: '/',
      icon: 'ViewDashboard',
      url: '',
    },
    ...props.navigation.map((navigationItem) => {
      const url = Array.isArray(navigationItem.items) && navigationItem.items.length === 0 && navigationItem.url
      return {
        name: props.t(`modules.${navigationItem.name}.menuTitle`),
        localUrl: '/[module]',
        localUrlAs: url,
        isExpanded: false,
        url: '',
        icon:
          Array.isArray(navigationItem.items) && navigationItem.items.length > 0 ? '' : navigationItem.fabricIcon || '',
        links:
          Array.isArray(navigationItem.items) && navigationItem.items.length > 0
            ? navigationItem.items.map((navigationChild) => ({
                name: props.t(`modules.${navigationChild.name}.menuTitle`),
                localUrl: '/[module]',
                localUrlAs: navigationChild.url,
                icon: navigationChild.fabricIcon || '',
                url: '',
              }))
            : undefined,
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
                        key: `${group.key}`,
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

export default memo(Header)
