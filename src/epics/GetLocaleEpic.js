// external libs
import { ofType } from 'redux-observable'
import { from, of, EMPTY } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import LoginActions, { LoginTypes } from '../redux/LoginRedux'

const GetLocaleEpic = (api) => (action$) =>
  action$.pipe(
    ofType(LoginTypes.ON_GET_LOCALE),
    switchMap(() =>
      from(api.locale()).pipe(
        switchMap((response) => of(LoginActions.onGetLocaleSuccess(response.data))),
        catchError(() => EMPTY),
      ),
    ),
  )

export default GetLocaleEpic
