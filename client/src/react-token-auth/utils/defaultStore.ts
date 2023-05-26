import { IAsyncAuthStorage, IAuthStorage } from '../types';

export const createDefaultStore = (initData = {}): IAuthStorage => {
    const data: any = initData;

    const getItem = (key: string) => {
        return data[key];
    };

    const setItem = (key: string, value: any) => {
        data[key] = value;
        localStorage.setItem(key, value);
    };

    const removeItem = (key: string) => {
        delete data[key];
        localStorage.removeItem(key);
    };

    return { getItem, setItem, removeItem };
};

export const createDefaultAsyncStore = (initData = {}): IAsyncAuthStorage => {
    const data: any = initData;

    const getItem = async (key: string) => {
        return data[key];
    };

    const setItem = async (key: string, value: any) => {
        data[key] = value;
        localStorage.setItem(key, value);
    };

    const removeItem = async (key: string) => {
        delete data[key];
        localStorage.removeItem(key);
    };

    return { getItem, setItem, removeItem };
};
