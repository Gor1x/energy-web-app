import {Route, Routes} from "react-router-dom";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import {ColorModeContext, useMode} from "./theme";
import Signup from "./scenes/signup";
import Login from "./scenes/login";
import './assets/scss/base.scss'
import {useAuth} from "./auth";
import {useStoreon} from "storeon/react";
import React from "react";

function App() {
    const {theme, mode, toggleMode} = useMode();
    const [isLoggedIn] = useAuth();
    const {modal} = useStoreon('modal')

    return (
        <ColorModeContext.Provider value={{ toggleColorMode: toggleMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Box
                        sx={{
                            "height": "100%",
                            "width": "100%",
                            "& .gutter": {
                                "cursor": "col-resize"
                            },
                        }}
                    >
                        <div className="content">
                            {modal}
                            <Box className='appTopbar'>
                                <Topbar/>
                            </Box>
                            <Box className='appBody' width='available'>
                                <Routes>
                                    <Route path="/"
                                           element={isLoggedIn ? <Dashboard/> : <div>Вы не вошли в аккаунт</div>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/signup" element={<Signup/>}/>
                                </Routes>
                            </Box>
                        </div>
                    </Box>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;