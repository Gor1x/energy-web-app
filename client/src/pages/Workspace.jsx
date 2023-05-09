import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DatasetTab from './DatasetTab';
import AlgorithmTab from './AlgorithmTab';

const Workspace = (props) => {

    const renderTab = (file) => {
        switch(file.file_type) {
            case 'algorithm':   return <AlgorithmTab file_id={file.file_id}/>
            case 'dataset':     return <DatasetTab file_id={file.file_id}/>
        } 
    }

    return (
        <div>
            <Tabs>
                <TabList>
                    {props.tabs.map(file => 
                        <Tab>
                            {`${file.file_type} ${file.file_id}`}
                        </Tab>)}
                </TabList>
                {props.tabs.map(file => 
                <TabPanel> 
                    {renderTab(file)} 
                </TabPanel>)}
            </Tabs>
        </div>
    );
}

export default Workspace;