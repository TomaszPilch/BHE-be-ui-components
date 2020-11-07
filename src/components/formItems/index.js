import ActionPermissionFormField from './ActionPermissionFormField'
import Bool from './Bool'
import Code from './Code'
import Datetime from './Datetime'
import GeneralWidgetComponent from '../widgets/GeneralWidgetComponent'
import Number from './Number'
import Date from './Date'
import Position from './Position'
import Select from './Select'
import SingleFileUpload from './SingleFileUpload'
import TextArea from './TextArea'
import TextField from './TextField'

export default {
  actionPermission: ActionPermissionFormField,
  bool: Bool,
  code: Code,
  datetime: Datetime,
  date: Date,
  image: SingleFileUpload,
  number: Number,
  position: Position,
  select: Select,
  text: TextField,
  textArea: TextArea,
  widget: GeneralWidgetComponent,
}
