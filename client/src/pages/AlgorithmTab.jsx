import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import GridLayout from 'react-grid-layout';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'react-tabs/style/react-tabs.css';
import { authFetch } from '../auth';

const AlgorithmTab = (props) => {
    const [code, setCode] = useState('')

    useEffect(() => {
      authFetch(`/algorithms/${props.file_id}/code`)
        .then(response => response.text())
        .then(text => setCode(text))
    }, [])

    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div className='roundbox' key="a" data-grid={{ x: 0, y: 0, w: 3, h: 4, minW: 2, maxW: 4 }}>
            результат запуска алгоритма на каком-то датасете
          </div>
          <div className='roundbox' key="b" data-grid={{ x: 0, y: 5, w: 3, h: 4, minW: 2, maxW: 4 }}>
            результат запуска алгоритма на каком-то датасете
          </div>
          <div className='roundbox' key="c" data-grid={{ x: 0, y: 9, w: 3, h: 4, minW: 2, maxW: 4 }}>
            результат запуска алгоритма на каком-то датасете
          </div>
          <div style={{'overflow': 'scroll'}} 
            className='roundbox' key="d" data-grid={{ x: 4, y: 0, w: 5, h: 12 }}>
            код алгоритма (редактируемый сохраняемый с возможностью загрузить из файла и выгрузить в файл)
            <AceEditor
                mode="python"
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                value={code}
                editorProps={{ $blockScrolling: true }}
            />
          </div>
        </GridLayout>
    );
}

export default AlgorithmTab;