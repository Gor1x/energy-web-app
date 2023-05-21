import { useEffect, useState } from 'react'
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import CodeEditor from "../../../components/CodeEditor";
import Item from './Item';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { openModal, closeModal } from '../../../modal';
import RunOnDatasetModal from '../modals/RunOnDatasetModal';
import { authFetch } from '../../../auth';

const AlgorithmTabContent = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { file } = props;
    const [items, setItems] = useState([
        <Item rows={6} columns={6}>
            <CodeEditor file={file} />
        </Item>
    ]);

    const Run = ({algorithm_id, dataset_id}) => {
        const [result, setResult] = useState('');

        useEffect(() => {
            authFetch(`/run/?dataset_id=${dataset_id}&algorithm_id=${algorithm_id}`)
                .then(response => response.json())
                .then(json => setResult(JSON.stringify(json)))
        }, [])

        return (
            <Item rows={1} columns={6}>
                <Box p='20px'>
                    {result}
                </Box>
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
                <RunOnDatasetModal onSelect={(dataset) => {
                    closeModal()
                    setItems([...items, <Run algorithm_id={file.id} dataset_id={dataset.id}/>])
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
                {items}
            </Box>
        </Box>
    )
}

export default AlgorithmTabContent;