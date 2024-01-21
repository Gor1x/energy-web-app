import {useCallback, useEffect, useState} from "react";
import {authFetch} from "../../../auth";
import {Box} from "@mui/material";
import LineChart from "../../../components/LineChart/LineChart";
import * as React from 'react';
import {ChartCard} from "../../../types/CardsType";

export function DatasetChart(datasetChartProps: ChartCard) {
    const {dataset, column} = datasetChartProps.props
    const [resize, setResize] = useState(false)
    const [timer, setTimer] = useState(0)
    const [values, setValues] = useState([])

    const triggerResize = useCallback(() => {
        if (timer) {
            window.cancelAnimationFrame(timer);
        }
        setTimer(window.requestAnimationFrame(function () {
            setResize(true)
            setTimeout(() => {
                setResize(false)
            }, 0)
        }));

    }, [setResize, timer])

    useEffect(() => {
        authFetch(`/datasets/data/${dataset.id}?` + new URLSearchParams({
            from: "0",
            to: "200",
        })).then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: unknown) => line);
                setValues(data.map((row: string[]) => row[column]))
            });
    }, [])

    useEffect(() => {
        window.addEventListener('resize', triggerResize)
        return () => window.removeEventListener('resize', triggerResize)
    }, [])

    const config = {
        title: column,
        type: "Line",
        height: "400px",
        width: "100vw",
        xAxis: "date",
        yAxis: [column],
        yNames: [column],
        data: values.map((value, i) => ({[column]: value, date: i}))
    };

    return (
        <Box>
            {config && <LineChart config={config} resize={resize}/>}
        </Box>
    )
}
