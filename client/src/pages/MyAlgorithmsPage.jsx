import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { authFetch } from '../auth';


const MyAlgorithmsPage = () => {
    const [algorithms, setAlgorithms] = useState([])

    useEffect(() => {
        authFetch('/algorithms')
            .then(response => response.json())
            .then(algorithms => setAlgorithms(algorithms.map(algorithm => algorithm.file_path)));
    }, []);

    return (
        <div>
            {algorithms.map(path => <div>{path}</div>)}
        </div>
    );
}

export default MyAlgorithmsPage;