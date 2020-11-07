import { TranslateFunctionType } from './TranslationTypes'

export type FieldConfigValidation = {
  isRequired?: boolean
  isEmail?: boolean
  canBeEmpty?: boolean
  [key: string]: boolean | undefined
}

export type StackSettings = {
  row?: number
  column?: number
}

export type FieldConfig = {
  activeOnAdd: boolean
  associated: boolean
  className?: string
  code?: string
  column: string
  component: string
  custom: boolean
  editable: boolean
  fetchResources?: string
  module?: string
  name: string
  pattern: string
  section?: string
  sendFullData?: boolean
  stackSettings?: StackSettings
  translatedValues: boolean
  type: string
  validation?: FieldConfigValidation
}

export type FormConfig = FieldConfig[]

export interface DefaultFieldActionProps<ValueType> {
  onChange: (name: string, value: ValueType) => void
  t: TranslateFunctionType
}

export interface DefaultFieldActionProps<ValueType> {
  onBlur: (name: string, value: ValueType) => void
  t: TranslateFunctionType
}

export type DefaultFieldProps<ValueType, CustomFieldConfig = any> = {
  editable: boolean
  formFieldConfig: FieldConfig & CustomFieldConfig
  label: string
  touched?: boolean
  value: ValueType
}
