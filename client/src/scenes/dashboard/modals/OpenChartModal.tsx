import {Box, ListItemIcon, ListItemText, MenuItem, MenuList, Typography, useTheme} from "@mui/material";
import {themeSettings} from "../../../theme";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {useEffect, useState} from "react";
import {authFetch} from "../../../auth";
import React from "react";
import {FileObject} from "../../../types/FileObject";

const OpenChartModal = ({dataset, onSelect} : {dataset: FileObject, onSelect: any}) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    let initState: string[] = []
    const [columns, setColumns] = useState(initState)

    useEffect(() => {
        authFetch(`/datasets/data/${dataset.id}?` + new URLSearchParams({
            from: "1",
            to: "2",
        })).then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: string) => line);
                setColumns(Object.entries(data[0]).map(([key, _]) => key))
            });
    }, []);

    const Item = ({column} : {column: string}) => {
        return (
            <MenuItem onClick={() => onSelect(column)}>
                <ListItemIcon sx={{color: colors.primary.main}}>
                    <FileOpenIcon/>
                </ListItemIcon>
                <ListItemText sx={{color: colors.primary.main}}>{column}</ListItemText>
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
                Построить график по столбцу
            </Typography>
            <MenuList
                style={{
                    "height": "100%"
                }}></MenuList>
            {columns.map((column, i) => <Item key={`modal-column-${i}`} column={column}/>)}
            <MenuList/>
        </Box>
    )
}

export default OpenChartModal;