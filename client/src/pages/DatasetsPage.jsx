import { React, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { authFetch } from '../auth';


const DatasetsPage = () => {
    const uploadFile = (event) => {
        let file = event.target.files[0];
        if (file) {
            let data = new FormData();
            data.append('file', file);
            const requestOptions = {
                method: 'POST',
                body: data
            };
            authFetch('/datasets', requestOptions)
        }
    }

    return (
        <div>
            <input type="file"
                name="myFile"
                onChange={uploadFile} />
        </div>
    );
}

export default DatasetsPage;