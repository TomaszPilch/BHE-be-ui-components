import { ElementType } from 'react'
import ActionPermissionFormField, { ActionPermissionFormFieldProps } from './ActionPermissionFormField'
import Bool, { BoolProps } from './Bool'
import Code, { CodeProps } from './Code'
import Datetime, { DatetimeProps } from './Datetime'
import GeneralWidgetComponent from '../widgets/GeneralWidgetComponent'
import Number from './Number'
import Position, { PositionProps } from './Position'
import Select, { SelectProps } from './Select'
import SingleFileUpload from './SingleFileUpload'
import TextArea from './TextArea'
import TextField, { TextFieldProps } from './TextField'

export type FieldTypeProps =
  | ActionPermissionFormFieldProps
  | BoolProps
  | CodeProps
  | DatetimeProps
  | PositionProps
  | SelectProps
  | TextFieldProps

export default {
  actionPermission: ActionPermissionFormField,
  bool: Bool,
  code: Code,
  datetime: Datetime,
  image: SingleFileUpload,
  number: Number,
  position: Position,
  select: Select,
  text: TextField,
  textArea: TextArea,
  widget: GeneralWidgetComponent,
} as { [key: string]: ElementType }
