import React from 'react'
import Chart from '../Chart'
import { LineChartOption } from './option'

const LineChart = ({ config, resize }) => {
    const { data } = config

    let { xAxis, yAxis } = data.reduce((accum, iter) => {
        accum.xAxis.push(iter[config.xAxis])
        config.yAxis.forEach((lineName, index) => {
            if (!accum.yAxis[index]) {
                accum.yAxis.push([iter[config.yAxis[index]]])
            } else accum.yAxis[index].push(iter[config.yAxis[index]])
        })
        return accum
    }, { xAxis: [], yAxis: [] })

    let option = LineChartOption(xAxis, yAxis, config)

    return (
        <div>
           {data && <Chart option={option} config={config} resize={resize}/>}
        </div>
    )
}

export default LineChart;