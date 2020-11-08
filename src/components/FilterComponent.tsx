import React from 'react'
import classNames from 'classnames'

// components
import { TextField as FabricTextField } from '@fluentui/react'
import SelectCore from './formItems/SelectCore'

const VALID_TYPES = ['textBox', 'selectBox']

type FilterComponentProps = {
  filterValues: Object
  onChangeFilterValue: Function
  options: Object
}

export default class FilterComponent extends React.Component<FilterComponentProps> {
  getOptions = () => [
    {
      id: '_empty_',
      value: null,
    },
    ...this.props.options.options.map((item) => ({
      id: item,
      value: item,
      label: this.props.options.translate
        ? this.props.t(`filter._selectBox.${this.props.options.key}.${item}`)
        : `${item}`,
    })),
  ]

  handleOnTextChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { options } = this.props
    this.props.onChangeFilterValue(options.key, event.target.value)
  }

  handleOnBlurChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { options } = this.props
    this.props.onChangeFilterValue(options.key, event.target.value, true)
  }

  handleOnSelectChange = (value: string) => {
    const { options } = this.props
    this.props.onChangeFilterValue(options.key, value, true)
  }

  render() {
    const { options, filterValues, t } = this.props

    if (!options.type || VALID_TYPES.indexOf(options.type) === -1) {
      return null
    }

    const classes = {
      'filter-component': true,
    }

    switch (options.type) {
      case 'textBox':
        classes['filter-component__textBox'] = true
        classes[`filter-in-${Array.isArray(options.in) ? options.in.length : 1}`] = true
        return (
          <div className={classNames(classes)}>
            <FabricTextField
              label={t(`filter.${options.key}`)}
              name={options.key}
              onBlur={this.handleOnBlurChange}
              onChange={this.handleOnTextChange}
              placeholder={t(`filter.${options.key}`)}
              value={filterValues.getIn([options.key], '')}
            />
          </div>
        )
      case 'selectBox':
        classes['filter-component__selectBox'] = true
        return (
          <div className={classNames(classes)}>
            <SelectCore
              formFieldConfig={{
                name: options.key,
              }}
              label={t(`filter.${options.key}`)}
              onBlur={this.handleOnSelectChange}
              options={this.getOptions()}
              t={t}
              value={filterValues.getIn([options.key], '')}
            />
          </div>
        )
      default:
        return null
    }
  }
}
