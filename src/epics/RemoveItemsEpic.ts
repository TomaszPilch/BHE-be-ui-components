import { ofType } from 'redux-observable'
import { from, of, Observable } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import ListActions, { ListTypes } from '../redux/ListRedux'
import NotificationActions from '../redux/NotificationRedux'
import { ApiEndpointsType } from '../services/Api'
import { IOnListDeleteRequestConfirmed } from '../redux/types/ListReduxTypes'

const RemoveItemsEpic = (api: ApiEndpointsType) => (action$: Observable<IOnListDeleteRequestConfirmed>) =>
  action$.pipe(
    ofType(ListTypes.ON_LIST_DELETE_REQUEST_CONFIRMED),
    switchMap((action) => {
      let request = null
      if (action.items.some((item) => typeof item.id !== 'undefined')) {
        request = api.removeItems(
          action.moduleName,
          action.items.map((item) => item.id as number),
        )
      } else {
        request = api.removeItemsWithMultipleParams(action.moduleName, action.items)
      }
      return from(request).pipe(
        switchMap(() =>
          from([
            ListActions.onListDeleteRequest(false, []),
            ListActions.onChangeRefreshSig(true),
            NotificationActions.addSuccessNotification(
              'ITEMS_SUCCESSFULLY_DELETED_MESSAGE',
              'ITEMS_SUCCESSFULLY_DELETED_TITLE',
              true,
            ),
          ]),
        ),
        catchError((error) => of(NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'))),
      )
    }),
  )

export default RemoveItemsEpic
