// external libs
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import ListActions, { ListTypes } from '../redux/ListRedux'
import HelperActions, { HelperTypes } from '../redux/HelperRedux'
import NotificationActions from '../redux/NotificationRedux'

const ListSettingsEpic = (api) => [
  (action$) =>
    action$.pipe(
      ofType(ListTypes.ON_LOAD_LIST_DATA),
      switchMap((action) =>
        from(
          api.listData(
            action.module,
            action.page,
            action.limit,
            action.orderColumn,
            action.orderDirection,
            action.filter,
          ),
        ).pipe(
          switchMap((response) => of(ListActions.onLoadListDataSuccess(response.data))),
          catchError((error) =>
            from([
              NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
              ListActions.onListStopFetching(),
            ]),
          ),
        ),
      ),
    ),
  (action$) =>
    action$.pipe(
      ofType(ListTypes.ON_LOAD_LIST_WIDGET_DATA),
      switchMap((action) =>
        from(
          api.listWidgetData(
            action.module,
            action.widgetName,
            action.page,
            action.limit,
            action.orderColumn,
            action.orderDirection,
            action.filter,
            action.parentId,
            action.parentModule,
          ),
        ).pipe(
          switchMap((response) =>
            of(ListActions.onLoadListWidgetDataSuccess(action.module, action.widgetName, response.data)),
          ),
          catchError((error) =>
            from([
              NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
              ListActions.onWidgetStopFetching(),
            ]),
          ),
        ),
      ),
    ),
  (action$) =>
    action$.pipe(
      ofType(HelperTypes.GET_RESOURCES_REQUEST),
      switchMap((action) =>
        from(api.getResources(action.resourceName)).pipe(
          switchMap((response) => of(HelperActions.getResourcesRequestSuccess(action.resourceName, response.data))),
          catchError((error) => from([NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG')])),
        ),
      ),
    ),
]

export default ListSettingsEpic
