import { useDispatch, useSelector } from 'react-redux';

import { store, StoreState, finishPublish } from '../../../../store/StoreContext';
import { ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Modal, Typography, Box } from '@mui/material';
import { viewDevApps, publishApp } from '../../../../store/StoreController';

function PublishAppModal({ testOpen }: { testOpen?: boolean }) {
    const dispatch = useDispatch<typeof store.dispatch>();

    /* Redux hooks into store. */
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);
    const currentAppToPublish = useSelector((state: StoreState) => state.S2AReducer.currentAppToPublish);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels publishment.*/
    const handleCloseModal = () => {
        dispatch(finishPublish());
    }

    /* If the user confirms publishment, publish the app. */
    const handlePublish = () => {
        if (currentAppToPublish) {
            dispatch(publishApp({ ...currentAppToPublish, isPublished: true }))
                .then(() => {
                    dispatch(viewDevApps());
                })
            handleCloseModal();
        }
    }
        
    return (
        <Modal open={testOpen || currentModalType == ModalType.PublishAppModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>
                <Typography>
                    {`Would you like to publish ${currentAppToPublish?.name}?`}
                </Typography>

                {/* Create/Cancel Buttons */}
                <Box sx={styles.modalButtonContainer}>
                    <Button onClick={handlePublish} variant="outlined" size="large" sx={{...styles.modalButton, marginLeft: '0px'}}>Publish</Button>
                    <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
                </Box>
            </div>
         </Modal>
    );
}

export default PublishAppModal;