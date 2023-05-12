import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { authFetch } from '../auth';
import ListGroup from 'react-bootstrap/ListGroup';


const FileList = (props) => {
    const [algorithms, setAlgorithms] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        authFetch('/algorithms/')
            .then(response => response.json())
            .then(algorithms => {
                setAlgorithms(algorithms.map(algorithm => algorithm));
            });
        authFetch('/datasets/',)
            .then(response => response.json())
            .then(datasets => {
                setDatasets(datasets.map(dataset => dataset));
            });
    }, []);

    return (
        <div>
            <div>Алгоритмы:</div>
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