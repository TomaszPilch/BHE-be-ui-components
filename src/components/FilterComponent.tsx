import React from 'react'
import classNames from 'classnames'
import { pathOr } from 'ramda'

// components
import { TextField as FabricTextField } from '@fluentui/react'
import SelectCore from './formItems/SelectCore'
import { FilterType, ListSettingFilterOptionType } from '../types/ViewTypes'
import { TranslateFunctionType } from '../types/TranslationTypes'
import { SelectItem } from '../utilities/selects'

const VALID_TYPES = ['textBox', 'selectBox']

type FilterComponentProps = {
  filterValues: FilterType
  onChangeFilterValue: Function
  options: ListSettingFilterOptionType
  t: TranslateFunctionType
}

export default class FilterComponent extends React.PureComponent<FilterComponentProps> {
  getOptions = (): SelectItem[] => [
    {
      id: '_empty_',
      value: null,
      label: '',
    },
    ...this.props.options.options.map((item) => ({
      id: item,
      value: item,
      label: this.props.options.translate
        ? this.props.t(`filter._selectBox.${this.props.options.key}.${item}`)
        : `${item}`,
    })),
  ]

  handleOnTextChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { options } = this.props
    this.props.onChangeFilterValue(options.key, newValue)
  }

  handleOnBlurChange = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { options } = this.props
    this.props.onChangeFilterValue(options.key, event.target.value, true)
  }

  handleOnSelectChange = (_column: string, value: string | number | null) => {
    const { options } = this.props
    this.props.onChangeFilterValue(options.key, value, true)
  }

  render() {
    const { options, filterValues, t } = this.props

    if (!options.type || VALID_TYPES.indexOf(options.type) === -1) {
      return null
    }

    const classes: { [key: string]: boolean } = {
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
              value={pathOr('', [options.key], filterValues)}
            />
          </div>
        )
      case 'selectBox':
        classes['filter-component__selectBox'] = true
        return (
          <div className={classNames(classes)}>
            <SelectCore
              formFieldConfig={{
                type: '',
                name: options.key,
                column: '',
              }}
              label={t(`filter.${options.key}`)}
              onBlur={this.handleOnSelectChange}
              options={this.getOptions()}
              t={t}
              value={pathOr('', [options.key], filterValues)}
            />
          </div>
        )
      default:
        return null
    }
  }
}
