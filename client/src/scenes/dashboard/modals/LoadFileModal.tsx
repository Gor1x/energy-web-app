import {Box, Button, Typography} from "@mui/material";
import React from "react";

const LoadFileModal = ({type, handleUpload, handleClose} : {type: string, handleUpload: (event: any, type:string) => void, handleClose: () => void}) => {
    const mapTypeToTitle: Record<string, string> = {
        "algorithm": "Загрузить алгоритм",
        "dataset": "Загрузить датасет"
    }

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
        <Button  onClick={handleClose}>
            Отмена
        </Button>
    </Box>)
}

export default LoadFileModal;