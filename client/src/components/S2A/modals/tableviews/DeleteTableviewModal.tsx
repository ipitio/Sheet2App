import { useDispatch, useSelector } from 'react-redux';

import store, { finishDeletion, StoreState } from '../../../../store/StoreContext';
import { ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Modal } from '@mui/material';
import { deleteTableview, viewTableviews } from '../../../../store/StoreController';

function DeleteTableviewModal() {
    const dispatch = useDispatch<typeof store.dispatch>();

    /* Redux hooks into store. */
    const currentTableviewToDelete = useSelector((state: StoreState) => state.S2AReducer.currentTableviewToDelete);
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels deletion. */
    const handleCloseModal = () => {
        dispatch(finishDeletion());
    }

    /* If the user confirms deletion. */
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentTableviewToDelete) {
            dispatch(deleteTableview())
            .then(() => {
                dispatch(viewTableviews());
            });
            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.DeleteTableviewModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>
                Delete {currentTableviewToDelete?.name} Table View?

                {/* Confirm/Cancel Buttons */}
                <Button onClick={handleDelete} variant="outlined" size="large" sx={styles.modalButton}>Confirm</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
        </Modal>
    );
}

export default DeleteTableviewModal;