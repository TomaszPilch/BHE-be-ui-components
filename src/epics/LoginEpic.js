// external libs
import { ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'
import { cookie } from 'devx-js-utilities'

// redux
import LoginActions, { LoginTypes } from '../redux/LoginRedux'
import UserActions from '../redux/UserRedux'
import NavigationActions from '../redux/NavigationRedux'

const saveToken = (accessToken: string) => {}

const LoginEpic = (apiLogin, apiMain, setToken) => (action$) =>
  action$.pipe(
    ofType(LoginTypes.ON_LOGIN),
    switchMap((action) =>
      from(apiLogin.login(action.data)).pipe(
        switchMap((loginResponse) => {
          setToken('Authorization', `Bearer ${loginResponse.data.accessToken}`)
          // todo secure
          cookie.createCookie('bheToken', loginResponse.data.accessToken, 60, false, 'strict')
          // refreshToken
          return from(apiMain.actualUser()).pipe(
            switchMap((userResponse) => {
              const urlParams = new URLSearchParams(window.location.search)
              const redirect = urlParams.get('redirectTo')
              return from([
                UserActions.onLoadUser(userResponse.data.user, userResponse.data.presentations),
                LoginActions.onLoginSuccess(),
                NavigationActions.onLoadNavigation(userResponse.data.navigation),
                NavigationActions.onRequestRedirectTo(`/${redirect ? `?redirectTo=${redirect}` : ''}`),
              ])
            }),
            catchError(() => of(LoginActions.onLoginFailure('SOMETHING_WRONG'))),
          )
        }),
        catchError(() => of(LoginActions.onLoginFailure('SOMETHING_WRONG'))),
      ),
    ),
  )

export default LoginEpic
