import 'react-tabs/style/react-tabs.css';

import { React, useEffect, useState, useId } from 'react';
import { Button } from 'react-bootstrap';

//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DatasetTab from './DatasetTab';
import AlgorithmTab from './AlgorithmTab';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Workspace = (props) => {
    const renderTab = (file) => {
        switch (file.file_type) {
            case 'algorithm': return <AlgorithmTab file_id={file.file_id} />
            case 'dataset': return <DatasetTab file_id={file.file_id} />
        }
    }
    
    return (
        <div>
            <Tabs activeKey={props.workspaceInfo.activeKey}
                onSelect={props.onSelect}>
                {props.workspaceInfo.tabs.map((file, i) => 
                    <Tab eventKey={i} 
                        title={
                            <div>
                                {file.file_name+file.file_id}
                                <Button className='file-button'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        props.onClose(i)
                                    }}
                                    variant="outline-dark">
                                    <i className="bi bi-x" aria-hidden="true"></i>
                                </Button>
                            </div>
                        }>
                        <div>
                        {renderTab(file)}
                        </div>
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}

export default Workspace;