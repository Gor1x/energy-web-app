import { graphic } from 'echarts'

let colors = ['#BF5AF2', '#FFD60A', '#2d8cf0', '#FF443A', '#FF9F0C', '#31D158']

export const LineChartOption = (xAxis, yAxis, config) => ({
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
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: trendData,
        areaStyle: {
            normal: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: colors[1]
                }, {
                    offset: 1,
                    color: 'rgba(199, 237, 250,0.2)'
                }], false)
            }
        },
        itemStyle: {
            normal: {
                color: colors[1]
            }
        },
        lineStyle: {
            normal: {
                width: 3
            }
        }
    }))
});