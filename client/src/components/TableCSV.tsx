import {useEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {authFetch} from '../auth';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import LoadingSpinner from './LoadingSpinner';
import React from 'react';
import {TableCard} from "../types/CardsType";
import {ColumnsType, Table} from "../types/Table";

export const TableCSV = (card: TableCard) => {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0)
    let t :Table = {data: [], columns: []}
    const [table, setTable] = useState(t)
    const updatePage = (page: number) => {
        setIsLoading(true);
        setPage(page)
        const from = (page - 1) * card.props.sizePerPage + 1;
        let to = from + card.props.sizePerPage;
        if (to >= card.props.totalSize) {
            to = card.props.totalSize
        }
        authFetch(`/${card.props.url}?` + new URLSearchParams({from: from.toString(), to: to.toString()})).then(response => response.json())
            .then(data_ => {
                const data = data_.map((line: string) => line);
                const column: ColumnsType[] = []
                for (const [key, _] of Object.entries(data[0])) {
                    column.push({
                        dataField: key,
                        text: key
                    })
                }
                let t :Table = {data: data, columns: column}
                setTable(t)
                setIsLoading(false);
            });

    };

    useEffect(() => {
        updatePage(1);
    }, [])

    const pagination = paginationFactory({
        pageStartIndex: 1,
        page: page,
        sizePerPage: card.props.sizePerPage,
        totalSize: card.props.totalSize,
        sizePerPageList: [],
        nextPageText: '>',
        prePageText: '<',
        alwaysShowAllBtns: true,
        withFirstAndLast: false,
        onPageChange: (page: number, _: any) => updatePage(page)
    });
    return (
        isLoading  ? <LoadingSpinner/>
            :  <BootstrapTable
                bootstrap4
                keyField='Unnamed: 0'
                data={table.data}
                columns={table.columns}
                pagination={pagination}
                remote
                onTableChange={() => {}}
                striped
                bordered
                hover
                //responsive
            />
    );
}

export default TableCSV;