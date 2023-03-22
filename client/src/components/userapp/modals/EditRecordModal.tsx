import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideWebAppModal, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';

function EditRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    // Retrieve the current modal that should be opened from the store
    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);

    return (
        <Box
            id='edit-record-modal'
        >
            <Dialog
                open={currentModalType === ModalType.EditRecordModal}
                onClose={() => dispatch(hideWebAppModal())}
            >
                <DialogTitle>
                    Edit Record
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/** TODO: ENUMERATE THE EDITABLE COLUMNS AS FIELDS */}
                    </DialogContentText>
                    <DialogActions>
                        <Button>
                            {/** TODO: SEND AN API REQUEST TO EDIT RECORD WHEN CONFIRM CLICKED */}
                            Confirm
                        </Button>
                        <Button
                            onClick={() => dispatch(hideWebAppModal())}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default EditRecordModal;