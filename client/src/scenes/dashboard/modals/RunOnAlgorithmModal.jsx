import {useEffect} from "react";
import {Box, ListItemIcon, ListItemText, MenuItem, MenuList, Typography, useTheme} from "@mui/material";
import {themeSettings} from "../../../theme";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {useStoreon} from 'storeon/react';

const RunOnAlgorithmModal = ({onSelect}) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    const {dispatch, algorithms} = useStoreon('algorithms')

    useEffect(() => {
        dispatch('algorithms/load')
    }, [])

    const Item = ({title, file}) => {
        return (
            <MenuItem onClick={() => onSelect(file)}>
                <ListItemIcon sx={{color: colors.primary.main}}>
                    <FileOpenIcon/>
                </ListItemIcon>
                <ListItemText sx={{color: colors.primary.main}}>{title}</ListItemText>
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
            {algorithms.map((item, i) => <Item key={`sidebar-algorithm-${i}`} title={item.name} file={item}/>)}
            <MenuList/>
        </Box>
    )
}

export default RunOnAlgorithmModal;