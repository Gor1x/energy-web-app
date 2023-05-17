import React, { useState } from 'react'

const Chart = ({ children, config, resize }) => {

    const { height, width } =  { ...config }

    return (
        <section className="chart" style={{ height, width }}>
            { children }
        </section>
    )
}
export default Chart;