import { React, useEffect, useState } from 'react';
import { authFetch } from '../auth';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const FileList = (props) => {
    const [algorithms, setAlgorithms] = useState([])
    const [datasets, setDatasets] = useState([])

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
            const requestOptions = {
                method: 'POST',
                body: data
            };

            authFetch('/algorithms', requestOptions)
                .then(response => response.json())
                .then(algorithm => {
                    setAlgorithms([...algorithms, algorithm[0]])
                });
        }
    }

    const onClick = (algorithm) => {
        algorithms.splice(algorithms.indexOf(algorithm), 1)
        setAlgorithms([...algorithms])

        const requestOptions = {
            method: 'DELETE'
        };
        authFetch(`/algorithms/${algorithm.id}`, requestOptions)
    }

    useEffect(() => {
        authFetch('/algorithms/')
            .then(response => response.json())
            .then(algorithms => {
                setAlgorithms(algorithms.map(algorithm => algorithm));
            });
    }, []);
    useEffect(() => {
        authFetch('/datasets/',)
            .then(response => response.json())
            .then(datasets => {
                setDatasets(datasets.map(dataset => dataset));
            });
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Загрузка алгоритма</Modal.Title>
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
                        Алгоритмы
                    </p>
                    <Button className='file-button'
                        variant="outline-primary"
                        onClick={handleShow}>
                        <i class="bi bi-file-plus" aria-hidden="true"></i>
                    </Button>
                </div>
                <ListGroup variant="flush">
                    {algorithms.map((algorithm, i) =>
                        <ListGroup.Item
                            action
                            href={`#algorithm_${i}`}
                            onClick={() => props.onSelect({
                                file_name: algorithm.name,
                                file_id: algorithm.id,
                                file_type: 'algorithm'
                            })}>
                            <div className='file-container'>
                                <p className="file-name fw-normal">
                                    {algorithm.name}
                                </p>
                                <Button className='file-button'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onClick(algorithm)
                                    }}
                                    variant="outline-dark">
                                    <i class="bi bi-x" aria-hidden="true"></i>
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
            <div>
                <div className='folder-title'>
                    <p className="file-name fw-normal">
                        Датасеты
                    </p>
                </div>
                <ListGroup variant="flush">
                    {datasets.map((dataset, i) =>
                        <ListGroup.Item
                            action
                            href={`#dataset_${i}`}
                            onClick={() => props.onSelect({
                                file_name: dataset.name,
                                file_id: dataset.id,
                                file_type: 'dataset'
                            })}>
                            <div className='file-container'>
                                <p className="file-name fw-normal">
                                    {dataset.name}
                                </p>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </div>
    );
}

export default FileList;