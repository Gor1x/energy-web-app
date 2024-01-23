import {Box, IconButton} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AddchartIcon from "@mui/icons-material/Addchart";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenChartModal from '../../dashboard/modals/OpenChartModal'
import RunOnAlgorithmModal from '../modals/RunOnAlgorithmModal';
import * as React from 'react';

type DatasetTabHeaderProps = {
    file: string;
    openTableCardHandler: () => void;
    openChartCardHandler: (card: number) => void;
    modalOpenDispatch: (modal: any) => void;
    modalCloseDispatch: () => void;
    openRunCardHandler: (algorithm: { id: string; }) => void;
}

export function DatasetTabHeader(datasetTabHeaderProps: DatasetTabHeaderProps) {
    const {
        file,
        modalCloseDispatch,
        openRunCardHandler,
        openTableCardHandler,
        openChartCardHandler,
        modalOpenDispatch,
    } = datasetTabHeaderProps
    return <Box height='30px' width='100%'>
        <IconButton onClick={openTableCardHandler}>
            <TableRowsIcon/>
        </IconButton>
        <IconButton onClick={() => modalOpenDispatch(
            <OpenChartModal
                dataset={file}
                onSelect={(column: number) => {
                    modalCloseDispatch()
                    openChartCardHandler(column)
                }}/>)}>
            <AddchartIcon/>
        </IconButton>
        <IconButton onClick={() => modalOpenDispatch(
            <RunOnAlgorithmModal onSelect={(algorithm: { id: string; }) => {
                modalCloseDispatch()
                openRunCardHandler(algorithm)
            }}/>)}>
            <PlayArrowIcon/>
        </IconButton>
    </Box>
}