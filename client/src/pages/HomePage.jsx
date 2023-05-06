import { React, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MyAlgorithmsPage from './MyAlgorithmsPage';
import MyDatasetsPage from './MyDatasetsPage';
import AlgorithmsPage from './AlgorithmsPage';
import DatasetsPage from './DatasetsPage';
import MapPage from './MapPage';

const HomePage = () => {
    return (
        <div>
            <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
                <div>
                    <TabList>
                        <Tab> Карта </Tab>
                        <Tab> Мои алгоритмы </Tab>
                        <Tab> Мои датасеты </Tab>
                        <Tab> Загрузка алгоритма </Tab>
                        <Tab> Загрузка датасета </Tab>
                    </TabList>
                </div>
                <TabPanel> <MapPage /> </TabPanel>
                <TabPanel> <MyAlgorithmsPage /> </TabPanel>
                <TabPanel> <MyDatasetsPage /> </TabPanel>
                <TabPanel> <AlgorithmsPage /> </TabPanel>
                <TabPanel> <DatasetsPage /> </TabPanel>           
            </Tabs>
        </div>
    );
}

export default HomePage;