import { Box, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, StoreState } from '../../../store/StoreContext';
import { Modal } from '../../../store/StoreTypes';

function AddRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    // Retrieve the current modal that should be opened from the store
    const currentModal = useSelector((state: StoreState) => state.webAppReducer.currentModal);

    return (
        <Box
            id='add-record-modal'
        >
            <Dialog
                open={currentModal === Modal.AddRecordModal}
                onClose={() => {
                    dispatch(hideModal())
                }}
            >
                Add Record
            </Dialog>
        </Box>
    )
}

export default AddRecordModal;