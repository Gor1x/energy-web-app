import { Box, IconButton, useTheme, Tabs, Tab } from "@mui/material";
import Sidebar from "./Sidebar";
import AlgorithmTabContent from "./TabContent/AlgorithmTabContent";
import DatasetTabContent from "./TabContent/DatasetTabContent";
import { tokens } from "../../theme";
import useTabs from "./hooks/useTabs";
import CloseIcon from '@mui/icons-material/Close';
import { getNameWithExtension } from "../../utils/getFileLabel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  const colors = tokens(theme.palette.mode);
  const { tabs, openTab, closeTab, closeTabByFile, activeTab, selectTab } = useTabs();

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
          onSelect={file => openTab(file)}
          closeTabByFile={closeTabByFile}/>
        <Box height="100%"
          width="85%">
          <Tabs
            value={activeTab}
            onChange={(_, i) => selectTab(i)}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example">
            {tabs.map((file, index) => 
              <Tab 
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
          <Box>
            {tabs.map((file, index) =>
              (<TabPanel dir={theme.direction} value={activeTab} index={index}>
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


