import React from 'react';
import Chart from '../Chart';
import { lineChartOption } from './option';
import { LineChartConfigType } from "../../types/LineChartConfigType";

const LineChart = ({ config, resize }: { config: LineChartConfigType, resize: boolean }) => {
    const { data } = config;

    if (!Array.isArray(data)) {
        console.error('Data should be an array');
        return null;
    }

    const yAxis: number[][] = config.yNames.map((lineName: string) => {
        // @ts-ignore
        return data.map((iter: { [key: string]: number }) => {
            const value = iter[lineName];
            return value;
        });
    });

    const option = lineChartOption(config.xAxis, yAxis, config);

    return (
        <div>
            {data.length > 0 && <Chart option={option} config={config} resize={resize} />}
        </div>
    );
}

export default LineChart;
