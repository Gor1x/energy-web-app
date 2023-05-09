import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';


const FileTab = (props) => {
    return (
        <div>{`${props.file.file_type} ${props.file.file_id}`}</div>
    );
}

export default FileTab;