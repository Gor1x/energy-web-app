
export type SelectDates = { fromDate: string, toDate: string };

export type FileObject = {
    id: string
    name: string
    user_id: number
    file_path: string
    type: string
    num_rows: number
    selectColumns: string[]
    chartType: string
    selectDates?: SelectDates
    file_id: string
}