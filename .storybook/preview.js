import styles from '../src/styles/base.scss'
import { initializeIcons } from '@uifabric/icons'

initializeIcons()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
