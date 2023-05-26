import React, { useState, useRef, useEffect } from 'react'
import {init} from 'echarts'

const Chart = ({ option, config, resize }) => {
    const { height, width } =  { ...config }
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
            setChartEl(init(chart.current))
        }
    }, [option, chartEl])

    return (
        <section className="chart" style={{ height, width }}>
            <div className="chart" ref={chart}></div>
        </section>
    )
}
export default Chart;