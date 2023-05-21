import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";
import Signup from "./scenes/signup";
import Login from "./scenes/login";
import './assets/scss/base.scss'
import { useModal, openModal, closeModal } from './modal';

function App() {
  const [theme, colorMode] = useMode();
  const {modal} = useModal();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
