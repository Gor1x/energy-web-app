export type LineChartConfigType = {
    title: string,
    type: string,
    height: string,
    width: string,
    xAxis: number,
    yAxis: string[],
    yNames: string[],
    data: DatasType[]
}

export type DatasType = {
    [x: string]: number,
    date: number
}