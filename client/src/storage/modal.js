import {Modal} from "@mui/material"


export function modal(store) {
    store.on('@init', () => ({modal: null}))

    store.on('modal/open', (_, children) => {
        return {
            modal: <Modal
                open
                onClose={() => store.dispatch('modal/close')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                {children}
            </Modal>
        }
    })

    store.on('modal/close', (_) => {
        return {modal: null}
    })
}