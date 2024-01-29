import {FileObject} from "../types/FileObject";

export const getNameWithExtension = (file: FileObject) => {
    switch (file.type) {
        case 'algorithm':
            return `${file.name}.py`;
        case 'dataset':
            return `${file.name}.csv`;
    }
    return `${file.name}`;
}