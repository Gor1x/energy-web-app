import {FileObject} from "./FileObject";

export type ChartCard =  {
    type: string
    props: {
        dataset: FileObject
        column: number
    }
}

export type RunCard = {
    type: string
    props: {
        title: string
        algorithm_id: number
        dataset_id: number
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