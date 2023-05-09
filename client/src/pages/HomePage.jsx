import { React, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import FileList from './FileList';
import Workspace from './Workspace';
import Split from 'react-split'

const HomePage = () => {
    const [tabs, setTabs] = useState([])
    return (
        <Split className='horizontal-split'
            direction='horizontal'
            sizes={[20, 80]}>
            <div className='file-list-container roundbox'>
                <FileList onSelect={file => {
                    setTabs([...tabs, file])
                }}/>
            </div>
            <div className='workspace-container roundbox'>
                <Workspace tabs={tabs}/>
            </div>
        </Split>
    );
}

export default HomePage;