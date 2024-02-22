import {createContext, useMemo, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {Theme} from "@emotion/react";
import {ThemeOptions} from "@mui/material/styles/createTheme";
import {PaletteMode} from "@mui/material";

// color design tokens export
export const colors  = {
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
export const themeSettings = (mode: PaletteMode): ThemeOptions => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        light: colors.grey[100],
                        main: colors.blueAccent[600],
                        dark: colors.grey[900],
                        contrastText: colors.blueAccent[500]
                    },
                    secondary: {
                        main: colors.blueAccent[600],
                        light: colors.grey[400],
                        dark: colors.grey[800]
                    },
                    info: {
                        dark: colors.grey[900],
                        main: colors.grey[800],
                        light: colors.grey[900],
                    },
                    background: { //all
                        paper: colors.grey[500],
                    },
                    text: {
                        primary: colors.grey[100],
                        secondary: colors.grey[200],
                    }
                }
                : {
                    // palette values for light mode
                    primary: {
                        light: colors.white[100],
                        main: colors.grey[200],
                        dark: colors.grey[900],
                        contrastText: colors.blueAccent[500]
                    },
                    secondary: {
                        main: colors.blueAccent[300],
                        light: colors.grey[400],
                        dark: colors.blueAccent[200]
                    },
                    info: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[200],
                    },
                    background: {
                        paper: colors.grey[100],
                    },
                    text: {
                        primary: colors.grey[900],
                        secondary: colors.grey[800]
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

export const useMode = (): { theme: Theme; mode: PaletteMode; toggleMode: () => void } => {
    const [mode, setMode] = useState<PaletteMode>("light");
    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme: Theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return { theme, mode, toggleMode };
};
