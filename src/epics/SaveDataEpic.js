// @flow
import { from } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, switchMap } from 'rxjs/operators'
import { v4 } from 'uuid'

// services
import Uppy from '../services/Uppy'

// redux
import EditActions, { EditTypes } from '../redux/EditRedux'
import NavigationActions from '../redux/NavigationRedux'
import NotificationActions from '../redux/NotificationRedux'
import ListActions from '../redux/ListRedux'
import { fileToBase64 } from '../functions/files'

const SaveDataEpic = (api, selfApi) => [
  (action$) =>
    action$.pipe(
      ofType(EditTypes.ON_EDIT_SAVE_REQUEST),
      switchMap((action) => {
        const apiFunction = action.data.type === 'ADD' ? api.addData : api.editData
        return from(apiFunction(action.data.module, action.data.data)).pipe(
          switchMap((response) => {
            if (response.status === 200 && response.data.type === 'VALIDATION_RESULT') {
              return from([EditActions.onEditChangeValidationErrors(response.data.errors)])
            }
            if (response.status === 200) {
              const actions = [
                NavigationActions.onRequestRedirectTo('/[module]', action.data.moduleUrl),
                EditActions.onEditSaveRequestSuccess(response.data),
                NotificationActions.addSuccessNotification(
                  'SUCCESSFULLY_SAVED_MESSAGE',
                  'SUCCESSFULLY_SAVED_TITLE',
                  true,
                ),
              ]
              const files = Uppy.uppy.getFiles()
              if (files.length > 0) {
                actions.push(EditActions.toBase64(action.data, files[0].data))
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
    ),
  (action$) =>
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
  (action$: any) =>
    action$.pipe(
      ofType(EditTypes.TO_BASE64),
      switchMap(({ data, fileData }) =>
        from(fileToBase64(fileData)).pipe(
          switchMap((fileBase64) => [EditActions.uploadFileRequest(data, fileBase64)]),
          catchError((error) =>
            from([
              NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
              EditActions.onEditSetFetching(false),
            ]),
          ),
        ),
      ),
    ),
  (action$: any) =>
    action$.pipe(
      ofType(EditTypes.UPLOAD_FILE_REQUEST),
      switchMap(({ data, fileBinary }) => {
        return from(
          selfApi.postSingleImageUpload({
            id: v4(),
            base64: fileBinary,
          }),
        ).pipe(
          switchMap((response) => {
            Uppy.uppy.reset()
            return from([
              EditActions.onUpdateColumnRequest({
                module: data.module,
                data: {
                  ...data.data,
                  image: response.data,
                },
              }),
            ])
          }),
          catchError((error) => {
            Uppy.uppy.reset()
            return from([
              NotificationActions.addErrorNotification(error.toString(), 'SOMETHING_WRONG'),
              EditActions.onEditSetFetching(false),
            ])
          }),
        )
      }),
    ),
]

export default SaveDataEpic
