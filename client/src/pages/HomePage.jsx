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

    return (
        <Split className='horizontal-split'
            direction='horizontal'
            sizes={[20, 80]}>
            <div className='file-list-container roundbox'>
                <FileList onSelect={file => {
                    const id = workspaceInfo.tabs.findIndex((el) => el.file_id == file.file_id)
                    if (id == -1) {
                        setWorkspaceInfo({
                            tabs: [...workspaceInfo.tabs, file],
                            activeKey: workspaceInfo.tabs.length
                        })
                    } else {
                        setWorkspaceInfo({
                            tabs: [...workspaceInfo.tabs],
                            activeKey: id
                        })
                    }
                }}/>
            </div>
            <div className='workspace-container roundbox'>
                <Workspace onSelect={(id) => {
                        setWorkspaceInfo({
                            tabs: [...workspaceInfo.tabs],
                            activeKey: id
                        })
                    }} 
                    workspaceInfo={workspaceInfo}/>
            </div>
        </Split>
    );
}

export default HomePage;