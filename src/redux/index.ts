import { EditReduxStore } from './types/EditReduxTypes'
import { HelperReduxStore } from './types/HelperReduxTypes'
import { ListReduxStore } from './types/ListReduxTypes'
import { LoginReduxStore } from './types/LoginReduxTypes'
import { NavigationReduxStore } from './types/NavigationReduxTypes'
import { NotificationReduxStore } from './types/NotificationReduxTypes'
import { UserReduxStore } from './types/UserReduxTypes'

export interface ReduxStore {
  edit: EditReduxStore
  helper: HelperReduxStore
  list: ListReduxStore
  login: LoginReduxStore
  navigation: NavigationReduxStore
  notification: NotificationReduxStore
  user: UserReduxStore
}
