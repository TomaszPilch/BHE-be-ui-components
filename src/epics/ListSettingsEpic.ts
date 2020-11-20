import { ofType } from 'redux-observable'
import { from, of, Observable } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import ListActions, { ListTypes } from '../redux/ListRedux'
import NotificationActions from '../redux/NotificationRedux'
import { ApiEndpointsType } from '../services/Api'
import { IOnLoadListSettings, IOnLoadListWidgetSettings } from '../redux/types/ListReduxTypes'

const ListSettingsEpic = (api: ApiEndpointsType) => [
  (action$: Observable<IOnLoadListSettings>) =>
    action$.pipe(
      ofType(ListTypes.ON_LOAD_LIST_SETTINGS),
      switchMap(() =>
        from(api.listSettings()).pipe(
          switchMap((response) => of(ListActions.onLoadListSettingsSuccess(response.data))),
          catchError((error) => of(NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'))),
        ),
      ),
    ),
  (action$: Observable<IOnLoadListWidgetSettings>) =>
    action$.pipe(
      ofType(ListTypes.ON_LOAD_LIST_WIDGET_SETTINGS),
      switchMap((action) =>
        from(api.listWidgetSettings(action.module, action.widgetName)).pipe(
          switchMap((response) =>
            of(ListActions.onLoadListWidgetSettingsSuccess(action.module, action.widgetName, response.data)),
          ),
          catchError((error) =>
            of(
              NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
              ListActions.onWidgetStopFetching(),
            ),
          ),
        ),
      ),
    ),
]

export default ListSettingsEpic
