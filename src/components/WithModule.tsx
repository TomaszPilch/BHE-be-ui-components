import React, { createRef } from 'react'
import { connect } from 'react-redux'

import { getNavigationItem, getAllRights } from '../redux/NavigationRedux'

import { ReduxStore } from '../redux'
import { ListSettingsItem, ListSettingsType } from '../types/ViewTypes'
import { AllRightsType, NavigationItem } from '../types/NavigationTypes'

type WithModuleOwnProps = {
  router: {
    query?: {
      module?: string
    }
  }
}

type WithModuleStateProps = {
  listSettings: ListSettingsType
  navigation: NavigationItem[]
}

export type WithModuleProps = WithModuleOwnProps & WithModuleStateProps

export type WithModulesPassDownProps = WithModuleProps & {
  module: string
  navigationItem: NavigationItem
  settings: ListSettingsItem
  rights: AllRightsType
}

const mapStateToProps = (state: ReduxStore) => {
  return {
    listSettings: state.list.listSettings,
    navigation: state.navigation.navigation,
  }
}

const withModule = (Component: React.ComponentType): any => {
  class WithModuleClass extends React.Component<WithModuleProps, null> {
    componentRef = createRef()

    render() {
      const { router, listSettings, navigation } = this.props
      if (!router || !router.query || !router.query.module) {
        return <div>Module not found</div>
      }
      const module = router.query.module
      const navItem = getNavigationItem(navigation, '', module)
      if (!navItem.url) {
        return <div>Navigation item not found</div>
      }
      const settings = listSettings[navItem.name] || {}
      if (Object.keys(navItem).length === 0) {
        return <div>No settings for module</div>
      }

      const otherProps = {
        module,
        navigationItem: navItem,
        settings,
        rights: getAllRights(navigation, navItem.name),
      }
      // @ts-ignore
      return <Component {...this.props} {...otherProps} ref={this.componentRef} />
    }
  }

  // @ts-ignore
  return connect(mapStateToProps)(WithModuleClass)
}

export default withModule
