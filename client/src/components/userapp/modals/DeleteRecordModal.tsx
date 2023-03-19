import { Box, Dialog } from '@mui/material';
import { useSelector } from 'react-redux';
import { IS2AState, IWebAppState } from '../../../store/StoreContext';
import { Modal } from '../../../store/StoreTypes';

function DeleteRecordModal() {
    // Retrieve the current modal that should be opened from the store
    const currentModal = useSelector((state: IS2AState & IWebAppState) => state.currentModal);

    return (
        <Box
            id='delete-record-modal'
        >
            <Dialog
                open={currentModal === Modal.DeleteRecordModal}
            >
                Delete Record
            </Dialog>
        </Box>
    )
}

export default DeleteRecordModal;