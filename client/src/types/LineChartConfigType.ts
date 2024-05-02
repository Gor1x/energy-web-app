export type LineChartConfigType = {
    title: string,
    type: string,
    height: string,
    width: string,
    xAxis: string[],
    yAxis: string[],
    yNames: string[],
    data: DatasType[],
    chartType: string
}

export type DatasType = {
    [x: string]: number,
    date: number
}