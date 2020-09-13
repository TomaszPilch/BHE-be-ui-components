// @flow
const initValue = (formItem) => {
  if (typeof formItem.defaultValue !== 'undefined') {
    return formItem.defaultValue
  }
  if (formItem.type === 'bool') {
    return false
  }
  return ''
}

const initEmptyData = (config) =>
  Object.keys(config).reduce((acc, tab) => {
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
