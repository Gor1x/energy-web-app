import { useEffect } from "react";
import { Box, useTheme, MenuList, MenuItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useStoreon } from 'storeon/react';

const RunOnAlgorithmModal = ({ onSelect }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { dispatch, algorithms } = useStoreon('algorithms')

    useEffect(() => {
      dispatch('algorithms/load')
    }, [])

    const Item = ({ title, file }) => {
        return (
            <MenuItem onClick={() => onSelect(file)}>
                <ListItemIcon sx={{ color: colors.grey[200] }}>
                    <FileOpenIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: colors.grey[200] }}>{title}</ListItemText>
            </MenuItem>
        );
    };

    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Запустить алгоритм
            </Typography>
            <MenuList
                style={{
                    "height": "100%"
                }}></MenuList>
            {algorithms.map((item, i) => <Item key={`sidebar-algorithm-${i}`} title={item.name} file={item} />)}
            <MenuList />
        </Box>
    )
}

export default RunOnAlgorithmModal;