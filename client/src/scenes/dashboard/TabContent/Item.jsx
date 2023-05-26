import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const Item = ({ children, columns, rows }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ boxShadow: 4 }}
            backgroundColor={colors.primary[400]}
            gridColumn={`span ${columns}`}
            gridRow={`span ${rows}`}>
            {children}
        </Box>
    )
}

export default Item;