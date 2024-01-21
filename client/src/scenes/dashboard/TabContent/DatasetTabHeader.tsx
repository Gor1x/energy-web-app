import {Box, IconButton} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AddchartIcon from "@mui/icons-material/Addchart";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenChartModal from '../modals/OpenChartModal'
import RunOnAlgorithmModal from '../modals/RunOnAlgorithmModal';
import * as React from 'react';
import {FileObject} from "../../../types/FileObject";
import {ChartCard} from "../../../types/CardsType";

type DatasetTabHeaderProps = {
    file: FileObject;
    openTableCardHandler: () => void;
    openChartCardHandler: (card: number) => void;
    modalOpenDispatch: (modal: any) => void;
    modalCloseDispatch: () => void;
    openRunCardHandler: (algorithm: { id: number; }) => void;
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
            <RunOnAlgorithmModal onSelect={(algorithm: { id: number; }) => {
                modalCloseDispatch()
                openRunCardHandler(algorithm)
            }}/>)}>
            <PlayArrowIcon/>
        </IconButton>
    </Box>
}