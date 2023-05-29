import { Box, IconButton, useTheme, Menu, MenuItem, ListItemIcon, ListItemText, Fade } from "@mui/material";
import { useState, useContext } from 'react';
import { Link } from "react-router-dom"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth, logout } from "../../auth"
import { ColorModeContext, tokens } from "../../theme";


const Item = ({ title, icon, to }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      component={Link}
      to={to}>
      <ListItemIcon sx={{ color: colors.grey[600] }}>{icon}</ListItemIcon>
      <ListItemText sx={{ color: colors.grey[600] }}>{title}</ListItemText>
    </MenuItem>
  );
};

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [logged] = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box 
      height="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      style={{"background": colors.grey[900]}}>
      {/* LOGO */}
      <img height="50" src="icsenergy-logo.png" style={{"marginLeft": "20px"}}/>
      {/* ICONS */}
      <Box m={2} display="flex">
        {/*<IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>*/}
        {/*<IconButton>
          <SettingsOutlinedIcon />
      </IconButton>*/}
        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}>
          {logged ? (
            <MenuItem
              onClick={() => {
                handleClose()
                logout()
              }}>
              <ListItemIcon sx={{ color: colors.grey[600] }}><LogoutIcon /></ListItemIcon>
              <ListItemText sx={{ color: colors.grey[600] }}>Выйти</ListItemText>
            </MenuItem>) :
            ([<Item
              key="login"
              icon={<LoginIcon />}
              title="Войти"
              to="/login" />,
            <Item
              key="signup"
              icon={<PersonAddIcon />}
              title="Зарегистрироваться"
              to="/signup" />
            ])}
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
