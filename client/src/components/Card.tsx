import {Box, IconButton, PaletteOptions, useTheme} from "@mui/material";
import {themeSettings} from "../theme";
import CloseIcon from '@mui/icons-material/Close';
import React, {ReactNode} from "react";
import {PaletteColorOptions, SimplePaletteColorOptions} from "@mui/material/styles/createPalette";
import {ThemeOptions} from "@mui/material/styles/createTheme";

const Card: ({children, columns, rows, onClose}: {
    children: ReactNode;
    columns: string;
    rows: string;
    onClose: {() : void}
}) => React.JSX.Element = ({children, columns, rows, onClose}) => {
    const theme = useTheme();
    const palette = themeSettings(theme.palette.mode).palette;

    // @ts-ignore
    let paletteBgColor = palette?.primary?.light
    return (<Box sx={{boxShadow: 4}}
                 bgcolor={paletteBgColor}
                 gridColumn={`span ${columns}`}
                 gridRow={`span ${rows}`}
                 width='1300px'
    >
        <Box>
            <Box sx={{float: "right"}}>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="inherit"/>
                </IconButton>
            </Box>
        </Box>
        {children}
    </Box>)
}

export default Card;
