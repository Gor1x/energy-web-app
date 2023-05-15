import { useState } from "react";
import { Box, Typography, useTheme, Tabs, Tab } from "@mui/material";
import Split from 'react-split'
import Sidebar from "./Sidebar";
import TabContent from "./TabContent";
import { tokens } from "../../theme";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [tabs, setTabs] = useState([]);

  return (
    <Box style={{
        "width": "100%",
        "height": "100%"
      }}>
      <Split style={{
          "display": "flex",
          "width": "100%",
          "height": "100%"
        }}
        direction='horizontal'
        sizes={[20, 80]}
        minSize={[200, 1000]}
        expandToMin
        gutterSize={5}
        cursor="col-resize">
        <Sidebar onSelect={file => {
          const id = tabs.indexOf(file)
          if (id == -1) {
            setTabs([...tabs, file])
            setValue(tabs.length)
          } else {
            setValue(id)
          }
        }}/>
        <Box height="100%">
          {/*<AppBar position="static">*/}
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            {tabs.map(file => <Tab label={file.name} />)}
          </Tabs>
          {/*</AppBar>*/}
          <Box>
            {tabs.map((file, i) =>
              <TabPanel value={value} index={i} dir={theme.direction}>
                <TabContent file={file}/>
              </TabPanel>
            )}
          </Box>
        </Box>
      </Split>
    </Box>
  );
};

export default Dashboard;
