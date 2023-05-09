import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import GridLayout from 'react-grid-layout';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'react-tabs/style/react-tabs.css';

const AlgorithmTab = (props) => {
    const exampleCodeSnippet = `
    import sklearn.cluster as sk

    from clustering.model.Algorithm import Algorithm
    from clustering.model.Algorithm import AlgoParams
    from clustering.model.Algorithm import SelectableParam
    
    k_mans = Algorithm(name="edadws",
                        params=AlgoParams(
                            bool_params=[],
                            float_params=["tol"],
                            int_params=["n_clusters", "n_init", "max_iter", "verbose"],
                            selectable_params=[SelectableParam(name="algorithm",
                                                               items=["elkan", "auto", "full"])]
                        ),
                        run=lambda data, params:
                        sk.KMeans(**params)
                        .fit(data).labels_)
    
    algorithms = [k_mans]
    `
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
                value={exampleCodeSnippet}
                editorProps={{ $blockScrolling: true }}
            />
          </div>
        </GridLayout>
    );
}

export default AlgorithmTab;