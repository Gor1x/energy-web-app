import React, {useEffect, useState} from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {authFetch} from "../../../auth";
import {FileObject, SelectDates} from "../../../types/FileObject";
import FileOpenIcon from '@mui/icons-material/FileOpen';

const OpenChartModal = ({dataset, onSelect}: {
    dataset: FileObject;
    onSelect: (column: string, chartType: string, selectDates?: SelectDates) => void;
}) => {
    const theme = useTheme();
    const primary = theme.palette.primary.dark;
    const secondary = theme.palette.secondary.light;
    let initState: string[] = [];
    let initFrom: string = "";
    let initTo: string = "";
    const [columns, setColumns] = useState(initState);
    const [fromDate, setFromDate] = useState(initFrom);
    const [toDate, setToDate] = useState(initTo);
    const [selectedColumn, setSelectedColumn] = useState<string>("");
    const [chartType, setChartType] = useState<string>("");

    useEffect(() => {
        authFetch(`/datasets/data/${dataset.id}?from=1&to=2`)
            .then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: string) => line);
                const column = Object.entries(data[0]).map(([key, _]) => key);
                setColumns(column);
                setSelectedColumn(column[0]);
            });
    }, []);

    const handleSelectDate = () => {
        if (fromDate && toDate) {
            onSelect(selectedColumn, chartType, {fromDate, toDate});
        } else {
            onSelect(selectedColumn, chartType)
        }
    };
    const [datesAreVisible, setDatesAreVisible] = useState(false)

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatesAreVisible(event.target.checked);
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
            overflow: 'auto'
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                        Построить график по столбцу
                    </Typography>
                    <MenuList>
                        {columns.map((column, i) => (
                            <MenuItem key={`modal-column-${i}`} selected={selectedColumn === column}
                                      onClick={() => setSelectedColumn(column)}>
                                <ListItemText sx={{color: primary}}>{column}</ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
                        Тип графа
                    </Typography>
                    <MenuList>
                        <MenuItem key={`chart-column-line`} selected={chartType === "line"}
                                  onClick={() => setChartType("line")}>
                            <ListItemText sx={{color: primary}}>{"line"}</ListItemText>
                        </MenuItem>
                        <MenuItem key={`chart-column-scatter`} selected={chartType === "scatter"}
                                  onClick={() => setChartType("scatter")}>
                            <ListItemText sx={{color: primary}}>{"scatter"}</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Grid>
            </Grid>
            <FormControlLabel
                control={<Checkbox checked={datesAreVisible} onChange={handleCheckboxChange} sx={{color: secondary}}/>}
                label="Выбрать даты"
            />
            {datesAreVisible && (
                <Box>
                    <TextField
                        label="От"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        label="До"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        InputLabelProps={{shrink: true}}
                    />

                </Box>)}
            <MenuItem onClick={handleSelectDate} disabled={!selectedColumn || !chartType}>
                <ListItemIcon sx={{color: secondary}}>
                    <FileOpenIcon/>
                </ListItemIcon>
                <ListItemText sx={{color: primary}}>Далее</ListItemText>
            </MenuItem>
        </Box>
    );
};

export default OpenChartModal;