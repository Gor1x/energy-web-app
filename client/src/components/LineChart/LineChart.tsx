import React from 'react'
import Chart from '../Chart'
import {lineChartOption} from './option'
import {LineChartConfigType} from "../../types/LineChartConfigType";

const LineChart = ({config, resize} : {config: LineChartConfigType, resize: boolean}) => {
    const {data} = config
    let {yAxis} = data.reduce((accum, iter) => {
        config.yAxis.forEach((lineName: string, index) => {
            let namedElement = iter[lineName];
            if (!accum.yAxis[index]) {
                accum.yAxis.push([])
            }
            accum.yAxis[index].push(namedElement)
        })

        return accum
    }, {yAxis: [] as number[][]})

    let option = lineChartOption(config.xAxis, yAxis, config)

    return (
        <div>
            {data && <Chart option={option} config={config} resize={resize}/>}
        </div>
    )
}

export default LineChart;