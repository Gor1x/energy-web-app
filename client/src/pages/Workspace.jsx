import { React, useEffect, useState, useId } from 'react';
import 'react-tabs/style/react-tabs.css';
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
            <Tabs activeKey={props.workspaceInfo.activeKey}>
                {props.workspaceInfo.tabs.map((file, i) =>
                    <Tab eventKey={i} title={file.file_name}>
                        {renderTab(file)}
                    </Tab>)}
            </Tabs>
        </div>
    );
}

export default Workspace;