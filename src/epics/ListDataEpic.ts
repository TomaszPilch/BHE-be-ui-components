// external libs
import { ofType } from 'redux-observable'
import { from, of, Observable } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import ListActions, { ListTypes } from '../redux/ListRedux'
import HelperActions, { HelperTypes } from '../redux/HelperRedux'
import NotificationActions from '../redux/NotificationRedux'
import { ApiEndpointsType } from '../services/Api'
import { IOnLoadListData, IOnLoadListWidgetData } from '../redux/types/ListReduxTypes'
import { IGetResourcesRequest } from '../redux/types/HelperReduxTypes'

const ListSettingsEpic = (api: ApiEndpointsType) => [
  (action$: Observable<IOnLoadListData>) =>
    action$.pipe(
      ofType(ListTypes.ON_LOAD_LIST_DATA),
      switchMap((action) =>
        from(
          api.listData(
            action.module,
            action.page,
            action.limit,
            action.orderColumn as string,
            action.orderDirection as 'DESC' | 'ASC',
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
  (action$: Observable<IOnLoadListWidgetData>) =>
    action$.pipe(
      ofType(ListTypes.ON_LOAD_LIST_WIDGET_DATA),
      switchMap((action) =>
        from(
          api.listWidgetData(
            action.module,
            action.widgetName,
            action.page,
            action.limit,
            action.orderColumn as string,
            action.orderDirection as 'DESC' | 'ASC',
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
  (action$: Observable<IGetResourcesRequest>) =>
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
