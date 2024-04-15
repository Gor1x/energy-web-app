export type FileObject = {
    id: string
    name: string
    user_id: number
    file_path: string
    type: string
    num_rows: number
    selectColumn: string
    selectDates: {fromDate: string, toDate: string}
    file_id: string
}