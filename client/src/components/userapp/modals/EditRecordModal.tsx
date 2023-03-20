import { Box, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, StoreState } from '../../../store/StoreContext';
import { Modal } from '../../../store/StoreTypes';

function EditRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    // Retrieve the current modal that should be opened from the store
    const currentModal = useSelector((state: StoreState) => state.webAppReducer.currentModal);

    return (
        <Box
            id='edit-record-modal'
        >
            <Dialog
                open={currentModal === Modal.EditRecordModal}
                onClose={() => {
                    dispatch(hideModal())
                }}
            >
                Edit Record
            </Dialog>
        </Box>
    )
}

export default EditRecordModal;