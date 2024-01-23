import {Box, Typography, useTheme} from "@mui/material";
import {themeSettings} from "../theme";

const Header = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                color={colors.text.default}
                fontWeight="bold"
                sx={{m: "0 0 5px 0"}}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default Header;
