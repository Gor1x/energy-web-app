import { useState, useEffect, useCallback } from 'react'
import { Box, useTheme, IconButton, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import TableCSV from '../../../components/TableCSV';
import LineChart from "../../../components/LineChart/LineChart";
import Item from './Item';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddchartIcon from '@mui/icons-material/Addchart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { openModal, closeModal } from '../../../modal';
import OpenChartModal from '../../dashboard/modals/OpenChartModal'
import { authFetch } from '../../../auth';

const DatasetTabContent = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { file } = props;

    const [items, setItems] = useState([
        <Item
            columns={6}
            rows={4}
            backgroundColor={colors.primary[400]}>
            <TableCSV
                sizePerPage={7}
                totalSize={file.num_rows}
                url={`datasets/data/${file.id}`} />
        </Item>
    ]);

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
            data: values.map((value, i) => ({[column]: value, date: i}))
        };

        return (
            <Item rows={4} columns={6}>
                <div>
                    {config && <LineChart config={config} resize={resize} />}
                </div>
            </Item>
        )
    }

    return (
        <Box>
            {/* TOOLBAR */}
            <Box height='40px' width='100%'>
                <IconButton>
                    <TableRowsIcon />
                </IconButton>
                <IconButton onClick={() => openModal(
                    <OpenChartModal
                        dataset={file}
                        onSelect={(column) => {
                            closeModal()
                            setItems([...items, <Chart dataset={file} column={column} />])
                        }} />)}>
                    <AddchartIcon />
                </IconButton>
                <IconButton>
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
                {items}
            </Box>
        </Box>
    )
};

export default DatasetTabContent;