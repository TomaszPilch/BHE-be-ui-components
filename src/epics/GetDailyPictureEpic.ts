import { ofType } from 'redux-observable'
import { from, of, EMPTY, Observable } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import LoginActions, { LoginTypes } from '../redux/LoginRedux'
import { ApiEndpointsType } from '../services/Api'
import { IGetDailyPicture } from '../redux/types/LoginReduxTypes'

const GetDailyPictureEpic = (api: ApiEndpointsType) => (action$: Observable<IGetDailyPicture>) =>
  action$.pipe(
    ofType(LoginTypes.GET_DAILY_PICTURE),
    switchMap(() =>
      from(api.getDailyPicture()).pipe(
        switchMap((response) => of(LoginActions.getDailyPictureSuccess(response.data))),
        catchError(() => EMPTY),
      ),
    ),
  )

export default GetDailyPictureEpic
