import { React, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChartsPage from './pages/ChartsPage';
import AlgorithmsPage from './pages/AlgorithmsPage';

const App = () => {
    return (
        <div className="app">
            <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}>
                <div>
                    <img src="icsenergy-logo.png"/>
                    <TabList>
                        <Tab> Graphs </Tab>
                        <Tab> Algorithm loading </Tab>
                    </TabList>
                </div>
                <TabPanel> <ChartsPage /> </TabPanel>
                <TabPanel> <AlgorithmsPage /> </TabPanel>
            </Tabs>
        </div>
    )
}

export default App;