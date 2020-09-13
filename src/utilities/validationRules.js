// @flow
import { validate } from 'devx-js-utilities'

import { createValidationError } from './utilities'

const canBeEmpty = (value) =>
  typeof value === 'undefined' || value === null || (typeof value === 'string' && value.length === 0)

/**
 * @param {string} value
 * @param {RegExp} regExpTest
 */
const regExp = (value, regExpTest) =>
  new RegExp(regExpTest).test(value)
    ? true
    : createValidationError('validationErrors.badRegExp', { pattern: regExpTest })

/**
 * @param {string} value
 * @param {int} min
 */
const minLength = (value, min) =>
  typeof value === 'string' && min > 0 && value.length >= min
    ? true
    : createValidationError('validationErrors.tooShort', { length: min })

/**
 * @param {string} value
 * @param {int} max
 */
const maxLength = (value, max) =>
  typeof value === 'string' && max > 0 && value.length <= max
    ? true
    : createValidationError('validationErrors.tooLong', { length: max })

/**
 * @param {string} value
 */
const isPhone = (value) =>
  typeof value === 'string' && validate.validatePhone(value)
    ? true
    : createValidationError('validationErrors.badPhoneFormat')

/**
 * @param {string} value
 */
const isEmail = (value) =>
  typeof value === 'string' && validate.validateEmail(value) ? true : createValidationError('validationErrors.email')

/**
 * @param {string} value
 */
const isNumber = (value) => (validate.isNumeric(value) ? true : createValidationError('validationErrors.numeric'))

/**
 * @param {string} value
 * @param {object} range
 */
const inRange = (value, range) =>
  isNumber(value) &&
  range.start !== null &&
  range.end !== null &&
  !(range.start > parseInt(value, 10) || range.end < parseInt(value, 10))
    ? true
    : createValidationError('validationErrors.range', { start: range.start, end: range.end })

/**
 * @param {string} value
 */
const isInteger = (value) => (/^\d+$/.test(value) ? true : createValidationError('validationErrors.integer'))

/**
 * @param {string} value
 */
const isRequired = (value) =>
  typeof value !== 'undefined' && `${value}`.length > 0 ? true : createValidationError('validationErrors.required')

export default {
  canBeEmpty,
  regExp,
  minLength,
  maxLength,
  isPhone,
  isEmail,
  isNumber,
  inRange,
  isInteger,
  isRequired,
}
