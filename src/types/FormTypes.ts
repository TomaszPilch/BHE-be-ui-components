import { FieldConfigBasicType } from '@bheui/form-logic/lib/types/FormTypes'

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

export interface FieldConfigBasicTypeStack<Type extends string, InputProps = Object>
  extends FieldConfigBasicType<Type, InputProps> {
  stackSettings?: StackSettings
  tokens?: StackTokens
  defaultValue?: any
}

export type FormConfig = FieldConfigBasicTypeStack<string>[]

export type FormConfigWithTab = {
  [key: string]: FormConfig
}

export type FieldConfigWithStackRow = {
  items: FieldConfigBasicTypeStack<string>[]
  tokens: StackTokens
}
