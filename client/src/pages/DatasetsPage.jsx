import { React, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios'


const DatasetsPage = () => {
    const uploadFile = (event) => {
        let file = event.target.files[0];
        if (file) {
            let data = new FormData();
            data.append('file', file);
            axios.post('/datasets', data);
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