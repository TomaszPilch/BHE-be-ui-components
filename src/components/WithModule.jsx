// @flow
import React from 'react'
import { connect } from 'react-redux'

import { getNavigationItem, getAllRights } from '../redux/NavigationRedux'

type withModuleProps = {
  match: { params: { module: string } },
  listSettings: Object,
  navigation: Object[],
}

const mapStateToProps = (state) => {
  return {
    listSettings: state.list.listSettings,
    navigation: state.navigation.navigation,
  }
}

const withModule = (Component) =>
  connect(
    mapStateToProps,
    {},
  )(
    class extends React.Component<withModuleProps, null> {
      render() {
        const { router, listSettings, navigation } = this.props
        if (!router || !router.query || !router.query.module) {
          return <div>Module not found</div>
        }
        const module = router.query.module
        const navItem = getNavigationItem(navigation, '', module)
        if (Object.keys(navItem).length === 0) {
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
        return <Component {...this.props} {...otherProps} ref={this.componentRef} />
      }
    },
  )

export default withModule
