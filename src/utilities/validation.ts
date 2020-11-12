import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { pathOr } from 'ramda'

import validationRules, { ValidationError, ValidationResult } from './validationRules'

// types
import { FieldConfigBasicType, FieldConfigValidation, FormConfig } from '../types/FormTypes'

const validateField = (fieldConfig: FieldConfigBasicType, value: any): ValidationResult[] => {
  if (typeof fieldConfig.validation !== 'undefined') {
    const validationObject: FieldConfigValidation = fieldConfig.validation
    const validationKeys: string[] = Object.keys(fieldConfig.validation)
    let isAndCanBeEmpty = false
    if (fieldConfig.validation.canBeEmpty) {
      isAndCanBeEmpty = validationRules.canBeEmpty(value)
    }
    return validationKeys.reduce<ValidationResult[]>((errors, validationRule) => {
      const validationConfigValue = validationObject[validationRule]
      if (!isAndCanBeEmpty && validationRule !== 'canBeEmpty' && typeof validationConfigValue !== 'undefined') {
        let result: boolean | ValidationError = false
        if (typeof validationRules[validationRule] !== 'undefined') {
          result = validationRules[validationRule](value, validationConfigValue, value)
        }
        if (result !== true) {
          errors.push({ rule: validationRule, result })
        }
      }
      return errors
    }, [])
  }
  return []
}

export const validate = (formConfig: FormConfig, data: Object): [boolean, { [key: string]: ValidationResult[] }] => {
  let isValid = true
  const errors = formConfig.reduce<{ [key: string]: ValidationResult[] }>((err, field) => {
    const result = validateField(field, pathOr('', [field.column], data))
    if (result.length > 0) {
      isValid = false
      err[field.column] = result
    }
    return err
  }, {})
  return [isValid, errors]
}

export const useFieldValidation = (
  fieldConfig: FieldConfigBasicType,
  value: any,
  pushTouched?: boolean,
): [
  boolean,
  ValidationResult[],
  Dispatch<SetStateAction<ValidationResult[]>>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
] => {
  const [touched, setTouched] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<ValidationResult[]>([])

  useEffect(() => {
    const [, errors] = validate([fieldConfig], { [fieldConfig.column]: value })
    const newErrors = errors[fieldConfig.column] || []
    const newErrorsRules = newErrors.map((error) => error.rule)
    const actualErrorsRules = validationError.map((error) => error.rule)
    const allKeys = [...newErrorsRules, ...actualErrorsRules]
    if (newErrorsRules.length !== actualErrorsRules.length || allKeys.length > actualErrorsRules.length) {
      setValidationError(newErrors)
    }
    if (pushTouched && !touched) {
      setTouched(pushTouched)
    }
  }, [value, pushTouched])

  return [Object.keys(validationError).length === 0, validationError, setValidationError, touched, setTouched]
}
