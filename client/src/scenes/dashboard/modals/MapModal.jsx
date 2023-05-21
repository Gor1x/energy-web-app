import { Box } from "@mui/material";
import Map from "../../../components/Map";

const MapModal = () =>
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
        <Map height="100%" />
    </Box>

export default MapModal;