import React from 'react'
import { connect } from 'react-redux'

import ListComponent from '../ListComponent'
import NavigationActions, { getAllRights, getNavigationItem } from '../../redux/NavigationRedux'

// types
import { AllRightsType, NavigationItem } from '../../types/NavigationTypes'
import { ListSettingsItem } from '../../types/ViewTypes'
import { ReduxStore } from '../../redux'
import { INavigationReduxCreators } from '../../redux/types/NavigationReduxTypes'
import { TranslateFunctionType } from '../../types/TranslationTypes'

type GeneralWidgetComponentOwnProps = {
  formFieldConfig: any //todo
  data: { [key: string]: any }
  t: TranslateFunctionType
}

type GeneralWidgetComponentStateProps = {
  module: string
  navigationItem: NavigationItem
  parentId: number
  parentModule: string
  rights: AllRightsType
  settings: ListSettingsItem
  widgetName: string
}

type GeneralWidgetComponentDispatchProps = {
  onRequestRedirectTo: INavigationReduxCreators['onRequestRedirectTo']
}

type GeneralWidgetComponentProps = GeneralWidgetComponentStateProps &
  GeneralWidgetComponentOwnProps &
  GeneralWidgetComponentDispatchProps

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
      // @ts-ignore
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

const mapStateToProps = (
  state: ReduxStore,
  ownProps: GeneralWidgetComponentOwnProps,
): GeneralWidgetComponentStateProps => {
  const navigation = state.navigation.navigation
  const navigationItem = getNavigationItem(
    (navigation as unknown) as NavigationItem[],
    ownProps.formFieldConfig.section || '',
  )
  let from = ''
  if (ownProps.formFieldConfig.keys && ownProps.formFieldConfig.keys.from) {
    from = ownProps.formFieldConfig.keys.from
  }
  return {
    module: navigationItem.url.replace('/', ''),
    navigationItem,
    parentId: ownProps.data[from],
    parentModule: ownProps.formFieldConfig.parentModule,
    rights: getAllRights((navigation as unknown) as NavigationItem[], navigationItem.name),
    // @ts-ignore
    settings: state.list.listSettings[navigationItem.name],
    widgetName: ownProps.formFieldConfig.name,
  }
}

const mapDispatchToProps: GeneralWidgetComponentDispatchProps = {
  onRequestRedirectTo: NavigationActions.onRequestRedirectTo,
}

export default connect<
  GeneralWidgetComponentStateProps,
  GeneralWidgetComponentDispatchProps,
  GeneralWidgetComponentOwnProps,
  ReduxStore
>(
  mapStateToProps,
  mapDispatchToProps,
)(GeneralWidgetComponent)
