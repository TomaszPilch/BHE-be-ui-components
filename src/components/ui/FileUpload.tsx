import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Label, PrimaryButton } from '@fluentui/react'
import { random } from 'devx-js-utilities'

const FileUpload = (props) => {
  const { accept, id, t } = props

  const onDrop = useCallback((acceptedFiles) => {
    // TODO handle multiple files
    console.log(acceptedFiles)
    if (acceptedFiles.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = (event) => {
        console.log(event)
        // props.onBlur({
        //   ...acceptedFiles[0],
        //   base64: event.target.result,
        //   fileName: `file${random.guid()}`,
        // })
        // props.onChange({
        //   ...acceptedFiles[0],
        //   base64: event.target.result,
        //   fileName: `file${random.guid()}`,
        // })
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      <Label>{props.label}</Label>
      <div {...getRootProps({ className: 'dropzone' })} className="FileUpload-label">
        <input {...getInputProps()} className="FileUpload-input" id={id} type="file" />
        <span className="text-muted">{isDragActive ? t('fileUpload.dropHere') : t('fileUpload.uploadFile')}</span>
        <PrimaryButton onClick={() => {}} text={t('fileUpload.pickFile')} />
      </div>
    </div>
  )
}

FileUpload.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  accept: '*/*',
}

export default React.memo(FileUpload)
