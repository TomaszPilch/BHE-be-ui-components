// external libs
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import Api from '../services/Api'

// redux
import LoginActions, { LoginTypes } from '../redux/LoginRedux'

const IsLoggedInEpic = (api) => (action$) =>
  action$.pipe(
    ofType(LoginTypes.ON_LOGIN_IS_LOGGED_IN),
    switchMap(() =>
      from(api.isLoggedIn()).pipe(
        switchMap(() => of(LoginActions.onLoginIsLoggedInResponse(true))),
        catchError(() => of(LoginActions.onLoginIsLoggedInResponse(false))),
      ),
    ),
  )

export default IsLoggedInEpic
