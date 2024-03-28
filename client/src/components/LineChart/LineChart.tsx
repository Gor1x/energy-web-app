import React from 'react'
import Chart from '../Chart'
import {lineChartOption} from './option'
import {LineChartConfigType} from "../../types/LineChartConfigType";

const LineChart = ({config, resize} : {config: LineChartConfigType, resize: boolean}) => {
    const {data} = config
    let i = 0;
    let {xAxis, yAxis} = data.reduce((accum, iter) => {
        accum.xAxis.push(i++)

        config.yAxis.forEach((lineName, index) => {
            if (!accum.yAxis[index]) {
                accum.yAxis.push([iter[config.yAxis[index]]])
            } else {
                accum.yAxis[index].push(iter[config.yAxis[index]])
            }
        })

        return accum
    }, {xAxis: [] as number[], yAxis: [] as number[][]})

    let option = lineChartOption(xAxis, yAxis, config)

    return (
        <div>
            {data && <Chart option={option} config={config} resize={resize}/>}
        </div>
    )
}

export default LineChart;