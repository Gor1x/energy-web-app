import {Box, IconButton} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AddchartIcon from "@mui/icons-material/Addchart";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenChartModal from '../modals/OpenChartModal'
import RunOnAlgorithmModal from '../modals/RunOnAlgorithmModal';
import * as React from 'react';
import {FileObject} from "../../../types/FileObject";

type DatasetTabHeaderProps = {
    file: FileObject;
    openTableCardHandler: () => void;
    openSelectChartTab: (file: FileObject) => void
    modalOpenDispatch: (modal: any) => void;
    modalCloseDispatch: () => void;
    openRunCardHandler: (algorithm: FileObject) => void;
}

export function DatasetTabHeader(datasetTabHeaderProps: DatasetTabHeaderProps) {
   const {
        file,
        modalCloseDispatch,
        openRunCardHandler,
        openTableCardHandler,
        openSelectChartTab,
        modalOpenDispatch,
    } = datasetTabHeaderProps
    return <Box height='30px' width='100%'>
        <IconButton onClick={openTableCardHandler}>
            <TableRowsIcon/>
        </IconButton>
        <IconButton onClick={() => modalOpenDispatch(
            <OpenChartModal
                dataset={file}
                onSelect={(column: string, selectDates: {fromDate: string, toDate: string}) => {
                    modalCloseDispatch()
                    const chartFile: FileObject = {
                        id: file.id + column,
                        type: "chart",
                        name: column.toString() + " from " + file.name,
                        user_id: file.user_id,
                        file_path: file.file_path,
                        num_rows: file.num_rows,
                        selectColumn: column.toString(),
                        selectDates: selectDates,
                        file_id: file.id
                    }
                    openSelectChartTab(chartFile)
                }}/>)}>
            <AddchartIcon/>
        </IconButton>
        <IconButton onClick={() => modalOpenDispatch(
            <RunOnAlgorithmModal onSelect={(algorithm: FileObject) => {
                modalCloseDispatch()
                openRunCardHandler(algorithm)
            }}/>)}>
            <PlayArrowIcon/>
        </IconButton>
    </Box>
}