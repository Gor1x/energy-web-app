export const getNameWithExtension = (file) => {
    switch (file.type) {
        case 'algorithm':
            return `${file.name}.py`;
        case 'dataset':
            return `${file.name}.csv`;
    }
}