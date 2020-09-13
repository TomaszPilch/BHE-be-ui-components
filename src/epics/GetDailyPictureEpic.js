// external libs
import { ofType } from 'redux-observable'
import { from, of, EMPTY } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import LoginActions, { LoginTypes } from '../redux/LoginRedux'

const GetDailyPictureEpic = (api) => (action$) =>
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
