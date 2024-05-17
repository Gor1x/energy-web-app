import * as echarts from 'echarts';
import { LineChartOption } from "../../types/LineChartOptionType";
import { LinearGradient } from "echarts/types/dist/shared";

let colors = ['#BF5AF2', '#FFD60A', '#2d8cf0', '#FF443A', '#FF9F0C', '#31D158'];

type ColorStop = {
    offset: number;
    color: string;
};

export const lineChartOption = (
    xAxis: string[],
    yAxis: number[][],
    config: { yNames: string[]; chartType: string }
): {
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
        name: string;
        itemStyle: { normal: { color: string } };
        type: string;
        smooth: boolean
    }[];
    legend: { data: string[]; textStyle: { color: string } };
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
    return {
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
        series: yAxis.map((trendData, index) => {
            let colorStops: ColorStop[] = [
                {
                    offset: 0,
                    color: colors[index % colors.length]
                }
            ];
            return {
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
                        color: colors[index % colors.length]
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            };
        }),
        legend: {
            data: config.yNames,
            textStyle: {
                color: '#333'
            }
        },
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100,
                showDataShadow: true,
                minSpan: 2
            },
            {
                type: 'slider',
                xAxisIndex: [0],
                start: 0,
                end: 100,
                minSpan: 2
            },
        ],
    };
};
