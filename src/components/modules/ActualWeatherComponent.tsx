import React from 'react'
import { TranslateFunctionType } from '@bheui/form-logic/lib/types/TranslationTypes'

type ActualWeatherComponentProps = {
  value: string
  t: TranslateFunctionType
}

const ActualWeatherComponent = (props: ActualWeatherComponentProps) => {
  const { t } = props
  const data = JSON.parse(props.value)
  if (data.list[0].temp) {
    return (
      <span key={props.value}>
        {`${t('modules.actualWeather.day', { temp: data.list[0].temp.day })},${t('modules.actualWeather.night', {
          temp: data.list[0].temp.night,
        })} `}
      </span>
    )
  }
  if (data.list[0].main) {
    return <span>{`${t('modules.actualWeather.temp', { temp: data.list[0].main.temp })}`}</span>
  }
  return null
}

export default ActualWeatherComponent
