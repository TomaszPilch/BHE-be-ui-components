import { ElementType } from 'react'
import ActionPermissionFormField, { ActionPermissionFormFieldProps } from './ActionPermissionFormField'
import Bool, { BoolFormFieldFormConfig, BoolProps } from './Bool'
import Code, { CodeFormFieldConfig, CodeProps } from './Code'
import Datetime, { DatetimeFormFieldConfig, DatetimeProps } from './Datetime'
import GeneralWidgetComponent from '../widgets/GeneralWidgetComponent'
import Number, { NumberFieldProps } from './Number'
import Position, { PositionFormFieldConfig, PositionProps } from './Position'
import Select, { SelectProps } from './Select'
import SingleFileUpload, { SingleFileUploadFieldConfig, SingleFileUploadProps } from './SingleFileUpload'
import TextArea, { TextAreaProps } from './TextArea'
import TextField, { TextFieldFormFieldConfig, TextFieldProps } from './TextField'
import { SelectWithResourcesFormFieldConfig } from './SelectWithResources'
import { SelectWithValuesFormFieldConfig } from './SelectWithValues'
import Date, { DateFormFieldConfig, DateProps } from './Date'

export type FieldTypeProps =
  | ActionPermissionFormFieldProps
  | BoolProps
  | CodeProps
  | DatetimeProps
  | PositionProps
  | SelectProps
  | TextFieldProps<'text'>
  | NumberFieldProps
  | TextAreaProps
  | DateProps
  | SingleFileUploadProps

export type FieldFormConfig =
  | ActionPermissionFormFieldProps
  | BoolFormFieldFormConfig
  | CodeFormFieldConfig
  | DatetimeFormFieldConfig
  | PositionFormFieldConfig
  | SelectWithResourcesFormFieldConfig
  | SelectWithValuesFormFieldConfig
  | TextFieldFormFieldConfig<'text'>
  | TextFieldFormFieldConfig<'number'>
  | TextFieldFormFieldConfig<'textArea'>
  | DateFormFieldConfig
  | SingleFileUploadFieldConfig

export type CustomFormConfig = FieldFormConfig[]

export default {
  actionPermission: ActionPermissionFormField,
  bool: Bool,
  code: Code,
  date: Date,
  datetime: Datetime,
  file: SingleFileUpload,
  image: SingleFileUpload,
  number: Number,
  position: Position,
  select: Select,
  text: TextField,
  textArea: TextArea,
  widget: GeneralWidgetComponent,
} as { [key: string]: ElementType }
