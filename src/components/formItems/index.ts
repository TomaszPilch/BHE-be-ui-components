import { ElementType } from 'react'
import dynamic from 'next/dynamic'

import ActionPermissionFormField, {
  ActionPermissionFormFieldFormConfig,
  ActionPermissionFormFieldProps,
} from './ActionPermissionFormField'
import Bool, { BoolFormFieldFormConfig, BoolProps } from './Bool'
import Datetime, { DatetimeFormFieldConfig, DatetimeProps } from './Datetime'
import Number, { NumberFieldProps } from './Number'
import Position, { PositionFormFieldConfig, PositionProps } from './Position'
import Select, { SelectProps } from './Select'
import { SingleFileUploadFieldConfig, SingleFileUploadProps } from './SingleFileUpload'
import TextArea, { TextAreaProps } from './TextArea'
import TextField, { TextFieldFormFieldConfig, TextFieldProps } from './TextField'
import { SelectWithResourcesFormFieldConfig } from './SelectWithResources'
import { SelectWithValuesFormFieldConfig } from './SelectWithValues'
import Date, { DateFormFieldConfig, DateProps } from './Date'
import { CodeFormFieldConfig, CodeProps } from './Code'

const SingleFileUpload = dynamic(() => import('./SingleFileUpload'))
const GeneralWidgetComponent = dynamic(() => import('../widgets/GeneralWidgetComponent'))
const Code = dynamic(() => import('./Code'))

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
  | ActionPermissionFormFieldFormConfig
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
