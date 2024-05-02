import * as echarts from 'echarts';
import {LineChartOption} from "../../types/LineChartOptionType";
import {LinearGradient} from "echarts/types/dist/shared";

let colors = ['#BF5AF2', '#FFD60A', '#2d8cf0', '#FF443A', '#FF9F0C', '#31D158']

type ColorStop = {
    offset: number;
    color: string;
};
export const lineChartOption = (xAxis: string[], yAxis: number[][], config: {
    yNames: { [p: string]: any }
    chartType: string
}): {
    yAxis: {
        axisLabel: { margin: number; textStyle: { fontSize: number } };
        axisLine: { lineStyle: { color: string } };
        splitLine: { lineStyle: { color: [string] } };
        axisTick: { show: boolean };
        type: string
    };
    xAxis: {
        axisLabel: { margin: number; textStyle: { fontSize: number } };
        data: string[];
        axisLine: { lineStyle: { color: string } };
        splitLine: { lineStyle: { color: [string] }; show: boolean; interval: string };
        axisTick: { show: boolean };
        type: string;
        boundaryGap: boolean
    };
    series: {
        symbol: string;
        areaStyle: { normal: { color: LinearGradient } };
        showSymbol: boolean;
        data: number[];
        lineStyle: { normal: { width: number } };
        symbolSize: number;
        sampling: string;
        name: any;
        itemStyle: { normal: { color: string } };
        type: string;
        smooth: boolean
    }[];
    tooltip: {
        padding: number[];
        backgroundColor: string;
        extraCssText: string;
        axisPointer: { lineStyle: { color: string } };
        trigger: string;
        textStyle: { color: string }
    };
    dataZoom: ({
        minSpan: number;
        xAxisIndex: number[];
        showDataShadow: boolean;
        start: number;
        end: number;
        type: string
    } | { minSpan: number; xAxisIndex: number[]; start: number; end: number; type: string })[]
} => {
    let colorStops = [{
        offset: 0,
        color: colors[2]
    }, {
        offset: 1,
        color: 'rgba(0,184,250,0.2)'
    }] as ColorStop[];
    return ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        xAxis: {
            type: 'category',
            data: xAxis,
            boundaryGap: false,
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        series: yAxis.map((trendData, index) => ({
            name: config.yNames[index],
            type: config.chartType,
            sampling: 'lttb',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: trendData,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, colorStops, false)
                }
            },
            itemStyle: {
                normal: {
                    color: colors[2]
                }
            },
            lineStyle: {
                normal: {
                    width: 1
                }
            }
        })),
        dataZoom: [
            {
                type: 'inside', // Enable zooming by mouse wheel inside the chart area
                xAxisIndex: [0], // Apply zooming to the x-axis
                start: 0, // Initial zoom start percentage
                end: 100, // Initial zoom end percentage
                showDataShadow: true,
                minSpan: 2
            },
            {
                type: 'slider', // Show a slider for zooming and panning
                xAxisIndex: [0], // Apply slider to the x-axis
                start: 0, // Initial slider start percentage
                end: 100, // Initial slider end percentage
                minSpan: 2
            },
        ],
    });
};