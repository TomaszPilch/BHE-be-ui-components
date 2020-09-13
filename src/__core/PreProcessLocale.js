const preProcessLocale = (translations) => {
  const defaultForms = translations.forms
  translations.modules = Object.keys(translations.modules).reduce((acc, key) => {
    acc[key] = {
      ...translations.modules[key],
      form: {
        ...defaultForms,
        ...translations.modules[key].form,
      },
    }
    return acc
  }, {})
  return translations
}

export default preProcessLocale
