import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editRecord, hideWebAppModal, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';

function EditRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);
    const currentRecord = useSelector((state: StoreState) => state.webAppReducer.currentRecord);

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
                        <Button
                            // TODO: Populate the fields of the Record using elements from the input form 
                            onClick={() => dispatch(editRecord({
                                index: 0,
                                data: ["some", "test", "data"],
                                id: 0
                            }))}
                        >
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