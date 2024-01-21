import {useState} from "react";
import {FileObject} from "../../../types/FileObject";


const useTabs = () => {
    const [activeTab, setActiveTab] = useState(-1);
    const [tabs, setTabs] = useState<FileObject[]>([]);

    const openTab = (file: FileObject) => {
        const id = tabs.indexOf(file)
        if (id == -1) {
            setTabs([...tabs, file])
            setActiveTab(tabs.length)
        } else {
            setActiveTab(id)
        }
    };

    const closeTab = (tab: number) => {
        tabs.splice(tab, 1)
        setTabs([...tabs])
        setActiveTab(Math.min(activeTab, tabs.length - 1))
    };

    const closeTabByFile = (file: FileObject) => {
        const tab = tabs.indexOf(file)
        if (tab !== -1) {
            closeTab(tab)
        }
    };

    return {tabs, openTab, closeTab, closeTabByFile, activeTab, selectTab: setActiveTab};
}
export default useTabs;