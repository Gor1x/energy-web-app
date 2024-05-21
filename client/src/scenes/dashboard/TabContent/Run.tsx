import React, {useEffect, useState} from "react";
import {authFetch} from '../../../auth';
import {RunCard} from "../../../types/CardsType";
import {Box, Typography} from "@mui/material";

const Run = (card: RunCard) => {
    return (
        <Box>
            <Typography id="run-title" variant="h6" component="h2">
                {card.props.title}
            </Typography>
            <Box p='20px'>
                {RunResult(card)}
            </Box>
        </Box>
    )
}

const RunResult = (card: RunCard) => {
    const [result, setResult] = useState('');
    useEffect(() => {
        authFetch('/run/?' + new URLSearchParams({
            algorithm_id: card.props.algorithm_id.toString(),
            dataset_id: card.props.dataset_id.toString(),
            column: card.props.column.toString(),
        })).then(response => response.json())
            .then(json => setResult(JSON.stringify(json)))
    }, [])
    return result
}
export default Run;
