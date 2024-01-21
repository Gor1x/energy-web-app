import {useCallback, useEffect, useState} from 'react'
import {Box} from "@mui/material";
import TableCSV from '../../../components/TableCSV';
import LineChart from "../../../components/LineChart/LineChart";
import {authFetch} from '../../../auth';
import Card from '../../../components/Card';
import {getNameWithExtension} from '../../../utils/getFileLabel';
import Run from './Run';
import {useStoreon} from 'storeon/react';
import {DatasetTabHeader} from "./DatasetTabHeader";

const DatasetTabContent = (props) => {
    const {file} = props;
    const tableCard = {
        type: "table",
        props: {
            sizePerPage: 15,
            totalSize: file.num_rows,
            url: `datasets/data/${file.id}`
        }
    }
    const [items, setItems] = useState([tableCard])
    const {dispatch} = useStoreon('modal')

    const Chart = ({dataset, column}) => {
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
                from: 0,
                to: 200,
            })).then(response => response.json())
                .then(data_ => {
                    const data = data_.map(line => line);
                    setValues(data.map(row => row[column]))
                });
        }, [])

        useEffect(() => {
            window.addEventListener('resize', triggerResize, {passive: true})
            return () => window.removeEventListener('resize', triggerResize, {passive: true})
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

    const openChartCardHandler = (column) => {
        const chartCard = {
            type: 'chart',
            props: {
                dataset: file,
                column: column
            }
        };
        if (!items.find((item) => JSON.stringify(item) == JSON.stringify(chartCard))) {
            setItems([...items, chartCard]);
        } else {
            alert("Уже открыто")
        }
    }

    const openRunCardHandler = (algorithm) => {
        const runCard = {
            type: 'run',
            props: {
                title: `Результат запуска ${getNameWithExtension(algorithm)}`,
                algorithm_id: algorithm.id,
                dataset_id: file.id
            }
        };
        if (!items.find((item) => JSON.stringify(item) == JSON.stringify(runCard))) {
            setItems([...items, runCard]);
        } else {
            alert("Уже открыто")
        }
    }

    const openTableCardHandler = () => {
        if (!items.find((item) => JSON.stringify(item) == JSON.stringify(tableCard))) {
            setItems(() => {
                let updated = Object.assign([], items);
                updated.splice(0, 0, tableCard)
                return updated
            })
        } else {
            alert("Уже открыто")
        }
    }

    const closeCardHandler = (i) => {
        setItems(() => {
            let updated = Object.assign([], items);
            updated.splice(i, 1)
            return updated
        })
    };

    return (
        <Box height='100%' width='100%'>
            {/* TOOLBAR */}
            <DatasetTabHeader openChartCardHandler={openChartCardHandler}
                              file={file} modalCloseDispatch={() => {
                dispatch('modal/close')
            }
            } modalOpenDispatch={(modal) => {
                dispatch('modal/open', modal)
            }} openRunCardHandler={openRunCardHandler} openTableCardHandler={openTableCardHandler}/>
            {/* GRID & CHARTS */}
            <Box
                sx={{overflowY: 'scroll' }}
                height="100%"
                width="100%"
                paddingLeft="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap="20px">
                {items.map((item, i) => {
                    switch (item.type) {
                        case 'table':
                            return (
                                <Card key={`card-${i}`} rows={4} columns={6} onClose={() => closeCardHandler(i)}>
                                    <TableCSV {...item.props} />
                                </Card>
                            )
                        case 'chart':
                            return (
                                <Card key={`card-${i}`} rows={4} columns={6} onClose={() => closeCardHandler(i)}>
                                    <Chart {...item.props} />
                                </Card>
                            )
                        case 'run':
                            return (
                                <Card key={`card-${i}`} rows={1} columns={6} onClose={() => closeCardHandler(i)}>
                                    <Run {...item.props} />
                                </Card>
                            )
                    }
                })}
            </Box>
        </Box>
    )
};

export default DatasetTabContent;