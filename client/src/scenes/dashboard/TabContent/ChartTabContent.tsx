import React from 'react'
import {Box} from "@mui/material";
import {ChartCard} from "../../../types/CardsType";
import {FileObject} from "../../../types/FileObject";
import {DatasetChart} from "./DatasetChart";

const ChartTabContent = (props: { file: FileObject }) => {
    const {file} = props;
    let chartFile: FileObject = {
        id: file.file_id,
        type: "chart",
        name: file.selectColumns[0] + " from " + file.name,
        user_id: file.user_id,
        file_path: file.file_path,
        num_rows: file.num_rows,
        selectColumns: file.selectColumns,
        chartType: file.chartType,
        selectDates: file.selectDates,
        file_id: file.file_id,
        runCard: file.runCard,
    }
    const chartCard: ChartCard = {
        type: "ChartCard",
        props: {
            dataset: chartFile,
            columns: chartFile.selectColumns,
            chartType: file.chartType
        }
    }
    return (
        <Box
            sx={{overflowY: 'scroll' }}
            height="540px"
            width="100%"
            p='20px'
            display="grid"
            gridAutoRows="80px"
            gap="20px">
            <DatasetChart {...chartCard} />
        </Box>
    );
}
export default ChartTabContent;