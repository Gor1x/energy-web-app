export type LineChartConfigType = {
    title: number,
    type: string,
    height: string,
    width: string,
    xAxis: string,
    yAxis: number[],
    yNames: number[],
    data: DatasType[]
}

export type DatasType = {
    [x: number]: string,
    date: number
}