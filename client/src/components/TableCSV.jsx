import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { authFetch } from '../auth';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import LoadingSpinner from './LoadingSpinner';

const TableCSV = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null)
    const [table, setTable] = useState({
        data: [],
        columns: []
    })

    const updatePage = (page) => {
        setIsLoading(true);
        setPage(page)

        const from = (page - 1) * props.sizePerPage;
        let to = from + props.sizePerPage;
        if (to >= props.totalSize) {
            to = props.totalSize
        }
        authFetch(`/${props.url}?` + new URLSearchParams({
            from: from,
            to: to,
        })).then(response => response.json())
            .then(data_ => {
                const data = data_.map(line => line);
                const columns = []
                for (const [key, _] of Object.entries(data[0])) {
                    columns.push({
                        dataField: key,
                        text: key
                    })
                }
                setTable({
                    data: data,
                    columns: columns
                })
                setIsLoading(false);
            });
        
    };

    useEffect(() => {
        updatePage(1);
    }, [])

    const pagination = paginationFactory({
        pageStartIndex: 1,
        page: page,
        sizePerPage: props.sizePerPage,
        totalSize: props.totalSize,
        sizePerPageList: [],
        nextPageText: '>',
        prePageText: '<',
        alwaysShowAllBtns: true,
        withFirstAndLast: false,
        onPageChange: (page, _) => updatePage(page)
    });
    return (
        isLoading 
        ? <LoadingSpinner/>
        : table.data.length != 0 &&
            <BootstrapTable
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
                responsive />
    );
}

export default TableCSV;