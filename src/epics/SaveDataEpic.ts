import { from, Observable } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, switchMap } from 'rxjs/operators'

// redux
import EditActions, { EditTypes } from '../redux/EditRedux'
import NavigationActions from '../redux/NavigationRedux'
import NotificationActions from '../redux/NotificationRedux'
import ListActions from '../redux/ListRedux'
import { ApiEndpointsType } from '../services/Api'

import { IOnEditSaveRequest, IOnUpdateColumnRequest } from '../redux/types/EditReduxTypes'

const SaveDataEpic = (api: ApiEndpointsType) => [
  (action$: Observable<IOnEditSaveRequest>) =>
    action$.pipe(
      ofType(EditTypes.ON_EDIT_SAVE_REQUEST),
      switchMap((action: IOnEditSaveRequest) => {
        const apiFunction = action.data.type === 'ADD' ? api.addData : api.editData
        return from(apiFunction(action.data.module, action.data.data)).pipe(
          switchMap((response) => {
            if (response.status === 200 && response.data.type === 'VALIDATION_RESULT') {
              return from([EditActions.onEditChangeValidationErrors(response.data.errors)])
            }
            if (response.status === 200) {
              return from([
                NavigationActions.onRequestRedirectTo('/[module]', action.data.moduleUrl),
                EditActions.onEditSaveRequestSuccess(response.data),
                NotificationActions.addSuccessNotification(
                  'SUCCESSFULLY_SAVED_MESSAGE',
                  'SUCCESSFULLY_SAVED_TITLE',
                  true,
                ),
              ])
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
    ),
  (action$: Observable<IOnUpdateColumnRequest>) =>
    action$.pipe(
      ofType(EditTypes.ON_UPDATE_COLUMN_REQUEST),
      switchMap((action) =>
        from(api.updateData(action.data.module, action.data.data)).pipe(
          switchMap((response) => {
            if (response.status === 200) {
              return from([
                EditActions.onUpdateColumnRequestSuccess(response.data),
                ListActions.onChangeRefreshSig(true),
                NotificationActions.addSuccessNotification(
                  'SUCCESSFULLY_SAVED_MESSAGE',
                  'SUCCESSFULLY_SAVED_TITLE',
                  true,
                ),
              ])
            }
            throw response
          }),
          catchError((error) =>
            from([
              NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
              EditActions.onEditSetFetching(false),
            ]),
          ),
        ),
      ),
    ),
]

export default SaveDataEpic
