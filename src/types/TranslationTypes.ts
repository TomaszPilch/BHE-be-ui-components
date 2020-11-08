export type TranslateFunctionType = (key: string | string[], data?: Object) => string

export type TranslationsType = { [key: string]: string | TranslationsType }
