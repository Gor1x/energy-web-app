import {useState} from 'react'
import {Box, IconButton, useTheme} from "@mui/material";
import Card from '../../../components/Card';
import {ChartCard, CodeCard, RunCard, TableCard} from "../../../types/CardsType";
import {FileObject} from "../../../types/FileObject";
import React from 'react';
import {DatasetChart} from "./DatasetChart";
import useTabs from "../hooks/useTabs";

const ChartTabContent = (props: { file: FileObject }) => {
    const {file} = props;
    let chartFile: FileObject = {
                        id: file.file_id,
                        type: "chart",
                        name: file.selectColumn + " from " + file.name,
                        user_id: file.user_id,
                        file_path: file.file_path,
                        num_rows: file.num_rows,
                        selectColumn: file.selectColumn,
                        file_id: file.file_id
                    }
    const chartCard: ChartCard = {
        type: "ChartCard",
        props: {
            dataset: chartFile,
            column: chartFile.selectColumn
        }
    }
    return (
            <Box
                sx={{overflowY: 'scroll'}}
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