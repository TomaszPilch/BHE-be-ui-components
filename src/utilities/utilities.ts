import { pathOr } from 'ramda'
import { ValidationError, ValidationErrorSuffix, ValidationResult } from './validationRules'

/**
 * Get first validation error, can be with suffix
 * @param error
 * @returns object
 */
export const getMessageFromValidationError = (
  error: ValidationResult | ValidationResult[],
): false | ValidationError => {
  const suffix: ValidationErrorSuffix = { msg: '', data: {} }
  let validationError: ValidationResult[] | ValidationResult = error
  if (Array.isArray(error)) {
    validationError = error[0]
    if (error.length > 1) {
      suffix.msg = 'validationErrors.suffix_interval'
      suffix.data = { count: error.length - 1, postProcess: 'interval' }
    }
  }
  if ('result' in validationError) {
    const validationErrorResult = validationError.result as ValidationError
    return { ...validationErrorResult, suffix }
  }
  return false
}

export const getErrorText = (errors: ValidationResult | ValidationResult[], t: Function) => {
  const error = getMessageFromValidationError(errors)
  if (!error) {
    return ''
  }
  return `${t(error.msg, error.data)} ${error.suffix ? t(error.suffix.msg, error.suffix.data) : ''}`
}

export const copyString = (text: string, element: string = 'textarea') => {
  // @ts-ignore
  const el: HTMLInputElement = document.createElement(element)
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
export const formatString = (pattern: string, values: Object): string =>
  pattern.split('{').reduce((acc, itemPattern) => {
    if (itemPattern.indexOf('}') !== -1) {
      const split = itemPattern.split('}')
      acc += pathOr('', [split[0]], values) + split[1]
    } else {
      acc += itemPattern
    }
    return acc
  }, '')
