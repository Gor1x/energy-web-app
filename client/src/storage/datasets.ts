import {authFetch} from "../auth"
import {StorageTypes} from "../types/StorageTypes";

export function datasets(store: Storage) {
    store.on('@init', () => ({datasets: []}))

    store.on('datasets/set', (_: any, datasets: StorageTypes[]) => {
        return {datasets: datasets}
    })

    store.on('datasets/add', async ({datasets} : {datasets: StorageTypes[]}, file: string) => {
        if (file) {
            let data = new FormData();
            data.append('file', file);
            const requestOptions = {
                method: 'POST',
                body: data
            };
            await authFetch("/datasets/", requestOptions)
                .then(response => response.json())
                .then(newItem => {
                    let entry = newItem[0];
                    return store.dispatch('datasets/set', [...datasets, {...entry, type: "dataset"}])
                })
        } else {
            return datasets
        }
    })

    store.on('datasets/delete', async ({datasets}: {datasets: StorageTypes[]}, dataset: StorageTypes) => {
        const requestOptions = {
            method: 'DELETE'
        };
        await authFetch(`/datasets/${dataset.id}`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    datasets.splice(datasets.indexOf(dataset), 1);
                    return store.dispatch('datasets/set', datasets)
                } else {
                    return datasets
                }
            })
    })

    store.on('datasets/load', async (_: any) => {
        let datasets = await authFetch(`/datasets/`)
            .then(response => response.json())
            .then(values => values.map((entry: any) => ({...entry, type: 'dataset'})));
        store.dispatch('datasets/set', datasets)
    })
}