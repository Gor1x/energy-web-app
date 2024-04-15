import React, {useEffect, useState} from "react";
import {Box, ListItemIcon, ListItemText, MenuItem, MenuList, TextField, Typography, useTheme} from "@mui/material";
import {authFetch} from "../../../auth";
import {FileObject} from "../../../types/FileObject";
import FileOpenIcon from '@mui/icons-material/FileOpen';

const OpenChartModal = ({dataset, onSelect}: {
    dataset: FileObject;
    onSelect: (column: string, selectDates: { fromDate: string; toDate: string }) => void;
}) => {
    const theme = useTheme();
    const primary = theme.palette.primary.dark;
    let initState: string[] = [];
    let initFrom: string = "";
    let initTo: string = "";
    const [columns, setColumns] = useState(initState);
    const [fromDate, setFromDate] = useState(initFrom);
    const [toDate, setToDate] = useState(initTo);

    useEffect(() => {
        authFetch(`/datasets/data/${dataset.id}?from=1&to=2`)
            .then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: string) => line);
                const column = Object.entries(data[0]).map(([key, _]) => key);
                setColumns(column);
            });
    }, []);

    const handleSelectDate = () => {
        if (fromDate && toDate) {
            onSelect(columns[0], {fromDate, toDate});
        } else {
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Построить график по столбцу
            </Typography>
            <MenuList>
                {columns.map((column, i) => (
                    <MenuItem key={`modal-column-${i}`}>
                        <ListItemText sx={{color: primary}}>{column}</ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
            <MenuList>
                <MenuItem>
                    <TextField
                        label="От"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </MenuItem>
                <MenuItem>
                    <TextField
                        label="До"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </MenuItem>
                <MenuItem onClick={handleSelectDate}>
                    <ListItemIcon sx={{color: primary}}>
                        <FileOpenIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{color: primary}}>Выбрать</ListItemText>
                </MenuItem>
            </MenuList>
        </Box>
    );
};

export default OpenChartModal;