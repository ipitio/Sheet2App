import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editRecord, hideWebAppModal, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function EditRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);
    const currentRecord = useSelector((state: StoreState) => state.webAppReducer.currentRecord);

    const handleEditRecord = () => {

    }

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
                        {
                            currentRecord?.data?.map((element) => {
                                return (
                                    <Box key={element}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around'
                                        }}
                                    >
                                        <TextField></TextField>
                                    </Box>
                                )
                            })
                        }
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleEditRecord} startIcon={<CheckIcon/>}>
                            Confirm
                        </Button>
                        <Button onClick={() => dispatch(hideWebAppModal())} startIcon={<CloseIcon/>}>
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default EditRecordModal;