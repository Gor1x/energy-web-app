import {useCallback, useEffect, useState} from "react";
import {authFetch} from "../../../auth";
import {Box} from "@mui/material";
import * as React from 'react';
import {ChartCard} from "../../../types/CardsType";
import {LineChartConfigType} from "../../../types/LineChartConfigType";
import LineChart from "../../../components/LineChart/LineChart";

export function DatasetChart(datasetChartProps: ChartCard) {
    const fromDate = datasetChartProps.props.dataset.selectDates?.fromDate
    const toDate = datasetChartProps.props.dataset.selectDates?.toDate
    const chartType = datasetChartProps.props.chartType
    const {dataset, column} = datasetChartProps.props
    const [resize, setResize] = useState(false)
    const [timer, setTimer] = useState(0)
    let valuesInitState: number[] = []
    const [values, setValues] = useState(valuesInitState)
    let datesInitState: string[] = []
    const [dates, setDates] = useState(datesInitState)

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
        let urlSearchParams = new URLSearchParams({
            from: "0",
            to: Math.min(17000, dataset.num_rows).toString(),
            column: column
        });
        if (fromDate !== undefined) {
            urlSearchParams.append('from_date', fromDate);
        }
        if (toDate !== undefined) {
            urlSearchParams.append('to_date', toDate);
        }
        authFetch(`/datasets/data/${dataset.id}?` + urlSearchParams).then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: unknown) => line);
                setValues(data);
            });
    }, [column, dataset.id]);
    useEffect(() => {
        let urlSearchParams = new URLSearchParams({
            from: "0",
            to: Math.min(17000, dataset.num_rows).toString(),
            column: "Date"
        });
        if (fromDate !== undefined) {
            urlSearchParams.append('from_date', fromDate);
        }
        if (toDate !== undefined) {
            urlSearchParams.append('to_date', toDate);
        }
        authFetch(`/datasets/data/${dataset.id}?` + urlSearchParams).then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: unknown) => line);
                setDates(data);
            });
    }, [dataset.id]);


    useEffect(() => {
        window.addEventListener('resize', triggerResize)
        return () => window.removeEventListener('resize', triggerResize)
    }, [])

    const config: LineChartConfigType = {
        title: column.toString(),
        type: "Line",
        height: "500px",
        width: "100%",
        xAxis: dates,
        yAxis: [column],
        yNames: [column.toString()],
        data: values.map((value, i) => ({[column]: value, date: i})),
        chartType: chartType
    };

    return (
        <Box>
            {config && <LineChart config={config} resize={resize}/>}
        </Box>
    )
}
