import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { React, useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChartsPage from './pages/ChartsPage';
import AlgorithmsPage from './pages/AlgorithmsPage';

const App = () => {
    return (
        <div className="app">
            <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}>
                <TabList>
                    <Tab> Graphs </Tab>
                    <Tab> Algorithm loading </Tab>
                </TabList>
                <TabPanel> <ChartsPage/> </TabPanel>
                <TabPanel> <AlgorithmsPage/> </TabPanel>
            </Tabs>
        </div>
    )
}

export default App;