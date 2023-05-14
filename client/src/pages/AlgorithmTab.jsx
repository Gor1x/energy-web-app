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
import Dropdown from 'react-bootstrap/Dropdown';
import { authFetch } from '../auth';

const AlgorithmTab = (props) => {
  const [code, setCode] = useState('')

  useEffect(() => {
    authFetch(`/algorithms/code/${props.id}`)
      .then(response => response.text())
      .then(text => setCode(text))
  }, [])

  const [layout, setLayout] = useState([
    { "w": 3, "h": 4, "x": 6, "y": 0, "i": "a" },
    { "w": 3, "h": 4, "x": 6, "y": 4, "i": "b" },
    { "w": 3, "h": 4, "x": 6, "y": 8, "i": "c" },
    { "w": 6, "h": 12, "x": 0, "y": 0, "i": "d" }
  ]);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Открыть
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Редактор алгоритма</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <GridLayout
        layout={layout}
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={(layout, layouts) => {
          console.log(layout)
          setLayout(layout)
        }}>
        <div className='roundbox' key="a">
          результат запуска алгоритма на каком-то датасете
        </div>
        <div className='roundbox' key="b">
          результат запуска алгоритма на каком-то датасете
        </div>
        <div className='roundbox' key="c">
          результат запуска алгоритма на каком-то датасете
        </div>
        <div
          className='roundbox' key="d">
          <AceEditor
            style={{
              'height': '100%',
              'width': '100%'
            }}
            mode="python"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            value={code}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </GridLayout>
    </div>
  );
}

export default AlgorithmTab;