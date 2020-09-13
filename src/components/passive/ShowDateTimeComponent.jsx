// @flow
import React from 'react'
import moment from 'moment'

type ShowDateTimeComponentProps = {
  value: string | number | boolean,
}

const ShowDateTimeComponent = (props: ShowDateTimeComponentProps) => {
  const value = props.value ? moment(props.value).format('DD.MM.YYYY HH:mm:ss') : ''
  return <span title={value}>{value}</span>
}

export default ShowDateTimeComponent
