import { useState } from 'react'
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import CodeEditor from "../../../components/CodeEditor";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { openModal, closeModal } from '../../../modal';
import RunOnDatasetModal from '../modals/RunOnDatasetModal';
import { getNameWithExtension } from '../../../utils/getFileLabel';
import Card from '../../../components/Card';
import Run from './Run';

const AlgorithmTabContent = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { file } = props;
    const codeCard = {
        type: "code",
        props: {
            file: file
        }
    };
    const [items, setItems] = useState([codeCard]);

    const openRunCardHandler = (dataset) => {
        const runCard = {
            type: 'run',
            props: {
                title: `Результат запуска на ${getNameWithExtension(dataset)}`,
                algorithm_id: file.id,
                dataset_id: dataset.id
            }
        };
        if (!items.find((item) => JSON.stringify(item) == JSON.stringify(runCard))) {
            setItems([...items, runCard]);
        } else {
            alert("Уже открыто")
        }
    }

    const openCodeCardHandler = () => {
        if (!items.find((item) => JSON.stringify(item) == JSON.stringify(codeCard))) {
            setItems(() => {
                let updated = Object.assign([], items);
                updated.splice(0, 0, codeCard)
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
                <IconButton>
                    <TableRowsIcon onClick={openCodeCardHandler} />
                </IconButton>
                <IconButton onClick={() => openModal(
                    <RunOnDatasetModal onSelect={(dataset) => {
                        closeModal()
                        openRunCardHandler(dataset)
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
                        case 'code':
                            return (
                                <Card rows={6} columns={6} onClose={() => closeCardHandler(i)}>
                                    <CodeEditor {...item.props} />
                                </Card>
                            )
                        case 'run':
                            return (
                                <Card rows={1} columns={6} onClose={() => closeCardHandler(i)}>
                                    <Run {...item.props} />
                                </Card>
                            )
                    }
                })}
            </Box>
        </Box>
    )
}

export default AlgorithmTabContent;