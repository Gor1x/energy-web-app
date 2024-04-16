import {Box, IconButton, useTheme} from "@mui/material";
import {themeSettings} from "../theme";
import CloseIcon from '@mui/icons-material/Close';
import React, {ReactNode} from "react";

type CardProps = {
    children: React.ReactNode;
    columns: string;
    rows: string;
    onClose: () => void;
    closeable?: boolean;
};

const Card = ({ children, columns, rows, onClose, closeable = true }: CardProps) => {
    const theme = useTheme();
    const palette = themeSettings(theme.palette.mode).palette;

    // @ts-ignore
    let paletteBgColor = palette?.primary?.light
    return (<Box sx={{boxShadow: 4}}
                 bgcolor={paletteBgColor}
                 gridColumn={`span ${columns}`}
                 gridRow={`span ${rows}`}
                 width='100%'
                 height={'100%'}
    >
        {closeable && <Box>
            <Box sx={{float: "right"}}>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="inherit"/>
                </IconButton>
            </Box>
        </Box>}
        {children}
    </Box>)
}

export default Card;
