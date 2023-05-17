import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { authFetch } from '../auth';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

const TableCSV = (props) => {
    const [page, setPage] = useState(1)
    const [table, setTable] = useState({
        data: [],
        columns: []
    })

    useEffect(() => {
        const from = (page - 1) * props.sizePerPage
        let to = from + props.sizePerPage
        if (to >= props.totalSize) {
            to = props.totalSize
        }

        authFetch(`/${props.url}?from=${from}&to=${to}`)
            .then(response => response.json())
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
            });
    }, [page])


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
        onPageChange: function (page, _) {
            setPage(page)
        }
    });
    return (
        table.data.length != 0 &&
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