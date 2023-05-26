import { useState, useEffect, useCallback } from "react";
import { Modal } from "@mui/material";

const createListenersContainer = () => {
    let listeners = [];
    const subscribe = (listener) => {
        listeners.push(listener);
    };
    const unsubscribe = (listener) => {
        listeners = listeners.filter((l) => l !== listener);
    };
    const notify = () => {
        listeners.forEach((l) => l());
    };
    return { subscribe, unsubscribe, notify };
};

const createModal = () => {
    let modal = null;
    const closeModal = () => {
        modal = null
        listenersContainer.notify();
    };
    const openModal = (children) => {
        modal = <Modal
            open
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            {children}
        </Modal>
        listenersContainer.notify();
    }
    const listenersContainer = createListenersContainer();

    const getModal = () => modal;

    const useModal = createUseModal({
        getModal, listenersContainer
    });

    return {
        useModal,
        openModal,
        closeModal
    };
}

const createUseModal = ({ getModal, listenersContainer }) => {
    return () => {
        const [modal, setModal] = useState(null)

        const updateModal = () => {
            setModal(getModal())
        };

        useEffect(() => {
            updateModal()
        }, []);

        const listener = useCallback(() => {
            updateModal();
        }, []);

        useEffect(() => {
            listenersContainer.subscribe(listener);
            return () => {
                listenersContainer.unsubscribe(listener);
            };
        }, [listener]);

        return { modal };
    }
}

export const { useModal, openModal, closeModal } = createModal()
