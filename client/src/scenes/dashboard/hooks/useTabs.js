import { useState, useEffect } from "react";
import { authFetch } from '../../../auth';


const useTabs = () => {
    const [activeTab, setActiveTab] = useState(-1);
    const [tabs, setTabs] = useState([]);

    const selectTab = (tab) => {
        setActiveTab(tab)
    };

    const openTab = (file) => {
        const id = tabs.indexOf(file)
        if (id == -1) {
            setTabs([...tabs, file])
            setActiveTab(tabs.length)
        } else {
            setActiveTab(id)
        }
    };

    const closeTab = (tab) => {
        tabs.splice(tab, 1)
        setTabs([...tabs])
        setActiveTab(Math.min(activeTab, tabs.length - 1))
    };

    const closeTabByFile = (file) => {
        const tab = tabs.indexOf(file)
        if (tab != -1) {
            closeTab(tab)
        }
    };

    return { tabs, openTab, closeTab, closeTabByFile, activeTab, selectTab };
}
export default useTabs;