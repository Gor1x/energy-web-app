import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Typography,
    useTheme,
    Radio,
} from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useStoreon } from 'storeon/react';
import { authFetch } from "../../../auth";
import {themeSettings} from "../../../theme";
import {FileObject} from "../../../types/FileObject";

const RunOnDatasetModal = ({ onSelect }: { onSelect: (dataset: FileObject) => void }) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    const { dispatch, datasets } = useStoreon('datasets');

    const [columns, setColumns] = useState<string[]>([]);
    const [selectedDataset, setSelectedDataset] = useState<FileObject | null>(null);
    const [selectedColumn, setSelectedColumn] = useState<string>("");

    useEffect(() => {
        dispatch('datasets/load');
    }, [dispatch]);

    useEffect(() => {
        if (selectedDataset) {
            authFetch(`/datasets/data/${selectedDataset.id}?from=1&to=2`)
                .then(response => response.json())
                .then(data_ => {
                    const data = data_.map((line: string) => line);
                    const column = Object.entries(data[0]).map(([key, _]) => key);
                    setColumns(column);
                });
        } else {
            setColumns([]);
        }
    }, [selectedDataset]);

    //@ts-ignore
    const mainColor = colors?.primary?.main;

    const handleDatasetSelection = (dataset: FileObject) => {
        setSelectedDataset(dataset);
        setSelectedColumn(""); // Reset selected column when dataset changes
    };

    const handleColumnSelection = (column: string) => {
        setSelectedColumn(column);
    };

    const Item = ({ title, file }: { title: string, file: FileObject }) => {
        const handleClick = () => {
            file.selectColumnForAlgorithm = columns.findIndex(col => col === selectedColumn);
            onSelect(file);
        };

        return (
            <MenuItem onClick={handleClick} disabled={!selectedColumn}>
                <ListItemIcon sx={{ color: mainColor }}>
                    <FileOpenIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: mainColor }}>{title}</ListItemText>
            </MenuItem>
        );
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
                Запустить на датасете
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Выберите датасет</Typography>
                    <MenuList>
                        {datasets.map((item: FileObject, i: number) => (
                            <MenuItem
                                key={`sidebar-dataset-${i}`}
                                onClick={() => handleDatasetSelection(item)}
                                selected={selectedDataset?.id === item.id}
                                sx={{ height: 36, minHeight: 36, p: 0 }}
                            >
                                <Radio
                                    checked={selectedDataset?.id === item.id}
                                    onChange={() => handleDatasetSelection(item)}
                                    sx={{ color: mainColor, p: 0.1 }}
                                />
                                <ListItemText sx={{ color: mainColor, ml: 1 }}>{item.name}</ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Grid>
                <Grid item xs={6}>
                    {selectedDataset && (
                        <>
                            <Typography variant="subtitle1">Выберите колонку</Typography>
                            <MenuList>
                                {columns.map((column, i) => (
                                    <MenuItem
                                        key={`modal-column-${i}`}
                                        onClick={() => handleColumnSelection(column)}
                                        selected={selectedColumn === column}
                                        sx={{ height: 36, minHeight: 36, p: 0 }}
                                    >
                                        <Radio
                                            checked={selectedColumn === column}
                                            onChange={() => handleColumnSelection(column)}
                                            sx={{ color: mainColor, p: 0.1 }}
                                        />
                                        <ListItemText sx={{ color: mainColor, ml: 1 }}>{column}</ListItemText>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <MenuList style={{ height: "100%" }}>
                        {selectedDataset && <Item title={selectedDataset.name} file={selectedDataset} />}
                    </MenuList>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RunOnDatasetModal;
