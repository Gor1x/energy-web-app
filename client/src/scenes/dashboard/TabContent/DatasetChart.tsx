import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../../auth";
import { Box } from "@mui/material";
import { ChartCard, RunCard } from "../../../types/CardsType";
import { DatasType, LineChartConfigType } from "../../../types/LineChartConfigType";
import LineChart from "../../../components/LineChart/LineChart";

export function DatasetChart(datasetChartProps: ChartCard) {
    const fromDate = datasetChartProps.props.dataset.selectDates?.fromDate;
    const toDate = datasetChartProps.props.dataset.selectDates?.toDate;
    const chartType = datasetChartProps.props.chartType;
    const { dataset, columns } = datasetChartProps.props;
    const [resize, setResize] = useState(false);
    const [timer, setTimer] = useState(0);
    const [values, setValues] = useState<DatasType[]>([]);
    const [dates, setDates] = useState<string[]>([]);

    const triggerResize = useCallback(() => {
        if (timer) {
            window.cancelAnimationFrame(timer);
        }
        setTimer(window.requestAnimationFrame(() => {
            setResize(true);
            setTimeout(() => {
                setResize(false);
            }, 0);
        }));
    }, [setResize, timer]);

    useEffect(() => {
        const fetchColumnData = async (column: string) => {
            let urlSearchParams = new URLSearchParams({
                from: "0",
                to: Math.min(170000, dataset.num_rows).toString(),
                column: column
            });
            if (fromDate !== undefined) {
                urlSearchParams.append("from_date", fromDate);
            }
            if (toDate !== undefined) {
                urlSearchParams.append("to_date", toDate);
            }
            const response = await authFetch(`/datasets/data/${dataset.id}?` + urlSearchParams);
            const data = await response.json();
            return data.map((value: number, index: number) => ({ [column]: value, date: index }));
        };

        const fetchAllData = async () => {
            const allData: DatasType[] = [];
            for (const column of columns) {
                const columnData = await fetchColumnData(column);
                columnData.forEach((item: DatasType, index: number) => {
                    if (!allData[index]) {
                        allData[index] = { date: index };
                    }
                    allData[index] = { ...allData[index], ...item };
                });
            }
            setValues(allData);
        };

        fetchAllData();
    }, [columns, dataset.id, fromDate, toDate]);

    useEffect(() => {
        const fetchDates = async () => {
            let urlSearchParams = new URLSearchParams({
                from: "0",
                to: Math.min(170000, dataset.num_rows).toString(),
                column: "Date"
            });
            if (fromDate !== undefined) {
                urlSearchParams.append("from_date", fromDate);
            }
            if (toDate !== undefined) {
                urlSearchParams.append("to_date", toDate);
            }
            const response = await authFetch(`/datasets/data/${dataset.id}?` + urlSearchParams);
            const data = await response.json();
            setDates(data.map((line: string) => line));
        };

        fetchDates();
    }, [dataset.id, fromDate, toDate]);

    useEffect(() => {
        const fetchRunResultData = async () => {
            if (dataset.runCard) {
                const result = await fetchRunResult(dataset.runCard);
                const lastColumnName = columns[columns.length - 1];
                const formattedResult = values.map((item, index) => ({
                    ...item,
                    [lastColumnName]: result[index]
                }));
                setValues(formattedResult);
            }
        };

        fetchRunResultData();
    }, [dataset.runCard, values, columns]);

    useEffect(() => {
        window.addEventListener("resize", triggerResize);
        return () => window.removeEventListener("resize", triggerResize);
    }, [triggerResize]);

    const config: LineChartConfigType = {
        title: columns.toString(),
        type: chartType,
        height: "500px",
        width: "100%",
        xAxis: dates,
        yAxis: columns,
        yNames: columns,
        data: values,
    };

    return (
        <Box>
            {config && <LineChart config={config} resize={resize} />}
        </Box>
    );
}

const fetchRunResult = async (runCard: RunCard) => {
    const response = await authFetch('/run/?' + new URLSearchParams({
        algorithm_id: runCard.props.algorithm_id.toString(),
        dataset_id: runCard.props.dataset_id.toString(),
        column: runCard.props.column.toString(),
    }));
    const json = await response.json();
    return json.map((value: number, index: number) => ({ [runCard.props.column]: value, date: index }));
};
