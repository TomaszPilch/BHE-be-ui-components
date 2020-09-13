// @flow

export type FieldConfigValidation = {
  isRequired?: boolean,
  isEmail?: boolean,
}

export type StackSettings = {
  row?: number,
  column?: number,
}

export type FieldConfig = {
  activeOnAdd: boolean,
  associated: boolean,
  column: string,
  component: string,
  custom: boolean,
  editable: boolean,
  fetchResources?: string,
  module?: string,
  name: string,
  pattern: string,
  section?: string,
  sendFullData?: boolean,
  stackSettings?: StackSettings,
  translatedValues: boolean,
  type: string,
  validation?: FieldConfigValidation,
  [string]: any,
}

export type FormConfig = FieldConfig[]
