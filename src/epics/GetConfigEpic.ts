import { ofType } from 'redux-observable'
import { from, Observable } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'
import { AnyAction } from 'redux'

// redux
import EditActions, { EditTypes } from '../redux/EditRedux'
import NotificationActions from '../redux/NotificationRedux'
import { ApiEndpointsType } from '../services/Api'
import { IOnEditLoadFormConfigRequest } from '../redux/types/EditReduxTypes'

const GetConfigEpic = (api: ApiEndpointsType) => (action$: Observable<IOnEditLoadFormConfigRequest>) =>
  action$.pipe(
    ofType(EditTypes.ON_EDIT_LOAD_FORM_CONFIG_REQUEST),
    switchMap((action) => {
      const url =
        action.data.type === 'ADD'
          ? api.getAddConfig(action.data.module)
          : action.data.type === 'VIEW'
          ? api.getViewConfig(action.data.module)
          : api.getEditConfig(action.data.module, action.data.id)
      return from(url).pipe(
        switchMap((response) => {
          if (response.status === 200) {
            const actions: AnyAction[] = [
              EditActions.onEditLoadFormConfigRequestSuccess(response.data.module, response.data.config),
            ]
            if (action.data.type !== 'ADD' && action.data.id) {
              actions.push(EditActions.onEditLoadFormDataRequest(action.data))
            }
            return from(actions)
          }
          throw response
        }),
        catchError((error) =>
          from([
            NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
            EditActions.onEditSetFetching(false),
          ]),
        ),
      )
    }),
  )

export default GetConfigEpic
