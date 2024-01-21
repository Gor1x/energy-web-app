import {Box, useTheme} from "@mui/material";
import {themeSettings} from "../theme";

const ProgressCircle = ({progress = "0.75", size = "40"}) => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    const angle = progress * 360;
    return (
        <Box
            sx={{
                background: `radial-gradient(${colors.shadow.light} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.primary.dark} ${angle}deg 360deg),
            ${colors.secondary.main}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default ProgressCircle;
