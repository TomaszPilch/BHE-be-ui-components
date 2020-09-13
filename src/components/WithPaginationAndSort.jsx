// @flow
import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'

// redux
import ListActions from '../redux/ListRedux'

type withPaginationAndSortProps = {
  data: Object[],
  navigationItem: Object,
  onLoadListData: (string, number, number, string, string, Object) => void,
  paginator: Object,
  sort: Object,
}

const emptyImmutable = Immutable({})
const withPaginationAndSort = (Component) => {
  class WithPaginationAndSort extends React.Component<withPaginationAndSortProps, null> {
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

    handleLoadData = (sort?: Object, filter?: Object) => {
      const {
        filterData,
        navigationItem: { name },
        onLoadListData,
        onLoadListWidgetData,
        paginator: { page, limit },
        parentId,
        parentModule,
        widgetName,
      } = this.props
      let {
        sort: { column, direction },
      } = this.props
      if (sort && sort.column) {
        column = sort.column
        direction = sort.direction
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

    render() {
      const otherProps = {
        changeFilterValue: this.handleChangeFilterValue,
        getListOptionDataObject: this.getListOptionDataObject,
        loadData: this.handleLoadData,
        onChangeSort: this.handleChangeSort,
        resetFilter: this.handleResetFilter,
      }
      return <Component {...this.props} {...otherProps} ref={this.componentRef} />
    }
  }

  const mapStateToProps = (state, ownProps) => ({
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

  return connect(mapStateToProps, {
    onLoadListData: ListActions.onLoadListData,
    onLoadListWidgetData: ListActions.onLoadListWidgetData,
  })(WithPaginationAndSort)
}

export default withPaginationAndSort
