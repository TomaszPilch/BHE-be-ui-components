// @flow
import React, { useState, useEffect } from 'react'

import validationRules from './validationRules'
import { getValueForPath } from './utilities'

// types
import type { FormConfig, FieldConfig } from '../types/FormTypes'

const validateField = (fieldConfig: FieldConfig, value: any): Object[] => {
  if (fieldConfig.validation) {
    const validationKeys = Object.keys(fieldConfig.validation)
    let isAndCanBeEmpty = false
    if (fieldConfig.validation.canBeEmpty) {
      isAndCanBeEmpty = validationRules.canBeEmpty(value)
    }
    return validationKeys.reduce((errors, validationRule) => {
      const validationConfigValue = fieldConfig.validation[validationRule]
      if (!isAndCanBeEmpty && validationRule !== 'canBeEmpty') {
        let result = false
        if (validationRules[validationRule]) {
          result = validationRules[validationRule](value, validationConfigValue, value)
        } else {
          result = 'Not a valid rule!'
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

export const validate = (formConfig: FormConfig, data: Object) => {
  let isValid = true
  const errors = formConfig.reduce((err, field) => {
    const result = validateField(field, getValueForPath([field.column], data))
    if (result.length > 0) {
      isValid = false
      err[field.column] = result
    }
    return err
  }, {})
  return [isValid, errors]
}

export const useFieldValidation = (fieldConfig: FieldConfig, value: any, pushTouched: boolean) => {
  const [touched, setTouched] = useState(false)
  const [validationError, setValidationError] = useState([])

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
