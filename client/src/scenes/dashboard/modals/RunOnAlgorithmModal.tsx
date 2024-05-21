import React, {useEffect, useState} from "react";
import {Box, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Radio, Typography, useTheme} from "@mui/material";
import {themeSettings} from "../../../theme";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {useStoreon} from 'storeon/react';
import {FileObject} from "../../../types/FileObject";
import {authFetch} from "../../../auth";

const RunOnAlgorithmModal = ({onSelect, dataset}: {
    onSelect: (algorithm: FileObject) => void,
    dataset: FileObject
}) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    const {dispatch, algorithms} = useStoreon('algorithms');
    const [columns, setColumns] = useState<string[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<string>("");

    useEffect(() => {
        authFetch(`/datasets/data/${dataset.id}?from=1&to=2`)
            .then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: string) => line);
                const column = Object.entries(data[0]).map(([key, _]) => key);
                setColumns(column);
            });
    }, [dataset.id]);

    useEffect(() => {
        dispatch('algorithms/load');
    }, [dispatch]);

    //@ts-ignore
    const mainColor = colors?.primary?.main;

    const Item = ({title, file}: { title: string, file: FileObject }) => {
        dataset.selectColumnForAlgorithm = columns.findIndex(col => col === selectedColumn);
        return (
            <MenuItem onClick={() => onSelect(file)} disabled={!selectedColumn}>
                <ListItemIcon sx={{color: mainColor}}>
                    <FileOpenIcon/>
                </ListItemIcon>
                <ListItemText sx={{color: mainColor}}>{title}</ListItemText>
            </MenuItem>
        );
    };

    const handleColumnSelection = (column: string) => {
        setSelectedColumn(column);
    };

    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Запустить алгоритм
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Выберите колонку</Typography>
                    <MenuList>
                        {columns.map((column, i) => (
                            <MenuItem
                                key={`modal-column-${i}`}
                                onClick={() => handleColumnSelection(column)}
                                selected={selectedColumn === column}
                                sx={{height: 36, minHeight: 36, p: 0}}
                            >
                                <Radio
                                    checked={selectedColumn === column}
                                    onChange={() => handleColumnSelection(column)}
                                    sx={{color: mainColor, p: 0.1}}
                                />
                                <ListItemText sx={{color: mainColor, ml: 1}}>{column}</ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Выберите алгоритм</Typography>
                    <MenuList>
                        {algorithms.map((item: FileObject, i: number) => (
                            <Item key={`sidebar-algorithm-${i}`} title={item.name} file={item}/>
                        ))}
                    </MenuList>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RunOnAlgorithmModal;
