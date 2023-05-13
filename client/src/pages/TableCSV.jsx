import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { React, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { authFetch } from '../auth';

const TableCSV = (props) => {
    const [table, setTable] = useState(props.table)

    console.log(props)

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        sizePerPageList: [],
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            authFetch(`/${props.url}/${page*sizePerPage}/${sizePerPage}`)
            .then(response => response.json())
            .then(data => {
                setTable(data.map(line => line));
            });
        }
    });
    return (
        <BootstrapTable bootstrap4
                        keyField='id' 
                        data={table.data} 
                        columns={table.columns} 
                        pagination={pagination}/>
    );
}

export default TableCSV;