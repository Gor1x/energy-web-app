import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FileTab from './FileTab';

const Workspace = (props) => {
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
                    <FileTab file={file}/> 
                </TabPanel>)}
            </Tabs>
        </div>
    );
}

export default Workspace;