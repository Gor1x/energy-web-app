export type LineChartConfigType = {
    title: string,
    type: string,
    height: string,
    width: string,
    xAxis: string[],
    yAxis: string[],
    yNames: string[],
    data: DatasType[]
}

export type DatasType = {
    [x: string]: number,
    date: number
}