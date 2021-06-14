import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { assocPath, pathOr } from 'ramda'

// redux
import ListActions from '../redux/ListRedux'

import { IListReduxCreators } from '../redux/types/ListReduxTypes'
import { FilterType, PaginatorType, SortObjectType } from '../types/ViewTypes'
import { ReduxStore } from '../redux'
import { NavigationItem } from '../types/NavigationTypes'

export interface WithPaginationAndSortStateProps<DataItemType = any> {
  data: DataItemType[]
  paginator: PaginatorType
  sort: SortObjectType
  filterData: FilterType
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

const emptyObject = {}
function withPaginationAndSort<P extends object>(Component: React.ComponentType<P>): any {
  class WithPaginationAndSort extends React.Component<P & WithPaginationAndSortPropsType> {
    componentRef = createRef()

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
      if (typeof pageIndex === 'number') {
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
        this.handleLoadData(undefined, assocPath([key], value, filterData))
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
    data: pathOr([], [ownProps.navigationItem.name], state.list.data),
    paginator: pathOr(
      {
        limit: 20,
        maxCount: 0,
        maxPage: 1,
        page: 1,
      },
      [ownProps.navigationItem.name],
      state.list.paginator,
    ),
    sort: pathOr(emptyObject, [ownProps.navigationItem.name], state.list.sort),
    filterData: pathOr(emptyObject, [ownProps.navigationItem.name], state.list.filterData),
  })

  return connect<
    WithPaginationAndSortStateProps,
    WithPaginationAndSortDispatchProps,
    WithPaginationAndSortOwnProps,
    ReduxStore
  >(mapStateToProps, {
    onLoadListData: ListActions.onLoadListData,
    onLoadListWidgetData: ListActions.onLoadListWidgetData,
    // @ts-ignore
  })(WithPaginationAndSort)
}

export default withPaginationAndSort
