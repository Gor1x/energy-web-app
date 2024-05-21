import {RunCard} from "./CardsType";

export type SelectDates = { fromDate: string, toDate: string };

export type FileObject = {
    id: string
    name: string
    user_id: number
    file_path: string
    type: string
    num_rows: number
    selectColumns: string[]
    selectColumnForAlgorithm?: number
    chartType: string
    selectDates?: SelectDates
    runCard?: RunCard
    file_id: string
}