import { Box, Typography, Button} from "@mui/material";
import { closeModal } from '../../../modal';

const LoadFileModal = ({type, handleUpload, handleClose}) => 
    <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Загрузить {type == "algorithm" ? "алгоритм" : "датасет"}
        </Typography>
        <input type="file"
            name="myFile"
            onChange={(event) => handleUpload(event, type)} />
        <Button variant="secondary" onClick={handleClose}>
            Отмена
        </Button>
    </Box>

export default LoadFileModal;