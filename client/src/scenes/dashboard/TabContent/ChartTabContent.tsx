import {useState} from 'react'
import {Box, IconButton, useTheme} from "@mui/material";
import Card from '../../../components/Card';
import {useStoreon} from 'storeon/react';
import {ChartCard, CodeCard, RunCard, TableCard} from "../../../types/CardsType";
import {FileObject} from "../../../types/FileObject";
import React from 'react';
import {DatasetChart} from "./DatasetChart";

const ChartTabContent = (props: { file: FileObject }) => {
    const {file} = props;
    const chartCard: ChartCard = {
        type: "ChartCard",
        props: {
            dataset: file,
            column: '0' //TODO
        }
    }
    const [items, setItems] = useState([chartCard])
    const {dispatch} = useStoreon('modal')
     const openChartCardHandler = () => {
        if (!items.find((item) => JSON.stringify(item) === JSON.stringify(chartCard))) {
            setItems(() => {
                let updated = Object.assign([], items);
                updated.splice(0, 0, chartCard)
                return updated
            })
        } else {
            alert("Уже открыто")
        }
    }
    const closeCardHandler = (i: number) => {
        setItems(() => {
            let updated = Object.assign([], items);
            updated.splice(i, 1)
            return updated
        })
    };

    return (
        <Box height='100%'>
            {/* GRID & CHARTS */}
            <Box
                sx={{overflowY: 'scroll'}}
                height="calc(100% - 40px)"
                width="100%"
                p='20px'
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="80px"
                gap="20px">
                {items.map((item, i) => {
                    return (<Card key={`card}`} rows={'4'} columns={'6'} onClose={() => closeCardHandler(i)}>
                        <DatasetChart {...item} />
                    </Card>)
                })}
            </Box>
        </Box>
    );
}
/* const openChartCardHandler = (column: number) => {
        const chartCard: ChartCard = {
            type: "ChartCard",
            props: {
                dataset: file,
                column: column.toString()
            }
        };
        if (!items.find((item) => JSON.stringify(item) === JSON.stringify(chartCard))) {
            setItems([...items, chartCard]);
        } else {
            alert("Уже открыто")
        }
    }
*/
export default ChartTabContent;