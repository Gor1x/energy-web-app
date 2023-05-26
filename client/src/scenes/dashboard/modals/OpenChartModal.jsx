import { Box, useTheme, MenuList, MenuItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import useUserFiles from "../../../hooks/useUserFiles";
import { tokens } from "../../../theme";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ProgressCircle from "../../../components/ProgressCircle";
import { useEffect, useState } from "react";
import { authFetch } from "../../../auth";

const OpenChartModal = ({ dataset, onSelect }) => {
    //const { userFiles } = useUserFiles();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [columns, setColumns] = useState([])

    useEffect(() => {
        authFetch(`/datasets/data/${dataset.id}?` + new URLSearchParams({
            from: 1,
            to: 2,
        })).then(response => response.json())
            .then(data_ => {
                const data = data_.map(line => line);
                setColumns(Object.entries(data[0]).map(([key, _]) => key))
            });
    }, []);

    const Item = ({ column }) => {
        return (
            <MenuItem onClick={() => onSelect(column)}>
                <ListItemIcon sx={{ color: colors.grey[200] }}>
                    <FileOpenIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: colors.grey[200] }}>{column}</ListItemText>
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
            {columns.map((column, i) => <Item key={`modal-column-${i}`} column={column} />)}
            <MenuList />
        </Box>
    )
}

export default OpenChartModal;