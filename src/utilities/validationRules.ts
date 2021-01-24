// @ts-ignore
import { validate } from 'devx-js-utilities'

type ValueType = undefined | null | string | number
type RangeType = {
  start: number | null
  end: number | null
}

export type PatternValidationErrorData = {
  pattern: string
}

export type LengthValidationErrorData = {
  length: number
}

export type RangeValidationErrorData = RangeType

export type ValidationErrorData = PatternValidationErrorData | LengthValidationErrorData | RangeValidationErrorData

export type ValidationErrorSuffix = {
  msg: string
  data: {
    count?: number
    postProcess?: 'interval'
  }
}

export type ValidationError = {
  msg: string
  data?: ValidationErrorData
  suffix?: ValidationErrorSuffix
}

export type ValidationResult = {
  result: false | ValidationError | ValidationError[]
  rule: string
}

export type ValidationErrorsType = {
  [key: string]: ValidationResult[]
}

/**
 * Creates validation error result
 * @param {string} msg
 * @param {object} data
 */
export const createValidationError = (msg: string, data?: ValidationErrorData): ValidationError => ({
  msg,
  data,
})

const canBeEmpty = (value: ValueType) =>
  typeof value === 'undefined' || value === null || (typeof value === 'string' && value.length === 0)

/**
 * @param {string} value
 * @param {RegExp} regExpTest
 */
const regExp = (value: ValueType, regExpTest: string): true | ValidationError =>
  typeof value === 'string' && new RegExp(regExpTest).test(value)
    ? true
    : createValidationError('validationErrors.badRegExp', { pattern: regExpTest })

/**
 * @param {string} value
 * @param {int} min
 */
const minLength = (value: ValueType, min: number): true | ValidationError =>
  typeof value === 'string' && min > 0 && value.length >= min
    ? true
    : createValidationError('validationErrors.tooShort', { length: min })

/**
 * @param {string} value
 * @param {int} max
 */
const maxLength = (value: ValueType, max: number): true | ValidationError =>
  typeof value === 'string' && max > 0 && value.length <= max
    ? true
    : createValidationError('validationErrors.tooLong', { length: max })

/**
 * @param {string} value
 */
const isPhone = (value: ValueType): true | ValidationError =>
  typeof value === 'string' && validate.validatePhone(value)
    ? true
    : createValidationError('validationErrors.badPhoneFormat')

/**
 * @param {string} value
 */
const isEmail = (value: ValueType): true | ValidationError =>
  typeof value === 'string' && validate.validateEmail(value) ? true : createValidationError('validationErrors.email')

/**
 * @param {string} value
 */
const isNumber = (value: ValueType): true | ValidationError =>
  validate.isNumeric(value) ? true : createValidationError('validationErrors.numeric')

/**
 * @param {string} value
 * @param {object} range
 */
const inRange = (value: ValueType, range: RangeType): true | ValidationError =>
  isNumber(value) &&
  typeof range.start !== 'undefined' &&
  range.start !== null &&
  typeof range.end !== 'undefined' &&
  range.end !== null &&
  !(range.start > parseInt(value as string, 10) || range.end < parseInt(value as string, 10))
    ? true
    : createValidationError('validationErrors.range', { start: range.start, end: range.end })

/**
 * @param {string} value
 */
const isInteger = (value: ValueType): true | ValidationError =>
  (typeof value === 'string' || typeof value === 'number') && /^\d+$/.test(`${value}`)
    ? true
    : createValidationError('validationErrors.integer')

/**
 * @param {string} value
 */
const isRequired = (value: ValueType): true | ValidationError =>
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
} as { [key: string]: Function }
