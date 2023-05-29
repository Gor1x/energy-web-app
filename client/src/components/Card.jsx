import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../theme";
import CloseIcon from '@mui/icons-material/Close';

const Card = ({ children, columns, rows, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ boxShadow: 4 }}
            backgroundColor={colors.primary[400]}
            gridColumn={`span ${columns}`}
            gridRow={`span ${rows}`}>
            <Box>
                <Box sx={{ float: "right" }}>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Box>
            {children}
        </Box>
    )
}

export default Card;
