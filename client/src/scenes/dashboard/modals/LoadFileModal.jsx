import {Box, Button, Typography} from "@mui/material";

const LoadFileModal = ({type, handleUpload, handleClose}) => {
    const mapTypeToTitle = {
        algorithm: "Загрузить алгоритм",
        dataset: "Загрузить датасет"
    };
    return (<Box sx={{
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
            {mapTypeToTitle[type]}
        </Typography>
        <input type="file"
               name="myFile"
               onChange={(event) => handleUpload(event, type)}/>
        <Button variant="secondary" onClick={handleClose}>
            Отмена
        </Button>
    </Box>)
}

export default LoadFileModal;