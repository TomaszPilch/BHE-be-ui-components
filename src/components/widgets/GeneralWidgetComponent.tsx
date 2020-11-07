import React from 'react'
import { connect } from 'react-redux'

import ListComponent from '../ListComponent'
import NavigationActions, { getAllRights, getNavigationItem } from '../../redux/NavigationRedux'

// types
import type { FieldConfig } from '../../types/FormTypes'

type GeneralWidgetComponentProps = {
  editable: boolean
  formFieldConfig: FieldConfig
}

class GeneralWidgetComponent extends React.PureComponent<GeneralWidgetComponentProps> {
  render() {
    const {
      module,
      navigationItem,
      onRequestRedirectTo,
      parentId,
      parentModule,
      rights,
      settings,
      t,
      widgetName,
    } = this.props

    if (!navigationItem || !navigationItem.name) {
      return <span>No navigation item found!</span>
    }

    return (
      <ListComponent
        changeRedirectUrl={onRequestRedirectTo}
        module={module}
        navigationItem={navigationItem}
        parentId={parentId}
        parentModule={parentModule}
        rights={rights}
        settings={settings}
        t={t}
        widgetName={widgetName}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const navigation = state.navigation.navigation
  const navigationItem = getNavigationItem(navigation, ownProps.formFieldConfig.section)
  const from = ownProps.formFieldConfig.keys.from
  return {
    module: navigationItem.url.replace('/', ''),
    navigationItem,
    parentId: ownProps.data[from],
    parentModule: ownProps.formFieldConfig.parentModule,
    rights: getAllRights(navigation, navigationItem.name),
    settings: state.list.listSettings[navigationItem.name],
    widgetName: ownProps.formFieldConfig.name,
  }
}

const mapDispatchToProps = {
  onRequestRedirectTo: NavigationActions.onRequestRedirectTo,
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralWidgetComponent)
