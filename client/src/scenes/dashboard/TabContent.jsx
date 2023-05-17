import {React, useState, useEffect, useCallback} from 'react'
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import TableCSV from '../../components/TableCSV';
import CodeEditor from "../../components/CodeEditor";
import Line from "../../components/Line";

const TabContent = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { file } = props;

    const Item = ({ children, columns, rows }) =>
        <Box sx={{ boxShadow: 4 }}
            backgroundColor={colors.primary[400]}
            gridColumn={`span ${columns}`}
            gridRow={`span ${rows}`}>
            {children}
        </Box>

    const AlgorithmTabContent = ({ }) => <>
        <Item rows={5} columns={6}>
            <CodeEditor file={file} />
        </Item>
        <Item rows={3} columns={6} />
        <Item rows={2} columns={6} />
    </>

    const DatasetTabContent = ({ }) => {
        const [config, setConfig] = useState({
                "title": "Total Open Source vs Enterprise Repos",
                "type": "Line",
                "height": "400px",
                "width": "100%",
                "xAxis": "date",
                "yAxes": ["os_repo_count", "ep_repo_count"],
                "yNames": ["Total Open Source Repos", "Total Enterprise Repos"],
                "endpoint": "/api/data/amount_of_repos",
                "data": [
                    {
                        "os_repo_count": 800,
                        "ep_repo_count":300,
                        "date": "8/18"
                    },
                    {
                        "os_repo_count": 1000,
                        "ep_repo_count": 488,
                        "date": "9/18"
                    },
                    {
                        "os_repo_count": 1008,
                        "ep_repo_count": 500,
                        "date": "10/18"
                    },
                    {
                        "os_repo_count": 1026,
                        "ep_repo_count": 626,
                        "date": "11/18"
                    },
                    {
                        "os_repo_count": 1100,
                        "ep_repo_count": 808,
                        "date": "12/18"
                    },
                    {
                        "os_repo_count": 1118,
                        "ep_repo_count": 811,
                        "date": "02/19" 
                    },
                    {
                        "os_repo_count": 1200,
                        "ep_repo_count": 822,
                        "date": "03/19"
                    },
                    {
                        "os_repo_count": 1288,
                        "ep_repo_count": 1100,
                        "date": "04/19"
                    },
                    {
                        "os_repo_count": 1300,
                        "ep_repo_count": 1200,
                        "date": "05/19"
                    },
                    {
                        "os_repo_count": 1322,
                        "ep_repo_count": 1400,
                        "date": "06/19"
                    },
                    {
                        "os_repo_count": 1400,
                        "ep_repo_count": 1600,
                        "date": "07/19"
                    },
                    {
                        "os_repo_count": 1411,
                        "ep_repo_count": 1998,
                        "date": "08/19"
                    }
                ]
            });

        const [resize, setResize] = useState(false)
        const [timer, setTimer] = useState(0)

        const triggerResize = useCallback(() => {
            if (timer) {
                window.cancelAnimationFrame(timer);
            }
            // Debounce the window resize event
            setTimer(window.requestAnimationFrame(function () {
                setResize(true)
                setTimeout(() => {
                    setResize(false)
                }, 0)
            }));

        }, [setResize, timer])

        useEffect(() => {
            window.addEventListener('resize', triggerResize, { passive: true })
            return () => {
                window.removeEventListener('resize', triggerResize, { passive: true })
            }
            // eslint-disable-next-line
        }, [])

        return (<>
            <Item
                columns={6}
                rows={4}
                backgroundColor={colors.primary[400]}>
                <TableCSV
                    sizePerPage={7}
                    totalSize={file.num_rows}
                    url={`datasets/data/${file.id}`} />
            </Item>
            <Item rows={4} columns={6}>
                <div>
                    <Line config={config} key={0} resize={resize}/>
                </div>
            </Item>
        </>)
    };

    return (
        <Box>
            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="80px"
                gap="20px"
            >
                {file.type == "algorithm" ? <AlgorithmTabContent /> : <DatasetTabContent />}
            </Box>
        </Box>
    );
};

export default TabContent;