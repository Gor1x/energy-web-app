import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { authFetch } from '../auth';


const FileList = (props) => {
    const [algorithms, setAlgorithms] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        authFetch('/algorithms')
            .then(response => response.json())
            .then(algorithms => {
                setAlgorithms(algorithms.map(algorithm => algorithm));
            });
        authFetch('/datasets')
            .then(response => response.json())
            .then(datasets => {
                setDatasets(datasets.map(dataset => dataset));
            });
    }, []);

    return (
        <div>
            <div>Алгоритмы:</div>
            {algorithms.map(algorithm => 
                <div key={`${algorithm.id}-algorithm`}
                onClick={() => props.onSelect({
                    file_id: algorithm.id,
                    file_type: 'algorithm'
                })}>
                    {algorithm.name}
                </div>)}
            <div>Датасеты:</div>
            {datasets.map(dataset => 
                <div key={`${dataset.id}-dataset`}
                onClick={() => props.onSelect({
                    file_id: dataset.id,
                    file_type: 'dataset'
                })}>
                    {dataset.name}
                </div>)}
        </div>
    );
}

export default FileList;