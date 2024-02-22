import {Box, Fade, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useTheme} from "@mui/material";
import {useState} from 'react';
import {Link} from "react-router-dom"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout, useAuth} from "../../auth"
import {themeSettings} from "../../theme";
import React from "react";


const Item = ({title, icon, to}: {title: string, icon: React.JSX.Element, to: string}) => {

    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    //@ts-ignore
    const mainColor = colors?.info?.main
    return (
        <MenuItem
            component={Link}
            to={to}>
            <ListItemIcon sx={{color: mainColor}}>{icon}</ListItemIcon>
            <ListItemText sx={{color: mainColor}}>{title}</ListItemText>
        </MenuItem>
    );
};

const Topbar = () => {
    const theme = useTheme();
    const colors = themeSettings(theme.palette.mode).palette;
    const [logged] = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: { currentTarget: any; }) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //@ts-ignore
    const colorBackground = colors?.primary?.contrastText
    //@ts-ignore
    const colorText = colors?.info?.main
    //@ts-ignore
    const colorPrimary = colors?.primary?.light

    return (
        <Box
            height="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{"background": colorBackground}}>
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
                    onClick={handleClick}
                >
                    <PersonOutlinedIcon sx={{color: colorPrimary}}/>
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
                                <ListItemIcon sx={{color: colorText}}><LogoutIcon/></ListItemIcon>
                                <ListItemText sx={{color: colorText}}>Выйти</ListItemText>
                            </MenuItem>) :
                        ([<Item
                            key="login"
                            icon={<LoginIcon/>}
                            title="Войти"
                            to="/login"/>,
                            <Item
                                key="signup"
                                icon={<PersonAddIcon/>}
                                title="Зарегистрироваться"
                                to="/signup"/>
                        ])}
                </Menu>
            </Box>
        </Box>
    );
};

export default Topbar;
