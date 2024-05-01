import {React, useEffect, useState} from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {authFetch} from '../auth';

const CodeEditor = (props) => {
    const [code, setCode] = useState('')
    const {file} = props;

    useEffect(() => {
        authFetch(`/algorithms/code/${file.id}`)
            .then(response => response.text())
            .then(text => setCode(text))
    }, [])

    return (
        <AceEditor
            style={{
                'height': '100%',
                'min-height': '400px',
                'width': '100%',
                'min-width': '1000px',
            }}
            mode="python"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            value={code}
            editorProps={{$blockScrolling: true}}
        />
    )
}

export default CodeEditor;