import 'react-tabs/style/react-tabs.css';

import { React, useEffect, useState } from 'react';
//import axios from 'axios';
import { authFetch } from '../auth';
import ListGroup from 'react-bootstrap/ListGroup';

import AlgorithmsPage from './AlgorithmsPage';


const FileList = (props) => {
    const [algorithms, setAlgorithms] = useState([])
    const [datasets, setDatasets] = useState([])

    const [code, setCode] = useState("")
    const uploadFile = (event) => {
        let file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                setCode(e.target.result);
            };
            reader.readAsBinaryString(file);

            let data = new FormData();
            data.append('file', file);
            const requestOptions = {
                method: 'POST',
                body: data
            };
            
            authFetch('/algorithms', requestOptions)
            .then(response => response.json())
            .then(algorithm => {
                setAlgorithms([...algorithms, algorithm[0]])
            });
            //axios.post('/algorithms', data);
        }
    }

    const onClick = (algorithm) => {
        algorithms.splice(algorithms.indexOf(algorithm), 1)
        setAlgorithms([...algorithms])

        const requestOptions = {
            method: 'DELETE'
        };
        authFetch(`/algorithms/${algorithm.id}`, requestOptions)
    }

    useEffect(() => {
        authFetch('/algorithms/')
            .then(response => response.json())
            .then(algorithms => {
                setAlgorithms(algorithms.map(algorithm => algorithm));
            });
    }, []);
    useEffect(() => {
        authFetch('/datasets/',)
            .then(response => response.json())
            .then(datasets => {
                setDatasets(datasets.map(dataset => dataset));
            });
    }, []);
    return (
        <div>
            <div>Алгоритмы:</div>

            <input type="file"
                name="myFile"
                onChange={uploadFile} />

            <ListGroup variant="flush">
                {algorithms.map((algorithm, i) =>
                    <ListGroup.Item 
                        action 
                        href={`#algorithm_${i}`}
                        onClick={() => props.onSelect({
                            file_name: algorithm.name,
                            file_id: algorithm.id,
                            file_type: 'algorithm'
                        })}>
                        {algorithm.name}
                        <button onClick={() => onClick(algorithm)}>X</button>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <div>Датасеты:</div>
            <ListGroup variant="flush">
                {datasets.map((dataset, i) =>
                    <ListGroup.Item 
                        action 
                        href={`#dataset_${i}`}
                        onClick={() => props.onSelect({
                            file_name: dataset.name,
                            file_id: dataset.id,
                            file_type: 'dataset'
                        })}>
                        {dataset.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
}

export default FileList;