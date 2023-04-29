import { useDispatch, useSelector } from 'react-redux';

import store, { StoreState, finishUnpublish } from '../../../../store/StoreContext';
import { ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Modal, Typography, Box } from '@mui/material';
import { viewAccApps, unpublishApp } from '../../../../store/StoreController';

function UnpublishAppModal() {
    const dispatch = useDispatch<typeof store.dispatch>();

    /* Redux hooks into store. */
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);
    const currentAppToUnpublish = useSelector((state: StoreState) => state.S2AReducer.currentAppToUnpublish);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels unpublishment.*/
    const handleCloseModal = () => {
        dispatch(finishUnpublish());
    }

    /* If the user confirms unpublishment, unpublish the app. */
    const handleUnpublish = () => {
        if (currentAppToUnpublish) {
            dispatch(unpublishApp({ ...currentAppToUnpublish, isPublished: false }))
                .then(() => {
                    dispatch(viewAccApps());
                })
            handleCloseModal();
        }
    }
        
    return (
        <Modal open={currentModalType == ModalType.UnpublishAppModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>
                <Typography>
                    {`Would you like to unpublish ${currentAppToUnpublish?.name}?`}
                </Typography>

                {/* Create/Cancel Buttons */}
                <Box sx={styles.modalButtonContainer}>
                    <Button onClick={handleUnpublish} variant="outlined" size="large" sx={{...styles.modalButton, marginLeft: '0px'}}>Unpublish</Button>
                    <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
                </Box>
            </div>
         </Modal>
    );
}

export default UnpublishAppModal;