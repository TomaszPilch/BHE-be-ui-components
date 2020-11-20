import { EnumChangeValueProps } from './EnumChangeValue'
import { EnumErrorShowLabelProps } from './EnumErrorShowLabel'
import { ImagePropTypes } from './ImageComponent'
import { LinkToParentComponentProps } from './LinkToParentComponent'
import { ShowDateTimeComponentProps } from './ShowDateTimeComponent'
import { TranslationComponentProps } from './TranslationComponent'
import { ValueToStringProps } from './ValueToString'
import { YesNoPropsTypes } from './YesNoComponent'

export interface PassiveComponentProps
  extends EnumChangeValueProps,
    EnumErrorShowLabelProps,
    ImagePropTypes,
    LinkToParentComponentProps,
    ShowDateTimeComponentProps,
    TranslationComponentProps,
    ValueToStringProps,
    YesNoPropsTypes {}
