import { ofType } from 'redux-observable'
import { from, of, EMPTY, Observable } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

// redux
import LoginActions, { LoginTypes } from '../redux/LoginRedux'
import { ApiEndpointsType } from '../services/Api'
import { IOnGetLocale } from '../redux/types/LoginReduxTypes'

const GetLocaleEpic = (api: ApiEndpointsType) => (action$: Observable<IOnGetLocale>) =>
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
