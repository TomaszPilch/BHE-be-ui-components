import { from, Observable } from 'rxjs'
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
import { ApiEndpointsType, ApiLoginEndpointsType } from '../services/Api'

// functions
import { fileToBase64 } from '../functions/files'

import {
  IOnEditSaveRequest,
  IOnUpdateColumnRequest,
  IToBase64,
  IUploadFileRequest,
} from '../redux/types/EditReduxTypes'
import { ValidationErrorsType } from '../utilities/validationRules'

const SaveDataEpic = (api: ApiEndpointsType, selfApi: ApiLoginEndpointsType) => [
  (action$: Observable<IOnEditSaveRequest>) =>
    action$.pipe(
      ofType(EditTypes.ON_EDIT_SAVE_REQUEST),
      switchMap((action: IOnEditSaveRequest) => {
        const apiFunction = action.data.type === 'ADD' ? api.addData : api.editData
        return from(apiFunction(action.data.module, action.data.data)).pipe(
          switchMap((response) => {
            if (response.status === 200 && response.data.type === 'VALIDATION_RESULT') {
              return from([EditActions.onEditChangeValidationErrors(response.data.errors as ValidationErrorsType)])
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
              if (Uppy && Uppy.uppy) {
                const files = Uppy.uppy.getFiles()
                if (files.length > 0) {
                  // @ts-ignore
                  actions.push(EditActions.toBase64(action.data, files[0].data))
                }
              }
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
  (action$: Observable<IToBase64>) =>
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
  (action$: Observable<IUploadFileRequest>) =>
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
            if (Uppy.uppy) {
              Uppy.uppy.reset()
            }
            return from([
              EditActions.onUpdateColumnRequest({
                type: 'EDIT',
                module: data.module,
                moduleUrl: data.moduleUrl,
                data: {
                  ...data.data,
                  image: response.data,
                },
              }),
            ])
          }),
          catchError((error) => {
            if (Uppy.uppy) {
              Uppy.uppy.reset()
            }
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
