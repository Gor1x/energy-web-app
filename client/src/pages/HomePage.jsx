import { React, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChartsPage from './ChartsPage';
import AlgorithmsPage from './AlgorithmsPage';
import DatasetsPage from './DatasetsPage';
import MapPage from './MapPage';
import { useAuth } from '../auth'

const HomePage = () => {
    return (
        <div>
            <Tabs defaultIndex={3} onSelect={(index) => console.log(index)}>
                <div>
                    <TabList>
                        <Tab> Графики </Tab>
                        <Tab> Загрузка алгоритма </Tab>
                        <Tab> Загрузка датасета </Tab>
                        <Tab> Карта </Tab>
                    </TabList>
                </div>
                <TabPanel> <ChartsPage /> </TabPanel>
                <TabPanel> <AlgorithmsPage /> </TabPanel>
                <TabPanel> <DatasetsPage /> </TabPanel>
                <TabPanel> <MapPage /> </TabPanel>
            </Tabs>
        </div>
    );
}

export default HomePage;