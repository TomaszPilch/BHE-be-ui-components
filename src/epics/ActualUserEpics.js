// external libs
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import UserActions, { UserTypes } from '../redux/UserRedux'
import NavigationActions from '../redux/NavigationRedux'
import NotificationActions from '../redux/NotificationRedux'
import ListActions from '../redux/ListRedux'
// import WidgetActions from '../redux/WidgetRedux'

const ActualUserEpics = (api) => [
  (action$) =>
    action$.pipe(
      ofType(UserTypes.ON_GET_ACTUAL_USER_REQUEST),
      switchMap(() =>
        from(api.actualUser()).pipe(
          switchMap((response) => {
            if (response.status === 200) {
              return from([
                ListActions.onLoadListSettings(),
                UserActions.onLoadUser(response.data.user, response.data.presentations),
                NavigationActions.onLoadNavigation(response.data.navigation),
                // WidgetActions.setWidgets(response.data.widgets),
              ])
            }
            throw response
          }),
          catchError((error) => of(NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'))),
        ),
      ),
    ),
  (action$) =>
    action$.pipe(
      ofType(UserTypes.ON_CHANGE_USER_GROUP_REQUEST),
      switchMap((action) =>
        from(api.setActualGroup({ groupId: action.selectedGroupId })).pipe(
          switchMap((response) => {
            if (response.status === 200) {
              return from([
                UserActions.onChangeUserGroupSuccess(response.data.selectedGroupId),
                UserActions.onGetActualUserRequest(),
                NavigationActions.onRequestRedirectTo('/', '/'),
              ])
            }
            throw response
          }),
          catchError((error) => of(NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'))),
        ),
      ),
    ),
]

export default ActualUserEpics
