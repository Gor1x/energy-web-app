import {authFetch} from "../auth"
import {FileObject} from "../types/FileObject";
export function algorithms(store : Storage) {
    store.on('@init', () => ({algorithms: []}))

    store.on('algorithms/set', (_: any, algorithms: FileObject[]) => {
        return {algorithms: algorithms}
    })

    store.on('algorithms/add', async ({algorithms} :{algorithms : FileObject[]}, file: File) => {
        if (file) {
            let data = new FormData();
            data.append('file', file);
            const requestOptions = {
                method: 'POST',
                body: data
            };
            await authFetch("/algorithms/", requestOptions)
                .then(response => response.json())
                .then(newItem => {
                    let entry = newItem[0];
                    return store.dispatch('algorithms/set', [...algorithms, {...entry, type: "algorithm"}])
                })
        } else {
            return algorithms
        }
    })

    store.on('algorithms/delete', async ({algorithms} : {algorithms: FileObject[]}, algorithm: FileObject) => {
        const requestOptions = {
            method: 'DELETE'
        };
        await authFetch(`/algorithms/${algorithm.id}`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    algorithms.splice(algorithms.indexOf(algorithm), 1);
                    return store.dispatch('algorithms/set', algorithms)
                } else {
                    return algorithms
                }
            })
    })

    store.on('algorithms/load', async (_: any) => {
        let algorithms = await authFetch(`/algorithms/`)
            .then(response => response.json())
            .then(values => store.dispatch('algorithms/set', values.map((entry: any) => ({...entry, type: 'algorithm'}))))
    })
}