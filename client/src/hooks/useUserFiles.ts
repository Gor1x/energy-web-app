import {useEffect, useState} from "react";
import {authFetch} from '../auth';
import {FileObject} from "../types/FileObject";


const useUserFiles = () => {
    let initStateAlgorithms: FileObject[] = []
    let initStateDatasets: FileObject[] = []

    const [userFiles, setUserFiles] = useState({
        algorithms: initStateAlgorithms,
        datasets: initStateDatasets
    })

    useEffect(() => {
        Promise.all([
            authFetch(`/algorithms/`)
                .then(response => response.json()),
            authFetch(`/datasets/`)
                .then(response => response.json()),
        ]).then((values) =>
            setUserFiles({
                algorithms: values[0].map((entry: FileObject) => ({...entry, type: "algorithm"})),
                datasets: values[1].map((entry: FileObject) => ({...entry, type: "dataset"}))
            })
        )
    }, []);

    const uploadFile = (file: string, type: string) => {
        if (file) {
            let data = new FormData();
            data.append('file', file);
            const requestOptions = {
                method: 'POST',
                body: data
            };
            let it = Object.assign({}, userFiles)
            switch (type) {
                case 'algorithm':
                    authFetch("/algorithms", requestOptions)
                        .then(response => response.json())
                        .then(newItem => {
                            let entry = newItem[0]
                            it['algorithms'] = [...it['algorithms'], {...entry, type: "algorithm"}]
                            setUserFiles(it)
                        });
                    break;
                case 'dataset':
                    authFetch("/datasets", requestOptions)
                        .then(response => response.json())
                        .then(newItem => {
                            let entry = newItem[0]
                            it['datasets'] = [...it['datasets'], {...entry, type: "dataset"}]
                            setUserFiles(it)
                        });
                    break;
            }
        }
    };

    const deleteFile = (file: FileObject) => {
        let it = Object.assign({}, userFiles)
        const requestOptions = {
            method: 'DELETE'
        };
        switch (file.type) {
            case 'algorithm':
                authFetch(`/algorithms/${file.id}`, requestOptions)
                    .then(response => {
                        if (response.status == 200) {
                            it['algorithms'].splice(it['algorithms'].indexOf(file), 1)
                            setUserFiles(it)
                        }
                    })
            case 'dataset':
                authFetch(`/datasets/${file.id}`, requestOptions)
                    .then(response => {
                        if (response.status == 200) {
                            it['datasets'].splice(it['datasets'].indexOf(file), 1)
                            setUserFiles(it)
                        }
                    })
        }
    };

    return {userFiles, uploadFile, deleteFile};
}
export default useUserFiles;