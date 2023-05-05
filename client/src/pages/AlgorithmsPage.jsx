import { React, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'react-tabs/style/react-tabs.css';
import axios from 'axios'
import { authFetch } from '../auth';
import {RequestInfo} from 'react-token-auth'

const AlgorithmsPage = () => {
    const [code, setCode] = useState("");

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
            //axios.post('/algorithms', data);
        }
    }

    return (
        <div>
            <AceEditor
                mode="python"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                value={code}
                editorProps={{ $blockScrolling: true }}
            />
            <input type="file"
                name="myFile"
                onChange={uploadFile} />
        </div>
    );
}

export default AlgorithmsPage;