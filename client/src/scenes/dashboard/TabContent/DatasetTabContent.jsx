import { useState, useEffect, useCallback } from 'react'
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import TableCSV from '../../../components/TableCSV';
import LineChart from "../../../components/LineChart/LineChart";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddchartIcon from '@mui/icons-material/Addchart';
import TableRowsIcon from '@mui/icons-material/TableRows';
//import { openModal, closeModal } from '../../../modal';
import OpenChartModal from '../../dashboard/modals/OpenChartModal'
import { authFetch } from '../../../auth';
import Card from '../../../components/Card';
import RunOnAlgorithmModal from '../modals/RunOnAlgorithmModal';
import { getNameWithExtension } from '../../../utils/getFileLabel';
import Run from './Run';
import { useStoreon } from 'storeon/react';

const DatasetTabContent = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { file } = props;
    const tableCard = {
        type: "table",
        props: {
            sizePerPage: 7,
            totalSize: file.num_rows,
            url: `datasets/data/${file.id}`
        }
    }
    const [items, setItems] = useState([tableCard])
    const { dispatch } = useStoreon('modal')

    const Chart = ({ dataset, column }) => {
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
            window.addEventListener('resize', triggerResize, { passive: true })
            return () => window.removeEventListener('resize', triggerResize, { passive: true })
        }, [])

        const config = {
            title: column,
            type: "Line",
            height: "400px",
            width: "100%",
            xAxis: "date",
            yAxis: [column],
            yNames: [column],
            data: values.map((value, i) => ({ [column]: value, date: i }))
        };

        return (
            <Box>
                {config && <LineChart config={config} resize={resize} />}
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
        <Box>
            {/* TOOLBAR */}
            <Box height='40px' width='100%'>
                <IconButton onClick={openTableCardHandler}>
                    <TableRowsIcon />
                </IconButton>
                <IconButton onClick={() => dispatch('modal/open',
                    <OpenChartModal
                        dataset={file}
                        onSelect={(column) => {
                            dispatch('modal/close')
                            openChartCardHandler(column)
                        }} />)}>
                    <AddchartIcon />
                </IconButton>
                <IconButton onClick={() => dispatch('modal/open',
                    <RunOnAlgorithmModal onSelect={(algorithm) => {
                        dispatch('modal/close')
                        openRunCardHandler(algorithm)
                    }} />)}>
                    <PlayArrowIcon />
                </IconButton>
            </Box>
            {/* GRID & CHARTS */}
            <Box
                p='20px'
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="80px"
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