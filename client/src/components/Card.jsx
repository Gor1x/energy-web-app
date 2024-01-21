import {Box, IconButton, useTheme} from "@mui/material";
import {themeSettings} from "../theme";
import CloseIcon from '@mui/icons-material/Close';

const Card = ({children, columns, rows, onClose}) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;

    return (<Box sx={{boxShadow: 4}}
                 backgroundColor={colors.primary.white}
                 gridColumn={`span ${columns}`}
                 gridRow={`span ${rows}`}
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
