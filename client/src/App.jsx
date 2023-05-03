import { React, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChartsPage from './pages/ChartsPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import DatasetsPage from './pages/DatasetsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <div className="app">
            <Tabs defaultIndex={3} onSelect={(index) => console.log(index)}>
                <div>
                    <img src="icsenergy-logo.png"/>
                    <TabList>
                        <Tab> Графики </Tab>
                        <Tab> Загрузка алгоритма </Tab>
                        <Tab> Загрузка датасета </Tab>
                        <Tab> Зарегистрироваться </Tab>
                        <Tab> Вход </Tab>
                    </TabList>
                </div>
                <TabPanel> <ChartsPage /> </TabPanel>
                <TabPanel> <AlgorithmsPage /> </TabPanel>
                <TabPanel> <DatasetsPage /> </TabPanel>
                <TabPanel> <SignUpPage /> </TabPanel>
                <TabPanel> <LoginPage /> </TabPanel>
            </Tabs>
        </div>
    )
}

export default App;