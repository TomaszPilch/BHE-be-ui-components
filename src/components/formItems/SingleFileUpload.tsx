import React from 'react'
import FileUpload from '../ui/FileUpload'

class SingleFileUpload extends React.PureComponent {
  render() {
    return <FileUpload {...this.props} />
  }
}

export default SingleFileUpload
