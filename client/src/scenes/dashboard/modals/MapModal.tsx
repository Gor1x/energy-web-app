import {Box} from "@mui/material";
import React from "react";
import Map from "../../../components/Map";

const MapModal = (props: { onClick: {() : void}; }) =>
    <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 500,
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    }}>
        <Map onClick={props.onClick} height="100%"/>
    </Box>

export default MapModal;