import { React, useEffect, useState } from 'react';
import { authFetch } from '../auth';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';

const FileList = (props) => {
    const [listitems, setlistitems] = useState([])

    const urlBench = props.urlBenchName

    const [code, setCode] = useState("")
    const uploadFile = (event) => {
        let file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                setCode(e.target.result);
            };
            reader.readAsBinaryString(file);

            let data = new FormData();
            data.append('file', file);

            authFetch(`/${urlBench}`, {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(listitem => {
                    setlistitems([...listitems, listitem[0]])
                });
        }
    }

    const onClick = (listitem) => {
        listitems.splice(listitems.indexOf(listitem), 1)
        setlistitems([...listitems])

        const requestOptions = {
            method: 'DELETE'
        };
        authFetch(`/${urlBench}/${listitem.id}`, requestOptions)
    }

    useEffect(() => {
        authFetch(`/${urlBench}/`)
            .then(response => response.json())
            .then(listitems => {
                setlistitems(listitems.map(listitem => listitem));
            });
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>props.modalTitle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file"
                        name="myFile"
                        onChange={uploadFile} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    {/*<Button variant="primary" onClick={handleClose}>
                        Сохранить
                    </Button>*/}
                </Modal.Footer>
            </Modal>
            <div style={{ 'marginBottom': '10px' }}>
                <div className='folder-title'>
                    <p className="file-name fw-normal">
                        {props.listName}
                    </p>
                    <Button className='file-button'
                        variant="outline-primary"
                        onClick={handleShow}>
                        <i className="bi bi-file-plus" aria-hidden="true"></i>
                    </Button>
                </div>
                <ListGroup variant="flush">
                    {listitems.map((listitem, i) =>
                        <ListGroup.Item
                            action
                            //href={`#${props.fileType}_${i}`}
                            onClick={() => props.onSelect({
                                ...listitem,
                                file_type: props.fileType
                            })}>
                            <div className='file-container'>
                                <p className="file-name fw-normal">
                                    {listitem.name + listitem.id}
                                </p>
                                <Button className='file-button'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onClick(listitem)
                                    }}
                                    variant="outline-dark">
                                    <i className="bi bi-x" aria-hidden="true"></i>
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </div>
    );
}

export default FileList;