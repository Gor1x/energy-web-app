import { authFetch } from "../auth"

export function datasets(store) {
    store.on('@init', () => ({ datasets: [] }))

    store.on('datasets/set', (_, datasets) => {
        return { datasets: datasets }
    })  

    store.on('datasets/add', async ({ datasets }, file) => {
        if (file) {
            let data = new FormData();
            data.append('file', file);
            const requestOptions = {
                method: 'POST',
                body: data
            };
            await authFetch("/datasets", requestOptions)
            .then(response => response.json())
            .then(newItem => {
                let entry = newItem[0];
                return store.dispatch('datasets/set', [...datasets, { ...entry, type: "dataset" }])
            })
        } else {
            return datasets
        }
    })

    store.on('datasets/delete', async ({ datasets }, dataset) =>  {
        const requestOptions = {
            method: 'DELETE'
        };
        await authFetch(`/datasets/${dataset.id}`, requestOptions)
        .then(response => {
            if (response.status == 200) {
                datasets.splice(datasets.indexOf(dataset), 1);
                return store.dispatch('datasets/set', datasets)
            } else {
                return datasets
            }
        })
    })

    store.on('datasets/load', async (_) => {
        let datasets = await authFetch(`/datasets/`)
        .then(response => response.json())
        .then(values => values.map(entry => ({ ...entry, type: 'dataset' })));
        store.dispatch('datasets/set', datasets)
    })
}