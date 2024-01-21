import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {authFetch} from '../../../auth';

const Run = ({title, algorithm_id, dataset_id}) => {
    const [result, setResult] = useState('');

    useEffect(() => {
        authFetch('/run/?' + new URLSearchParams({
            algorithm_id: algorithm_id,
            dataset_id: dataset_id,
        })).then(response => response.json())
            .then(json => setResult(JSON.stringify(json)))
    }, [])

    return (
        <Box>
            <Typography id="run-title" variant="h6" component="h2">
                {title}
            </Typography>
            <Box p='20px'>
                {result}
            </Box>
        </Box>
    )
}

export default Run;
