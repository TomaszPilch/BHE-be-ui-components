import { FieldConfigBasicTypeStack, FormConfigWithTab } from '../types/FormTypes'

const initValue = (formItem: FieldConfigBasicTypeStack<string>) => {
  if (typeof formItem.defaultValue !== 'undefined') {
    return formItem.defaultValue
  }
  if (formItem.type === 'bool') {
    return false
  }
  return ''
}

const initEmptyData = (config: FormConfigWithTab) =>
  Object.keys(config).reduce<{ [key: string]: any }>((acc, tab) => {
    acc = config[tab].reduce((accS, formItem) => {
      if (formItem.translated) {
        if (!accS.texts) {
          accS.texts = {}
        }
        accS.texts[formItem.name] = initValue(formItem)
      } else {
        accS[formItem.name] = initValue(formItem)
      }
      return accS
    }, acc)
    return acc
  }, {})

export default initEmptyData
