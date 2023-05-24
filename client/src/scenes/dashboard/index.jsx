import { useState } from "react";
import { Box, IconButton, useTheme, Tabs, Tab } from "@mui/material";
import Split from 'react-split'
import Sidebar from "./Sidebar";
import AlgorithmTabContent from "./TabContent/AlgorithmTabContent";
import DatasetTabContent from "./TabContent/DatasetTabContent";
import { tokens } from "../../theme";
import useTabs from "./hooks/useTabs";
import CloseIcon from '@mui/icons-material/Close';
import { getFileLabel } from "../../utils/getFileLabel";

function TabPanel(props) {
  const { children, id, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${id}`}
      aria-labelledby={`simple-tab-${id}`}
      {...other}
    >
      {children}
    </div>
  );
}

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { tabs, openTab, closeTab, activeTab, selectTab } = useTabs();

  const renderTab = (file) => {
    switch (file.type) {
      case 'algorithm':
        return <AlgorithmTabContent file={file}/>
        break;
      case 'dataset':
        return <DatasetTabContent file={file}/>
        break;
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
        <Sidebar height="100%"
          width="15%"
          onSelect={file => openTab(file)}/>
        <Box height="100%"
          width="85%">
          <Tabs
            value={activeTab}
            onChange={(e, i) => selectTab(i)}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example">
            {tabs.map((file, i) => 
              <Tab 
                key={`tab-${i}`} 
                label={
                  <span> 
                      {getFileLabel(file)}
                      <IconButton size="small" component="span" onClick={(e) => { 
                        e.stopPropagation()
                        closeTab(i) 
                        }}>
                          <CloseIcon fontSize="inherit"/>
                      </IconButton>
                  </span>
                }
              />
            )}
          </Tabs>
          <Box>
            {tabs.map((file, i) =>
              (activeTab === i && 
              <TabPanel key={`tab-panel-${file.id}`} dir={theme.direction} id={file.id}>
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


