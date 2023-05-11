import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
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

    const [layout, setLayout] = useState([
      { i: "a", x: 0, y: 0, w: 3, h: 4 },
      { i: "b", x: 0, y: 5, w: 3, h: 4 },
      { i: "c", x: 0, y: 9, w: 3, h: 4 },
      { i: "d",  x: 4, y: 0, w: 6, h: 15 }
    ]);

    return (
        <GridLayout
          layout={layout}
          className="layout" 
          cols={12} 
          rowHeight={30} 
          width={1200}
          onLayoutChange={(layout, layouts) => setLayout(layout)}>
            <div className='roundbox' key="a">
              результат запуска алгоритма на каком-то датасете
            </div>
            <div className='roundbox' key="b">
              результат запуска алгоритма на каком-то датасете
            </div>
            <div className='roundbox' key="c">
              результат запуска алгоритма на каком-то датасете
            </div>
            <div //style={{'overflow': 'scroll'}} 
              className='roundbox' key="d">
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