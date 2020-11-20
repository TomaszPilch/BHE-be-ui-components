// @flow
import Uppy, { Locale } from '@uppy/core'
import ReduxStoreUppy from '@uppy/store-redux'
import { Store as Redux } from 'redux'

class UppyInstance {
  uppy: null | Uppy.Uppy = null

  create = (store: Redux<object>, locale: Locale) => {
    this.uppy = Uppy({
      id: `common${Math.random()}`,
      store: ReduxStoreUppy({
        id: `common`,
        store,
      }),
      restrictions: {
        maxFileSize: 1049000,
        maxNumberOfFiles: 1,
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'],
      },
      autoProceed: true,
      locale,
    })
  }
}

const uppy = new UppyInstance()

export default uppy
