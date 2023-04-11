import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewDevApps, createApp, finishCreation, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/ModalStyles';
import { Button, Modal, TextField } from '@mui/material';


function CreateAppModal() {
    const dispatch = useDispatch();

    /* Redux hooks into store. */
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* React hooks into elements. */
    const appNameRef = useRef<HTMLDivElement>(null);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels creation.*/
    const handleCloseModal = () => {
        dispatch(finishCreation());
    }

    /* If the user confirms creation, create the app. */
    const handleCreate = () => {
        const input = appNameRef?.current?.querySelector("input");
        const appName = input ? input.value : "";

        if(appName) {
            dispatch(createApp(appName));
            dispatch(viewDevApps());
            handleCloseModal();
        }
    }
        
    return (
        <Modal open={currentModalType == ModalType.CreateAppModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>
                
                {/* App Name TextField */}
                <TextField ref={appNameRef} variant="filled" label="App Name"/>

                {/* Create/Cancel Buttons */}
                <Button onClick={handleCreate} variant="outlined" size="large" sx={styles.modalButton}>Create</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
         </Modal>
    );
}

export default CreateAppModal;