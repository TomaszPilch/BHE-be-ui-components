export type TranslateFunctionType = (key: string | string[], data?: Object) => string

export type TranslationsType = {
  modules: TranslationsType
  form: TranslationsType
  [key: string]: string | TranslationsType
}
