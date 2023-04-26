import { useDispatch, useSelector } from 'react-redux';

import store, { finishDeletion, StoreState } from '../../../../store/StoreContext';
import { ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Modal } from '@mui/material';
import { deleteDetailview, viewDetailviews } from '../../../../store/StoreController';

function DeleteDetailviewModal() {
    const dispatch = useDispatch<typeof store.dispatch>();

    /* Redux hooks into store. */
    const currentDetailviewToDelete = useSelector((state: StoreState) => state.S2AReducer.currentDetailviewToDelete);
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels deletion. */
    const handleCloseModal = () => {
        dispatch(finishDeletion());
    }

    /* If the user confirms deletion. */
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentDetailviewToDelete) {
            dispatch(deleteDetailview());
            dispatch(viewDetailviews());
            handleCloseModal();
        }
    }
    
    return (
        <Modal open={currentModalType == ModalType.DeleteDetailviewModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>
                Delete {currentDetailviewToDelete?.name} Detailview?

                {/* Confirm/Cancel Buttons */}
                <Button onClick={handleDelete} variant="outlined" size="large" sx={styles.modalButton}>Confirm</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
        </Modal>
    );
}

export default DeleteDetailviewModal;