import { useState, useEffect, useCallback } from 'react'
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import TableCSV from '../../../components/TableCSV';
import Line from "../../../components/Line";
import config from './mock_config.json';
import Item from './Item';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddchartIcon from '@mui/icons-material/Addchart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LoadingSpinner from '../../../components/LoadingSpinner';

const DatasetTabContent = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { file } = props;

    const [resize, setResize] = useState(false)
    const [timer, setTimer] = useState(0)

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
        window.addEventListener('resize', triggerResize, { passive: true })
        return () => window.removeEventListener('resize', triggerResize, { passive: true })
    }, [])

    return (
        <Box>
            {/* TOOLBAR */}
            <Box height='40px' width='100%'>
                <IconButton>
                    <TableRowsIcon />
                </IconButton>
                <IconButton>
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
                <Item
                    columns={6}
                    rows={4}
                    backgroundColor={colors.primary[400]}>
                <TableCSV
                    sizePerPage={7}
                    totalSize={file.num_rows}
                    url={`datasets/data/${file.id}`} />
                </Item>
                <Item rows={4} columns={6}>
                    <div>
                        {config && <Line config={config} key={0} resize={resize} />}
                    </div>
                </Item>
            </Box>
        </Box>
    )
};

export default DatasetTabContent;