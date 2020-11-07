import React from 'react'
import { CommandButton } from '@fluentui/react'

type EnumChangeValueProps = {
  actionOnClick: (keyObject: { [key: string]: string }, item: any) => void
  column: { key: string }
  columnValues: string[]
  item: any
  value: string
}

const EnumChangeValue = (props: EnumChangeValueProps) => {
  const { value, columnValues } = props

  const handleClick = (key: string) => {
    props.actionOnClick(
      {
        [props.column.key]: key,
      },
      props.item,
    )
  }

  const colorFromValue = (colorValue: string) => {
    switch (colorValue) {
      case 'new':
        return 'error'
      case 'resolving':
        return 'warning'
      case 'resolved':
        return 'default'
      case 'toDelete':
        return 'default'
      case 'deleted':
        return 'default'
      default:
        return 'default'
    }
  }

  const getColor = (colorValue: string) => colorFromValue(colorValue)

  return (
    <span>
      <CommandButton
        className={`enum-change-value--${getColor(value)}`}
        menuProps={{
          items: [
            ...columnValues.map((columnValue) => ({
              key: columnValue,
              text: columnValue,
              onClick: () => {
                handleClick(columnValue)
              },
            })),
          ],
        }}
        text={value}
      />
    </span>
  )
}

EnumChangeValue.defaultProps = {
  actionOnClick: () => {},
  item: {},
  columnValues: [],
}

export default EnumChangeValue
