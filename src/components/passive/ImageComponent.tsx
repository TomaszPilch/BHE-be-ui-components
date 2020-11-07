import React from 'react'

// types
type ImagePropTypes = {
  value: string
}

const ImageComponent = (props: ImagePropTypes) =>
  props.value ? <img alt={props.value} className="img-thumbnail img-table" src={`/images/${props.value}`} /> : <div />

export default ImageComponent
