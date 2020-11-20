// external libs
import { ofType } from 'redux-observable'
import { from, of, Observable } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import EditActions, { EditTypes } from '../redux/EditRedux'
import NotificationActions from '../redux/NotificationRedux'
import { ApiEndpointsType } from '../services/Api'
import { IOnEditLoadFormDataRequest } from '../redux/types/EditReduxTypes'

const GetItemData = (api: ApiEndpointsType) => (action$: Observable<IOnEditLoadFormDataRequest>) =>
  action$.pipe(
    ofType(EditTypes.ON_EDIT_LOAD_FORM_DATA_REQUEST),
    switchMap((action) => {
      const apiFunction =
        action.data.type === 'ADD' ? api.getAddData : action.data.type === 'VIEW' ? api.getViewData : api.getEditData
      return from(apiFunction(action.data.module, action.data.id)).pipe(
        switchMap((response) => {
          if (response.status === 200) {
            return of(EditActions.onEditLoadFormDataRequestSuccess(response.data.module, response.data.data))
          }
          throw response
        }),
        catchError((error) => {
          return from([
            NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
            EditActions.onEditSetFetching(false),
          ])
        }),
      )
    }),
  )

export default GetItemData
