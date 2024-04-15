import React, { useState } from 'react';
import { Box } from "@mui/material";
import TableCSV from '../../../components/TableCSV';
import Card from '../../../components/Card';
import { getNameWithExtension } from '../../../utils/getFileLabel';
import Run from './Run';
import { useStoreon } from 'storeon/react';
import { DatasetTabHeader } from "./DatasetTabHeader";
import { FileObject } from "../../../types/FileObject";
import { ChartCard, RunCard, TableCard } from "../../../types/CardsType";

const DatasetTabContent = (props: { file: FileObject, onSelectChart: (file: FileObject) => void }) => {
    const { file } = props;
    const [entries, setEntries] = useState<number>(10);
    const tableCard: RunCard | ChartCard | TableCard = {
        type: "TableCard",
        props: {
            sizePerPage: entries,
            totalSize: file.num_rows,
            url: `datasets/data/${file.id}`
        }
    };
    let itemsState: (RunCard | ChartCard | TableCard)[] = [tableCard]
    const [items, setItems] = useState(itemsState)
    const { dispatch } = useStoreon('modal');

    const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEntries = parseInt(event.target.value, 10);
        setEntries(selectedEntries);
        closeCardHandler(0)
        if (tableCard) {
            if (tableCard.props) {
                tableCard.props.sizePerPage = selectedEntries;
            }
        }
        openTableCardHandler()
    };

    const openRunCardHandler = (algorithm: FileObject) => {
        const runCard: RunCard = {
            type: "RunCard",
            props: {
                title: `Результат запуска ${getNameWithExtension(algorithm)}`,
                algorithm_id: algorithm.id,
                dataset_id: file.id
            }
        };
        if (!items.find((item) => JSON.stringify(item) === JSON.stringify(runCard))) {
            setItems([...items, runCard]);
        } else {
            alert("Уже открыто")
        }
    }

    const openTableCardHandler = () => {
        if (!items.find((item) => JSON.stringify(item) === JSON.stringify(tableCard))) {
            setItems(() => {
                let updated = Object.assign([], items);
                updated.splice(0, 0, tableCard)
                return updated
            })
        } else {
            alert("Уже открыто")
        }
    }

    const closeCardHandler = (i: number) => {
        setItems(() => {
            let updated = Object.assign([], items);
            updated.splice(i, 1)
            return updated
        })
    };
    return (
        <Box height='100%' width='100%'>
            {/* TOOLBAR */}
            <DatasetTabHeader
               openSelectChartTab={props.onSelectChart}
                file={file}
                modalCloseDispatch={() => {
                    dispatch('modal/close')
                }}
                modalOpenDispatch={(modal) => {
                    dispatch('modal/open', modal)
                }}
                openRunCardHandler={openRunCardHandler}
                openTableCardHandler={openTableCardHandler}
            />
            {/*<label>Show</label>
            <select name="length" id="length-select" value={entries} onChange={handleEntriesChange}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            <label> entries</label>*/}
            {/* GRID & CHARTS */}
            <Box
                sx={{overflowY: 'scroll'}}
                height="100%"
                width="100%"
                paddingLeft="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap="20px">
                {items.map((item, i) => {
                    switch (item.type) {
                        case 'TableCard': {
                            let tableCard : TableCard = {
                                type: item.type,
                                props: {
                                    // @ts-ignore
                                    sizePerPage: item.props?.sizePerPage,
                                    // @ts-ignore
                                    totalSize: item.props?.totalSize,
                                    // @ts-ignore
                                    url: item.props?.url
                                }
                            }
                            return (
                                <Card key={`card-${i}`} rows={'4'} columns={'6'} onClose={() => closeCardHandler(i)}>
                                    <TableCSV {...tableCard} />
                                </Card>
                            )
                        }
                    case 'RunCard':
                            let runCard: RunCard = {
                                type: item.type,
                                props: {
                                    // @ts-ignore
                                    title: item.props?.title,
                                    // @ts-ignore
                                    algorithm_id: item.props?.algorithm_id,
                                    // @ts-ignore
                                    dataset_id: item.props?.dataset_id
                                }
                            }
                            return (
                                <Card key={`card-${i}`} rows={'1'} columns={'6'} onClose={() => closeCardHandler(i)}>
                                    <Run {...runCard} />
                                </Card>
                            )
                    }

                })}
            </Box>
        </Box>
    )
};

export default DatasetTabContent;