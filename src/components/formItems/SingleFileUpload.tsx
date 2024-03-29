import React, { useCallback, useEffect, useState } from 'react'
import { Label } from '@fluentui/react'
import { Dashboard } from '@uppy/react'

import { DefaultFieldProps } from '@bheui/form-logic/lib/types/FormTypes'

import Uppy from '../../services/Uppy'
import { FieldConfigBasicTypeStack } from '../../types/FormTypes'

export type SingleFileUploadFieldConfig = FieldConfigBasicTypeStack<'file' | 'image'>

export interface SingleFileUploadProps extends DefaultFieldProps<string> {
  formFieldConfig: SingleFileUploadFieldConfig
}

const FileUpload = (props: SingleFileUploadProps) => {
  const [errorText, setErrorText] = useState('')
  const { t, editable, value, formFieldConfig } = props

  if (!editable && formFieldConfig.type === 'image') {
    return (
      <div>
        <Label>{props.label}</Label>
        <img alt={value} src={value} width={250} />
      </div>
    )
  }

  const { uppy } = Uppy

  const fileAdded = useCallback(() => {
    setErrorText('')
  }, [])

  const restrictionFailed = useCallback((error) => {
    setErrorText(error.toString())
    if (uppy) {
      uppy.reset()
    }
  }, [])

  useEffect(() => {
    if (uppy) {
      uppy.on('file-added', fileAdded)
      uppy.on('restriction-failed', (_file: any, error: any) => {
        restrictionFailed(error)
      })
    }
  })

  if (!uppy) {
    return null
  }

  return (
    <div>
      <Label>{props.label}</Label>
      <Dashboard
        allowMultipleUploads={false}
        disableInformer
        height={300}
        hideUploadButton
        locale={{
          // @ts-ignore
          strings: t('uppy', { returnObjects: true }),
        }}
        proudlyDisplayPoweredByUppy={false}
        theme="dark"
        uppy={uppy}
        width={300}
      />
      {typeof value === 'string' && value.length > 0 && <img alt={value} src={value} width={250} />}
      <p className="error-message">
        <span>{errorText}</span>
      </p>
    </div>
  )
}

FileUpload.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
}

export default React.memo(FileUpload)
