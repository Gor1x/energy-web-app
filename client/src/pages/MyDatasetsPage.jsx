import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { authFetch } from '../auth';


const MyDatasetsPage = () => {
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        authFetch('/datasets')
            .then(response => response.json())
            .then(datasets => setDatasets(datasets.map(dataset => dataset.file_path)));
    }, []);

    return (
        <div>
            {datasets.map(path => <div>{path}</div>)}
        </div>
    );
}

export default MyDatasetsPage;