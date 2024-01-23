import {createContext, useMemo, useState} from "react";
import {createTheme} from "@mui/material/styles";

// color design tokens export
export const colors = {
    white: {
        100: "#fcfcfc",
    },
    grey: {
        100: "#e5e5e5",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
    },
    greenAccent: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922",
    },
    redAccent: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f",
    },
    blueAccent: {
        100: "#e1e2fe",
        200: "#C2D8EB",//"#A6BDD7",
        300: "#b5cee8",
        400: "#2FA8DC",
        500: "#286090", //Sidebar background
        600: "#1E97CB", //sidebar with select on
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
    },
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        white: colors.grey[100],
                        main: colors.grey[800],
                        backgroundTopbar: colors.blueAccent[600],
                        dark: colors.grey[900]
                    },
                    secondary: {
                        main: colors.blueAccent[600],
                    },
                    neutral: {
                        dark: colors.grey[900],
                        main: colors.grey[800],
                        light: colors.grey[900],
                    },
                    background: { //all
                        default: colors.grey[800],
                    },
                    text: {
                        default: colors.grey[100],
                        menuDefault: colors.grey[100],
                        h2: colors.grey[200],
                    },
                    shadow: {
                        default: colors.grey[800],
                        light: colors.grey[400],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        white: colors.white[100],
                        main: colors.grey[200],
                        dark: colors.grey[900]
                    },
                    secondary: {
                        main: colors.blueAccent[300],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[200],
                    },
                    background: { //all
                        default: colors.white[100],
                        topbar: colors.blueAccent[500],
                        sidebar: colors.grey[100],
                        sidebarHeader: colors.blueAccent[200]
                    },
                    text: {
                        default: colors.grey[900],
                        menuDefault: colors.grey[800],
                        h2: colors.grey[500],
                    },
                    shadow: {
                        default: colors.grey[800],
                        light: colors.grey[400],
                    }
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {
    },
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, mode];
};
