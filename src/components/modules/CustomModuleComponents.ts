import YesNoComponent from '../passive/YesNoComponent'
import ActualWeatherComponent from './ActualWeatherComponent'
import ShowDateTimeComponent from '../passive/ShowDateTimeComponent'
import EnumErrorShowLabel from '../passive/EnumErrorShowLabel'
import EnumChangeValue from '../passive/EnumChangeValue'
import TranslationComponent from '../passive/TranslationComponent'
import LinkToParentComponent from '../passive/LinkToParentComponent'
import ImageComponent from '../passive/ImageComponent'

export type CustomModuleComponentKeys =
  | 'ActualWeatherComponent'
  | 'YesNoComponent'
  | 'ShowDateTimeComponent'
  | 'EnumErrorShowLabel'
  | 'EnumChangeValue'
  | 'TranslationComponent'
  | 'LinkToParentComponent'
  | 'ImageComponent'

export default {
  ActualWeatherComponent,
  YesNoComponent,
  ShowDateTimeComponent,
  EnumErrorShowLabel,
  EnumChangeValue,
  TranslationComponent,
  LinkToParentComponent,
  ImageComponent,
} as { [key in CustomModuleComponentKeys]: any }
