import 'react-tabs/style/react-tabs.css';

import { React, useState } from 'react';
import Split from 'react-split'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FileList from './FileList';
import Workspace from './Workspace';

const HomePage = () => {
    const [workspaceInfo, setWorkspaceInfo] = useState({
        tabs: [],
        activeKey: null
    })

    const onSelect = (file) => {
        const id = workspaceInfo.tabs.findIndex((el) => el.file_type == file.file_type && el.id == file.id)
        
        setWorkspaceInfo({
            tabs: (id == -1 ? [...workspaceInfo.tabs, file] : [...workspaceInfo.tabs]),
            activeKey: (id == -1 ? workspaceInfo.tabs.length : id)
        })
    }

    const onClose = (id) => {
        workspaceInfo.tabs.splice(id, 1)
        setWorkspaceInfo({
            tabs: [...workspaceInfo.tabs],
            activeKey: (id!=0 ? id-1 : id)
        })
    }

    return (
        <Split className='horizontal-split'
            direction='horizontal'
            sizes={[20, 80]}>
            <div className='file-list-container roundbox'>
                <FileList modalTitle={'Загрузка алгоритма'} listName={'Алгоритмы'} urlBenchName={'algorithms'} fileType={'algorithm'} onSelect={onSelect}/>
                <FileList modalTitle={'Загрузка датасета'} listName={'Датасеты'} urlBenchName={'datasets'} fileType={'dataset'} onSelect={onSelect}/>
            </div>
            <div className='workspace-container roundbox'>
                <Workspace onSelect={(id) => {
                        setWorkspaceInfo({
                            ...workspaceInfo,
                            activeKey: id
                        })
                    }} 
                    workspaceInfo={workspaceInfo}
                    onClose={onClose}/>
            </div>
        </Split>
    );
}

export default HomePage;