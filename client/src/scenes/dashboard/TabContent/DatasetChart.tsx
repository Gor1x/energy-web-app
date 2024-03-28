import {useCallback, useEffect, useState} from "react";
import {authFetch} from "../../../auth";
import {Box} from "@mui/material";
import LineChart from "../../../components/LineChart/LineChart";
import * as React from 'react';
import {ChartCard} from "../../../types/CardsType";
import {LineChartConfigType} from "../../../types/LineChartConfigType";

export function DatasetChart(datasetChartProps: ChartCard) {
    const {dataset, column} = datasetChartProps.props
    const [resize, setResize] = useState(false)
    const [timer, setTimer] = useState(0)
    let valuesInitState: number[] = []
    const [values, setValues] = useState(valuesInitState)

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

    type StringToNumber = {
        [key: string]: number
    }
    useEffect(() => {
        authFetch(`/datasets/data/${dataset.id}?` + new URLSearchParams({
            from: "0",
            to: "20000", // max len data in chart
            column: column
        })).then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: unknown) => line);
                setValues(data.map((row: any) => row[column]));
            });
    }, [column, dataset.id]);

    useEffect(() => {
        window.addEventListener('resize', triggerResize)
        return () => window.removeEventListener('resize', triggerResize)
    }, [])

    const config: LineChartConfigType = {
        title: column.toString(),
        type: "Line",
        height: "500px",
        width: "100%",
        xAxis: values.length,
        yAxis: [column],
        yNames: [column.toString()],
        data: values.map((value, i) => ({[column]: value, date: i}))
    };

    return (
        <Box>
            {config && <LineChart config={config} resize={resize}/>}
        </Box>
    )
}
