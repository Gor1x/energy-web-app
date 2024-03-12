import {Box, IconButton, Tab, Tabs, useTheme} from "@mui/material";
import Sidebar from "./Sidebar";
import AlgorithmTabContent from "./TabContent/AlgorithmTabContent";
import ChartTabContent from "./TabContent/ChartTabContent";
import DatasetTabContent from "./TabContent/DatasetTabContent";
import useTabs from "./hooks/useTabs";
import CloseIcon from '@mui/icons-material/Close';
import {getNameWithExtension} from "../../utils/getFileLabel";
import * as React from 'react'
import {FileObject} from "../../types/FileObject";

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
    const {children, value, index, ...other} = props;

    return (
        <div
            hidden={value !== index}
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {children}
        </div>
    );
}

const Dashboard = () => {
    const theme = useTheme();
    const {tabs, openTab, closeTab, closeTabByFile, activeTab, selectTab} = useTabs();

    const renderTab = (file: FileObject) => {
        switch (file.type) {
            case 'chart' :
                return <ChartTabContent file={file}/>
            case 'algorithm':
                return <AlgorithmTabContent file={file}/>
            case 'dataset':
                return <DatasetTabContent file={file}/>
        }
    };

    return (
        <Box style={{
            "width": "100%",
            "height": "100%"
        }}>
            <Box style={{
                "display": "flex",
                "width": "100%",
                "height": "100%"
            }}>
                <Box sx={{width: '200px'}}>
                    <Sidebar height="100%"
                             width="100%"
                             onSelect={openTab}
                             closeTabByFile={closeTabByFile}/>
                </Box>
                <Box
                    height="100%"
                    width="calc(100% - 200px)">
                    <Box height='50px'>
                        <Tabs
                            value={activeTab}
                            onChange={(_, i) => selectTab(i)}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="scrollable prevent tabs example">
                            {tabs.map((file, index) =>
                                    <Tab
                                        key={`tab-${index}`}
                                        id={`simple-tab-${index}`}
                                        aria-controls={`simple-tabpanel-${index}`}
                                        label={
                                            <span>
                      {getNameWithExtension(file)}
                                                <IconButton size="small" component="span" onClick={(e) => {
                                                    e.stopPropagation()
                                                    closeTab(index)
                                                }}>
                        <CloseIcon fontSize="inherit"/>
                      </IconButton>
                    </span>
                                        }
                                    />
                            )}
                        </Tabs>
                    </Box>
                    <Box height='calc(100% - 50px)' width="available">
                        {tabs.map((file, i) =>
                            (<TabPanel style={{height: '100%', width:"available"}} key={`tab-panel-${i}`} dir={theme.direction}
                                       value={activeTab} index={i}>
                                {renderTab(file)}
                            </TabPanel>)
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;


