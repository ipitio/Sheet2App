import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, StoreState } from '../../../store/StoreContext';
import { Modal } from '../../../store/StoreTypes';

function DeleteRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    // Retrieve the current modal that should be opened from the store
    const currentModal = useSelector((state: StoreState) => state.webAppReducer.currentModal);

    return (
        <Box
            id='delete-record-modal'
        >
            <Dialog
                open={currentModal === Modal.DeleteRecordModal}
                onClose={() => {
                    dispatch(hideModal())
                }}
            >
                <DialogTitle>
                    Delete Record
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/** TODO: ENUMERATE THE EDITABLE COLUMNS AS FIELDS */}
                    </DialogContentText>
                    <DialogActions>
                        <Button>
                            {/** TODO: SEND AN API REQUEST TO DELETE RECORD WHEN CONFIRM CLICKED */}
                            Confirm
                        </Button>
                        <Button
                            onClick={() => dispatch(hideModal())}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default DeleteRecordModal;