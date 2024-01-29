import {Box, IconButton} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AddchartIcon from "@mui/icons-material/Addchart";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import OpenChartModal from '../modals/OpenChartModal'
import RunOnAlgorithmModal from '../modals/RunOnAlgorithmModal';
import * as React from 'react';
import {FileObject} from "../../../types/FileObject";
import {ChartCard} from "../../../types/CardsType";
import {File} from "node:buffer";
import ChartTabContent from "./ChartTabContent";
import useTabs from "../hooks/useTabs";

type DatasetTabHeaderProps = {
    file: FileObject;
    openTableCardHandler: () => void;
    modalOpenDispatch: (modal: any) => void;
    modalCloseDispatch: () => void;
    openRunCardHandler: (algorithm: FileObject) => void;
}

export function DatasetTabHeader(datasetTabHeaderProps: DatasetTabHeaderProps) {
    const {tabs, openTab, closeTab, closeTabByFile, activeTab, selectTab} = useTabs();
    const {
        file,
        modalCloseDispatch,
        openRunCardHandler,
        openTableCardHandler,
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
                    const chartFile = file
                    chartFile.id = file.id
                    chartFile.type = "chart"
                    chartFile.selectColumn = column
                    openTab(file)
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