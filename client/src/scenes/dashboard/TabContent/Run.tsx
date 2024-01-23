import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {authFetch} from '../../../auth';
import {RunCard} from "../../../types/CardsType";
import React from "react";

const Run = (card: RunCard) => {
    const [result, setResult] = useState('');

    useEffect(() => {
        authFetch('/run/?' + new URLSearchParams({
            algorithm_id: card.props.algorithm_id,
            dataset_id: card.props.dataset_id,
        })).then(response => response.json())
            .then(json => setResult(JSON.stringify(json)))
    }, [])

    return (
        <Box>
            <Typography id="run-title" variant="h6" component="h2">
                {card.props.title}
            </Typography>
            <Box p='20px'>
                {result}
            </Box>
        </Box>
    )
}

export default Run;
