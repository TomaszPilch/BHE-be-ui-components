import React from 'react'
import { ImmutableArray } from 'seamless-immutable'
import { connect } from 'react-redux'

import {
  CommandBar,
  DefaultButton,
  PrimaryButton,
  MarqueeSelection,
  ShimmeredDetailsList,
  Selection,
  SelectionMode,
  Dialog,
  DialogFooter,
  DialogType,
  FontIcon,
} from '@fluentui/react'

// @ts-ignore
import { Pagination } from '@uifabric/experiments'

import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types'
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.types'

// redux
import EditActions from '../redux/EditRedux'
import { USER_RIGHTS } from '../redux/NavigationRedux'
import ListActions, { getColumnValue, valueToString } from '../redux/ListRedux'

// utils
import { copyString, sanitizeColumnName } from '../utilities/utilities'

// components
import ValueToString from './passive/ValueToString'
import FilterComponent from './FilterComponent'
import withPaginationAndSort, { WithPaginationAndSortPassDownProps } from './WithPaginationAndSort'
import { TranslateFunctionType } from '../types/TranslationTypes'
import { ReduxStore } from '../redux'
import { IListReduxCreators } from '../redux/types/ListReduxTypes'
import { IEditReduxCreators } from '../redux/types/EditReduxTypes'
import { WithModulesPassDownProps } from './WithModule'
import { DataItemType } from '../types/ViewTypes'
import { PassiveComponentProps } from './passive'

// types
type ListComponentStateProps = {
  fetching: boolean
  itemsToDelete: ImmutableArray<DataItemType>
  modalOpened: boolean
  refreshSig: boolean
}

type ListComponentDispatchProps = {
  onChangeFilterData: IListReduxCreators['onChangeFilterData']
  onChangeRefreshSig: IListReduxCreators['onChangeRefreshSig']
  onListDeleteRequest: IListReduxCreators['onListDeleteRequest']
  onListDeleteRequestConfirmed: IListReduxCreators['onListDeleteRequestConfirmed']
  onUpdateColumnRequest: IEditReduxCreators['onUpdateColumnRequest']
}

type ListComponentOwnProps<CustomComponentProps> = WithPaginationAndSortPassDownProps<DataItemType> &
  WithModulesPassDownProps & {
    changeRedirectUrl: (url: string, urlAs: string) => void
    t: TranslateFunctionType
    customComponents: { [key: string]: React.ComponentType<PassiveComponentProps | CustomComponentProps> }
  }

type ListComponentProps<CustomComponentProps> = ListComponentStateProps &
  ListComponentDispatchProps &
  ListComponentOwnProps<CustomComponentProps>

class ListComponent<CustomComponentProps = {}> extends React.PureComponent<ListComponentProps<CustomComponentProps>> {
  state = { selectedArray: [], showFilter: false }

  selection = new Selection({
    onSelectionChanged: () => {
      this.setState({
        selectedArray: this.selection.getSelection(),
      })
    },
  })

  componentDidMount() {
    this.props.loadData()
  }

  componentDidUpdate(prevProps: ListComponentProps<CustomComponentProps>): void {
    if (prevProps.module !== this.props.module) {
      this.setState({ showFilter: false })
    }
    if (prevProps.module !== this.props.module || prevProps.refreshSig !== this.props.refreshSig) {
      this.props.onChangeRefreshSig(false)
      this.props.loadData()
    }
  }

  handleGetActions = () => {
    const { module, rights, changeRedirectUrl, settings, t } = this.props
    const { showFilter } = this.state

    const actions = []
    if (rights[USER_RIGHTS.ADD] && this.handleHasModuleThisAction('add')) {
      actions.push({
        key: 'add',
        name: t('general.add'),
        iconProps: {
          iconName: 'Add',
        },
        onClick: () => {
          changeRedirectUrl('/[module]/[action]', `/${module}/add`)
        },
      })
    }
    if (Array.isArray(settings.filterOptions) && settings.filterOptions.length > 0) {
      actions.push({
        key: 'toggleFilter',
        name: t(showFilter ? 'general.hideFilter' : 'general.showFilter'),
        iconProps: {
          iconName: 'Filter',
        },
        onClick: () => {
          this.setState({ showFilter: !showFilter })
        },
      })
    }
    return actions
  }

  handleGetFarActions = (): ICommandBarItemProps[] => {
    const { t } = this.props
    return [
      {
        key: 'refresh',
        name: t('general.refresh'),
        iconProps: {
          iconName: 'Refresh',
        },
        onClick: this.handleLoadData,
      },
      {
        key: 'copyUrl',
        name: t('general.copyUrl'),
        iconProps: {
          iconName: 'Link',
        },
        onClick: this.handleCopyLink,
      },
    ]
  }

  handleDeleteRequest = () => {
    this.props.onListDeleteRequest(true, this.state.selectedArray)
  }

  handleGetColumns = (): IColumn[] => {
    const {
      sort: { column, direction },
      settings: { listColumns },
      t,
    } = this.props
    return Array.isArray(listColumns)
      ? [
          ...listColumns.map((colName) => ({
            key: colName,
            minWidth: 120,
            maxWidth: colName === 'id' ? 30 : undefined,
            name: t(`dataTableColumns.${sanitizeColumnName(colName)}`),
            onRender: this.handleRenderCell,
            isSorted: column === colName,
            isSortedDescending: direction === 'DESC',
          })),
          {
            key: 'actions-cell',
            name: '',
            minWidth: 120,
            onRender: this.handleRenderRowActions,
            isSorted: false,
            isSortedDescending: false,
          },
        ]
      : []
  }

  handleOnHeaderClick = (_event?: React.MouseEvent<HTMLElement, MouseEvent>, cell?: IColumn) => {
    const { onChangeSort } = this.props
    if (cell) {
      onChangeSort(cell.key)
    }
  }

  handleDeleteRequestCancel = () => {
    this.props.onListDeleteRequest(false, [])
  }

  handleDeleteRequestConfirm = () => {
    const { onListDeleteRequestConfirmed, navigationItem, itemsToDelete } = this.props
    onListDeleteRequestConfirmed(navigationItem.name, itemsToDelete)
  }

  handleOpenActionLink = (
    e: React.MouseEvent<HTMLElement>,
    module: string,
    item: DataItemType,
    action: 'view' | 'edit',
  ) => {
    if (e.ctrlKey) {
      window.open(`/${module}/${action}/${item.id}`, '_blank')
    } else {
      this.props.changeRedirectUrl('/[module]/[action]/[id]', `/${module}/${action}/${item.id}`)
    }
  }

  handleHasModuleThisAction = (action: string) => {
    const { settings } = this.props
    return (
      typeof settings.actionsForModule === 'undefined' ||
      (Array.isArray(settings.actionsForModule) && settings.actionsForModule.includes(action))
    )
  }

  handleRenderRowActions = (item: any) => {
    const { rights, module } = this.props
    return (
      <span key={`actions-${item.id}`}>
        {rights[USER_RIGHTS.VIEW] > 0 && this.handleHasModuleThisAction('view') && (
          <FontIcon
            className="list-container__action"
            iconName="View"
            onClick={(e) => {
              this.handleOpenActionLink(e, module, item, 'view')
            }}
          />
        )}
        {rights[USER_RIGHTS.EDIT] > 0 && this.handleHasModuleThisAction('edit') && (
          <FontIcon
            className="list-container__action"
            iconName="Edit"
            onClick={(e) => {
              this.handleOpenActionLink(e, module, item, 'edit')
            }}
          />
        )}
        {rights[USER_RIGHTS.DELETE] > 0 && this.handleHasModuleThisAction('delete') && (
          <FontIcon
            className="list-container__action list-container__action--delete"
            iconName="Delete"
            onClick={() => {
              this.props.onListDeleteRequest(true, [item])
            }}
          />
        )}
      </span>
    )
  }

  handleRenderCell = (item?: any, _index?: number, column?: IColumn) => {
    const {
      changeRedirectUrl,
      customComponents,
      settings: { customListComponents, columnValues },
      t,
      module,
    } = this.props
    let CustomValueComponent = undefined
    let customProps = {}

    if (typeof column === 'undefined') {
      return null
    }

    let columnValue = getColumnValue(item, column.key)
    let sanitizedKey = sanitizeColumnName(column.key)
    if (customListComponents && customListComponents[sanitizedKey]) {
      let columnName = customListComponents[sanitizedKey]
      if (typeof columnName === 'object') {
        customProps = { ...columnName, name: undefined }
        columnName = columnName.name
      }
      if (customComponents && customComponents[columnName]) {
        CustomValueComponent = customComponents[columnName]
      }

      if (!CustomValueComponent) {
        return null
      }

      return (
        <CustomValueComponent
          {...customProps}
          actionOnClick={this.handleCellActionClick}
          column={column}
          columnValues={columnValues && columnValues[column.key]}
          item={item}
          module={module}
          requestRedirectTo={changeRedirectUrl}
          t={t}
          value={columnValue}
        />
      )
    }
    return <ValueToString t={t} value={columnValue} />
  }

  handleCopyLink = () => {
    copyString(window.location.href)
  }

  getConfirmationModalText = () => {
    const { settings, itemsToDelete, modalOpened, t } = this.props

    if (!modalOpened) {
      return null
    }

    return itemsToDelete.map((item) => (
      <p key={item.id} className="list-container__delete-list">
        {settings.listColumns.map((column) => (
          <span key={`${item.id}-${column}`}>{valueToString(getColumnValue(item, column), t)}</span>
        ))}
      </p>
    ))
  }

  handleCellActionClick = (data: any, item: any) => {
    const { onUpdateColumnRequest, navigationItem, getListOptionDataObject } = this.props
    onUpdateColumnRequest({
      module: navigationItem.name,
      data: {
        ...item,
        ...data,
      },
      // @ts-ignore
      listDataOptions: getListOptionDataObject(), // todo type
    })
  }

  handlePageChange = (page: number) => {
    const { onChangePage } = this.props
    onChangePage(page)
  }

  handleLoadData = () => {
    this.props.loadData()
  }

  render() {
    const {
      changeFilterValue,
      data,
      fetching,
      filterData,
      modalOpened,
      resetFilter,
      rights,
      settings,
      t,
      paginator: { maxPage, limit, maxCount, page },
    } = this.props
    const { selectedArray, showFilter } = this.state
    return (
      <>
        <div data-is-scrollable={true}>
          <CommandBar
            className="list-container__actions"
            farItems={this.handleGetFarActions()}
            items={this.handleGetActions()}
          />
          {showFilter && (
            <div className="filter-container">
              <div className="filter-container__inputs">
                {settings.filterOptions.map((filter) => (
                  <FilterComponent
                    key={filter.key}
                    filterValues={filterData}
                    onChangeFilterValue={changeFilterValue}
                    options={filter}
                    t={t}
                  />
                ))}
              </div>
              <div className="filter-container__actions">
                <div className="filter-container__action-wrapper">
                  <PrimaryButton onClick={this.handleLoadData} text={t('filter._action.search')} />
                </div>
                <div className="filter-container__action-wrapper">
                  <DefaultButton onClick={resetFilter} text={t('filter._action.reset')} />
                </div>
              </div>
            </div>
          )}
          <MarqueeSelection selection={this.selection}>
            <ShimmeredDetailsList
              columns={this.handleGetColumns()}
              enableShimmer={fetching}
              isHeaderVisible
              // @ts-ignore
              items={data}
              onColumnHeaderClick={this.handleOnHeaderClick}
              selection={this.selection}
              selectionMode={SelectionMode.multiple}
            />
          </MarqueeSelection>
          {selectedArray.length > 0 && rights[USER_RIGHTS.DELETE] && this.handleHasModuleThisAction('delete') && (
            <CommandBar
              className="list-container__actions-bottom"
              items={[
                {
                  key: 'delete',
                  name: t('general.removeSelectedRequest'),
                  iconProps: {
                    iconName: 'Delete',
                  },
                  onClick: this.handleDeleteRequest,
                },
              ]}
            />
          )}
        </div>
        {maxCount > limit && (
          <div className="list-container__pagination">
            <Pagination
              format="buttons"
              itemsPerPage={limit}
              onPageChange={this.handlePageChange}
              pageCount={maxPage}
              selectedPageIndex={page - 1} // index
              totalItemCount={maxCount}
            />
          </div>
        )}
        <Dialog
          dialogContentProps={{
            type: DialogType.normal,
            title: t('confirmationModal.deleteTitle'),
          }}
          hidden={!modalOpened}
          modalProps={{ isBlocking: false }}
          onDismiss={this.handleDeleteRequestCancel}
        >
          {this.getConfirmationModalText()}
          <DialogFooter>
            <PrimaryButton onClick={this.handleDeleteRequestConfirm} text={t('general.confirm')} />
            <DefaultButton onClick={this.handleDeleteRequestCancel} text={t('general.cancel')} />
          </DialogFooter>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = (state: ReduxStore): ListComponentStateProps => ({
  fetching: state.list.fetching,
  itemsToDelete: state.list.itemsToDelete,
  modalOpened: state.list.modalOpened,
  refreshSig: state.list.refreshSig,
})

const mapActionsToProps: ListComponentDispatchProps = {
  onChangeFilterData: ListActions.onChangeFilterData,
  onChangeRefreshSig: ListActions.onChangeRefreshSig,
  onListDeleteRequest: ListActions.onListDeleteRequest,
  onListDeleteRequestConfirmed: ListActions.onListDeleteRequestConfirmed,
  onUpdateColumnRequest: EditActions.onUpdateColumnRequest,
}

export default connect<ListComponentStateProps, ListComponentDispatchProps, ListComponentOwnProps<{}>, ReduxStore>(
  mapStateToProps,
  mapActionsToProps,
)(withPaginationAndSort(ListComponent))
