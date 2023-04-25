import { useDispatch, useSelector } from 'react-redux';

import store, { deleteDatasource, finishDeletion, StoreState } from '../../../../store/StoreContext';
import { ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Modal } from '@mui/material';
import { viewDatasources } from '../../../../store/StoreController';


function DeleteDatasourceModal() {
    const dispatch = useDispatch<typeof store.dispatch>();

    /* Redux hooks into store. */
    const currentDatasourceToDelete = useSelector((state: StoreState) => state.S2AReducer.currentDatasourceToDelete);
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels deletion. */
    const handleCloseModal = () => {
        dispatch(finishDeletion());
    }

    /* If the user confirms deletion. */
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentDatasourceToDelete) {
            dispatch(deleteDatasource());
            dispatch(viewDatasources());
            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.DeleteDatasourceModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>
                Delete {currentDatasourceToDelete?.name} App?

                {/* Confirm/Cancel Buttons */}
                <Button onClick={handleDelete} variant="outlined" size="large" sx={styles.modalButton}>Confirm</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
        </Modal>
    );
}

export default DeleteDatasourceModal;