import {FileObject} from "./FileObject";

export type ChartCard =  {
    type: string
    props: {
        dataset: FileObject
        column: string
        chartType: string
    }
}

export type RunCard = {
    type: string
    props: {
        title: string
        algorithm_id: string
        dataset_id: string
    }
}

export type TableCard =  {
    type: string
    props: {
         sizePerPage: number,
         totalSize: number,
         url: string
     }
}

export type CodeCard = {
    type: string
    props: {
            file: FileObject
    }
}