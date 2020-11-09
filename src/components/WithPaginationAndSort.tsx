import React from 'react'
import { connect } from 'react-redux'
import Immutable, { ImmutableArray, ImmutableObject } from 'seamless-immutable'

// redux
import ListActions from '../redux/ListRedux'

import { IListReduxCreators } from '../redux/types/ListReduxTypes'
import { FilterType, PaginatorType, SortObjectType } from '../types/ViewTypes'
import { ReduxStore } from '../redux'
import { NavigationItem } from '../types/NavigationTypes'

export interface WithPaginationAndSortStateProps<DataItemType = any> {
  data: ImmutableArray<DataItemType>
  paginator: ImmutableObject<PaginatorType>
  sort: ImmutableObject<SortObjectType>
  filterData: ImmutableObject<FilterType>
}

export interface WithPaginationAndSortDispatchProps {
  onLoadListData: IListReduxCreators['onLoadListData']
  onLoadListWidgetData: IListReduxCreators['onLoadListWidgetData']
}

export interface WithPaginationAndSortOwnProps {
  navigationItem: NavigationItem
  parentId: number
  parentModule: string
  widgetName: string
  onChangeFilterData: IListReduxCreators['onChangeFilterData']
}

type WithPaginationAndSortPropsType<DataItemType = any> = WithPaginationAndSortStateProps<DataItemType> &
  WithPaginationAndSortDispatchProps &
  WithPaginationAndSortOwnProps

export type WithPaginationAndSortPassDownProps<DataItemType = any> = WithPaginationAndSortPropsType<DataItemType> & {
  changeFilterValue: (key: string, value: string, reloadData?: boolean) => void
  getListOptionDataObject: () => void
  loadData: (sort?: SortObjectType, filter?: FilterType, pageIndex?: number) => void
  onChangePage: (page: number) => void
  onChangeSort: (key: string, dir?: 'ASC' | 'DESC') => void
  resetFilter: () => void
}

const emptyImmutable = Immutable({})
function withPaginationAndSort<P extends object>(Component: React.ComponentType<P>) {
  class WithPaginationAndSort extends React.Component<P & WithPaginationAndSortPropsType> {
    getListOptionDataObject = () => {
      const {
        navigationItem: { name },
        paginator: { page, limit },
        filterData,
        sort: { column, direction },
      } = this.props
      return {
        name,
        page,
        limit,
        column,
        direction,
        filterData,
      }
    }

    handleLoadData = (sort?: SortObjectType, filter?: FilterType, pageIndex?: number) => {
      const {
        filterData,
        navigationItem: { name },
        paginator: { limit },
        onLoadListData,
        onLoadListWidgetData,
        parentId,
        parentModule,
        widgetName,
      } = this.props
      let {
        sort: { column, direction },
        paginator: { page },
      } = this.props
      if (sort && sort.column) {
        column = sort.column
        direction = sort.direction
      }
      if (pageIndex) {
        page = pageIndex + 1
      }
      if (parentId && parentModule && widgetName) {
        onLoadListWidgetData(
          name,
          widgetName,
          page,
          limit,
          column,
          direction,
          filter || filterData,
          parentId,
          parentModule,
        )
      } else {
        onLoadListData(name, page, limit, column, direction, filter || filterData)
      }
    }

    handleChangeSort = (key: string, dir?: 'ASC' | 'DESC') => {
      const {
        sort: { column, direction },
      } = this.props
      let newSortDirection = dir || 'DESC'
      if (!dir && column === key && direction === 'DESC') {
        newSortDirection = 'ASC'
      }
      this.handleLoadData({ direction: newSortDirection, column: key })
    }

    handleChangeFilterValue = (key: string, value: string, reloadData: boolean = false) => {
      const { filterData, onChangeFilterData, navigationItem } = this.props
      const path = [navigationItem.name, key]
      onChangeFilterData(path, value)
      if (reloadData) {
        this.handleLoadData(undefined, filterData.setIn([key], value))
      }
    }

    handleResetFilter = () => {
      const { onChangeFilterData, navigationItem } = this.props
      onChangeFilterData([navigationItem.name], {})
      this.handleLoadData(undefined, {})
    }

    handleChangePage = (page: number) => {
      this.handleLoadData(undefined, undefined, page)
    }

    render() {
      const otherProps = {
        changeFilterValue: this.handleChangeFilterValue,
        getListOptionDataObject: this.getListOptionDataObject,
        loadData: this.handleLoadData,
        onChangePage: this.handleChangePage,
        onChangeSort: this.handleChangeSort,
        resetFilter: this.handleResetFilter,
      }
      return <Component {...this.props} {...otherProps} ref={this.componentRef} />
    }
  }

  const mapStateToProps = (
    state: ReduxStore,
    ownProps: WithPaginationAndSortOwnProps,
  ): WithPaginationAndSortStateProps => ({
    data: state.list.data.getIn([ownProps.navigationItem.name], []),
    paginator: state.list.paginator.getIn([ownProps.navigationItem.name], {
      limit: 20,
      maxCount: 0,
      maxPage: 1,
      page: 1,
    }),
    sort: state.list.sort.getIn([ownProps.navigationItem.name], {
      column: 'id',
      direction: 'DESC',
    }),
    filterData: state.list.filterData.getIn([ownProps.navigationItem.name], emptyImmutable),
  })

  return connect<
    WithPaginationAndSortStateProps,
    WithPaginationAndSortDispatchProps,
    WithPaginationAndSortOwnProps,
    ReduxStore
  >(mapStateToProps, {
    onLoadListData: ListActions.onLoadListData,
    onLoadListWidgetData: ListActions.onLoadListWidgetData,
  })(WithPaginationAndSort)
}

export default withPaginationAndSort
