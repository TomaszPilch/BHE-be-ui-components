// @flow
/**
 * Creates validation error result
 * @param {string} msg
 * @param {object} data
 */
export const createValidationError = (msg, data = {}) => ({
  msg,
  data,
})

export const getValueForPath = (pathArray: string | Array<string | number>, item: Object, index: number = 0): any => {
  if (typeof pathArray === 'string') {
    return getValueForPath(pathArray.split('.'), item, index)
  }

  if (Array.isArray(item) && item.length > 0 && !item[pathArray[index]]) {
    return getValueForPath(pathArray, item[0], index)
  }

  if (typeof item === 'undefined' || !pathArray || typeof item[pathArray[index]] === 'undefined') {
    return ''
  }

  if (pathArray.length - 1 === index) {
    return item[pathArray[index]]
  }

  return getValueForPath(pathArray, item[pathArray[index]], index + 1)
}

/**
 * Get first validation error, can be with suffix
 * @param error
 * @returns object
 */
export const getMessageFromValidationError = (error) => {
  const suffix = { msg: '', data: {} }
  let validationError = error
  if (Array.isArray(error)) {
    validationError = error[0]
    if (error.length > 1) {
      suffix.msg = 'validationErrors.suffix_interval'
      suffix.data = { count: error.length - 1, postProcess: 'interval' }
    }
  }
  return validationError ? { ...validationError.result, suffix } : false
}

export const getErrorText = (errors: Object, t: Function) => {
  const error = getMessageFromValidationError(errors)
  if (!error) {
    return ''
  }
  return `${t(error.msg, error.data)} ${t(error.suffix.msg, error.suffix.data)}`
}

export const copyString = (text: string, element: string = 'textarea') => {
  const el = document.createElement(element)
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export const sanitizeColumnName = (name: string) => name.replace(/\./g, '_')

/**
 * Formats string base on provided pattern
 * @param {string} pattern - '{id}. {name}'
 * @param {object} values - {id: 1, name: 'Mr. Ex'}
 */
export const formatString = (pattern, values) =>
  pattern.split('{').reduce((acc, itemPattern) => {
    if (itemPattern.indexOf('}') !== -1) {
      const split = itemPattern.split('}')
      acc += getValueForPath(split[0], values) + split[1]
    } else {
      acc += itemPattern
    }
    return acc
  }, '')
