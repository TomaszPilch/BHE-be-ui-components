import { ElementType } from 'react'
import { ImmutableObject } from 'seamless-immutable'

import { TranslateFunctionType } from './TranslationTypes'

export type FieldConfigValidation = {
  isRequired?: boolean
  isEmail?: boolean
  canBeEmpty?: boolean
  [key: string]: boolean | undefined
}

export type StackSettings = {
  column?: number
  row?: number
  rowChildrenGap?: number
  rowMaxHeight?: number
  rowMaxWidth?: number
  rowPadding?: number
}

export type StackTokens = {
  childrenGap?: number
  padding?: number
  maxHeight?: number
  maxWidth?: number
}

// todo split to types based od components
export type FieldConfig = {
  activeOnAdd?: boolean
  associated?: boolean
  className?: string
  code?: string
  column: string
  component: string
  custom?: boolean
  defaultValue?: any
  editable?: boolean
  fetchResources?: string
  inputProps?: Object
  module?: string
  name: string
  pattern?: string
  section?: string
  sendFullData?: boolean
  stackSettings?: StackSettings
  tokens?: StackTokens
  translated?: boolean
  translatedValues?: boolean
  type?: string
  validation?: FieldConfigValidation
  keys?: {
    from: string
  }
  parentModule?: string
}

export type FormConfig = FieldConfig[]

export type FormConfigWithTab = {
  [key: string]: FormConfig
}

export type FieldConfigWithStackRow = {
  items: FormConfig
  tokens: StackTokens
}

export interface DefaultFieldActionProps<ValueType> {
  onChange: (name: string, value: ValueType) => void
}

export type ActionOnBlur<ValueType> = (name: string, value: ValueType) => void

export type ActionOnChange<ValueType> = (name: string, value: ValueType) => void

export interface DefaultFieldActionProps<ValueType> {
  onBlur: ActionOnBlur<ValueType>
}

export interface DefaultFieldActionProps<ValueType> {
  onChange: ActionOnChange<ValueType>
  onBlur: ActionOnBlur<ValueType>
}

export type DefaultFieldProps<ValueType, CustomFieldConfig = any> = {
  editable: boolean
  formFieldConfig: FieldConfig & CustomFieldConfig
  label: string
  t: TranslateFunctionType
  touched?: boolean
  value: ValueType
}

export type CustomFormComponentType = {
  [key: string]: ElementType
}

export type ImmutableDataType = ImmutableObject<{ [key: string]: any }>
