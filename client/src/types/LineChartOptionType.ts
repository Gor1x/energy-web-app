import * as echarts from "echarts";

export type LineChartOption = {
    tooltip: {
        trigger: string,
        axisPointer: {
            lineStyle: {
                color: string
            }
        },
        backgroundColor: string,
        padding: number[],
        textStyle: {
            color: string,
        },
        extraCssText: string
    },
    xAxis: {
        type: string,
        data: number[],
        boundaryGap: boolean,
        splitLine: {
            show: boolean,
            interval: string,
            lineStyle: {
                color: [string]
            }
        },
        axisTick: {
            show: boolean
        },
        axisLine: {
            lineStyle: {
                color: string
            }
        },
        axisLabel: {
            margin: number,
            textStyle: {
                fontSize: number
            }
        }
    },
    yAxis: {
        type: string,
        splitLine: {
            lineStyle: {
                color: [string]
            }
        },
        axisTick: {
            show: boolean
        },
        axisLine: {
            lineStyle: {
                color: string
            }
        },
        axisLabel: {
            margin: number,
            textStyle: {
                fontSize: number
            }
        }
    },
    series: SeriesType[]
}

export type SeriesType = {
    name: string,
    type: string,
    smooth: boolean,
    showSymbol: boolean,
    symbol: string,
    symbolSize: number,
    data: number[],
    areaStyle: {
        normal: {
            color: echarts.graphic.LinearGradient
        }
    },
    itemStyle: {
        normal: {
            color: string
        }
    },
    lineStyle: {
        normal: {
            width: number
        }
    }
}