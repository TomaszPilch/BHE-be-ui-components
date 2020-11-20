import React from 'react'

// types
export type ImagePropTypes = {
  value: string | number | boolean | Object
}

const ImageComponent = (props: ImagePropTypes) =>
  props.value ? (
    <img alt={`${props.value}`} className="img-thumbnail img-table" src={`/images/${props.value}`} />
  ) : (
    <div />
  )

export default ImageComponent
