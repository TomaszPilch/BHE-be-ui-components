import React from 'react'
import moment from 'moment'

export type ShowDateTimeComponentProps = {
  value: string | number | boolean | Object
}

const ShowDateTimeComponent = (props: ShowDateTimeComponentProps) => {
  if (typeof props.value !== 'string') {
    return null
  }

  const value = props.value ? moment(props.value).format('DD.MM.YYYY HH:mm:ss') : ''
  return <span title={value}>{value}</span>
}

export default ShowDateTimeComponent
