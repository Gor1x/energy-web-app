import React, { useState, useEffect, useRef } from 'react'
import {init} from 'echarts'

const EChart = ({ option, resize }) => {

    let chart = useRef(null)
    let [chartEl, setChartEl] = useState(chart)

    useEffect(() => {
        if (resize) {
            chartEl.resize()
        }
        if (!chartEl.current) {
            chartEl.setOption(option)
        }
        else {
            // console.log(resizeChart)
            setChartEl(init(chart.current))
        }
    }, [option, chartEl, resize])

    return (
        <div className="chart" ref={chart}></div>
    )
}

export default EChart;