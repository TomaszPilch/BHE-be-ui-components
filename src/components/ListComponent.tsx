import React from 'react'
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

// redux
import EditActions from '../redux/EditRedux'
import { USER_RIGHTS } from '../redux/NavigationRedux'
import ListActions, { getColumnValue, valueToString } from '../redux/ListRedux'

// utils
import { copyString, sanitizeColumnName } from '../utilities/utilities'

// components
import CustomModuleComponents from './modules/CustomModuleComponents'
import ValueToString from './passive/ValueToString'
import FilterComponent from './FilterComponent'
import withPaginationAndSort from './WithPaginationAndSort'
import { TranslateFunctionType } from '../types/TranslationTypes'

// types
type ListComponentProps = {
  customComponents?: Object,
  changeFilterValue: (key: string, value: string, reloadData: boolean) => void,
  changeRedirectUrl: (string) => void,
  data: Object,
  fetching: boolean,
  filterData: Object[],
  getListOptionDataObject: () => Object,
  itemsToDelete: Object[],
  loadData: () => void,
  modalOpened: boolean,
  module: string,
  navigationItem: Object,
  onChangeSort: (string, ?string) => void,
  onListDeleteRequest: (boolean, Object[]) => void,
  onListDeleteRequestConfirmed: (string, Object[]) => void,
  onUpdateColumnRequest: (Object) => void,
  refreshSig: boolean,
  resetFilter: () => void,
  rights: Object,
  settings: Object,
  sort: Object,
  t: TranslateFunctionType
}

type ListComponentStateProps = {
  fetching: boolean,
  itemsToDelete: Object[],
  modalOpened: boolean,
  refreshSig: boolean,
}

class ListComponent extends React.PureComponent<ListComponentProps> {
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

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.module !== this.props.module || prevProps.refreshSig !== this.props.refreshSig) {
      this.props.onChangeRefreshSig(false)
      this.props.loadData()
    }
  }

  handleGetActions = () => {
    const { module, rights, changeRedirectUrl, settings, t } = this.props
    const { showFilter } = this.state

    const actions = []
    if (rights[USER_RIGHTS.ADD]) {
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

  handleGetFarActions = () => {
    const { t } = this.props
    return [
      {
        key: 'refresh',
        name: t('general.refresh'),
        iconProps: {
          iconName: 'Refresh',
        },
        onClick: this.props.loadData,
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

  handleGetColumns = () => {
    const {
      sort: { column, direction },
      settings: { listColumns },
      t,
    } = this.props
    return Array.isArray(listColumns)
      ? [
          ...listColumns.map((colName) => ({
            key: colName,
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
          },
        ]
      : []
  }

  handleOnHeaderClick = (event, cell) => {
    const { onChangeSort } = this.props
    onChangeSort(cell.key)
  }

  handleDeleteRequestCancel = () => {
    this.props.onListDeleteRequest(false, [])
  }

  handleDeleteRequestConfirm = () => {
    const { onListDeleteRequestConfirmed, navigationItem, itemsToDelete } = this.props
    onListDeleteRequestConfirmed(navigationItem.name, itemsToDelete)
  }

  handleRenderRowActions = (item) => {
    const { rights, module, changeRedirectUrl } = this.props
    return (
      <span key={`actions-${item.id}`}>
        {rights[USER_RIGHTS.VIEW] && (
          <FontIcon
            className="list-container__action"
            iconName="View"
            onClick={() => {
              changeRedirectUrl('/[module]/[action]/[id]', `/${module}/view/${item.id}`)
            }}
          />
        )}
        {rights[USER_RIGHTS.EDIT] && (
          <FontIcon
            className="list-container__action"
            iconName="Edit"
            onClick={() => {
              changeRedirectUrl('/[module]/[action]/[id]', `/${module}/edit/${item.id}`)
            }}
          />
        )}
        {rights[USER_RIGHTS.DELETE] && (
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

  handleRenderCell = (item, index, column) => {
    const {
      changeRedirectUrl,
      customComponents,
      settings: { customListComponents, columnValues },
      t,
    } = this.props
    let CustomValueComponent = false
    let customProps = {}
    let columnValue = getColumnValue(item, column.key)
    let sanitizedKey = sanitizeColumnName(column.key)
    if (customListComponents && customListComponents[sanitizedKey]) {
      let columnName = customListComponents[sanitizedKey]
      if (typeof columnName === 'object') {
        customProps = { ...columnName, name: undefined }
        columnName = columnName.name
      }
      CustomValueComponent = CustomModuleComponents[columnName]
      if (customComponents && customComponents[columnName]) {
        CustomValueComponent = customComponents[columnName]
      }
      return (
        <CustomValueComponent
          {...customProps}
          actionOnClick={this.handleCellActionClick}
          column={column}
          columnValues={columnValues && columnValues[column.key]}
          item={item}
          requestRedirectTo={changeRedirectUrl}
          t={t}
          value={columnValue}
        />
      )
    }
    return <ValueToString value={columnValue} />
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

  handleCellActionClick = (data, item) => {
    const { onUpdateColumnRequest, navigationItem, getListOptionDataObject } = this.props
    onUpdateColumnRequest({
      module: navigationItem.name,
      data: {
        ...item,
        ...data,
      },
      listDataOptions: getListOptionDataObject(),
    })
  }

  render() {
    const {
      changeFilterValue,
      data,
      fetching,
      filterData,
      loadData,
      modalOpened,
      resetFilter,
      rights,
      settings,
      t,
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
                  <PrimaryButton onClick={loadData} text={t('filter._action.search')} />
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
              items={data}
              onColumnHeaderClick={this.handleOnHeaderClick}
              selection={this.selection}
              selectionMode={SelectionMode.multiple}
            />
          </MarqueeSelection>
          {selectedArray.length > 0 && rights[USER_RIGHTS.DELETE] && (
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

const mapStateToProps = (state) => ({
  fetching: state.list.fetching,
  itemsToDelete: state.list.itemsToDelete,
  modalOpened: state.list.modalOpened,
  refreshSig: state.list.refreshSig,
})

const mapActionsToProps = {
  onChangeFilterData: ListActions.onChangeFilterData,
  onChangeRefreshSig: ListActions.onChangeRefreshSig,
  onListDeleteRequest: ListActions.onListDeleteRequest,
  onListDeleteRequestConfirmed: ListActions.onListDeleteRequestConfirmed,
  onUpdateColumnRequest: EditActions.onUpdateColumnRequest,
}

export default connect(mapStateToProps, mapActionsToProps)(withPaginationAndSort(ListComponent))
