import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideWebAppModal, StoreState, addRecord } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';

function AddRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);
    const currentTableview = useSelector((state: StoreState) => state.webAppReducer.currentTableview);

    return (
        <Box id='add-record-modal'>
            <Dialog open={currentModalType === ModalType.AddRecordModal} onClose={() => dispatch(hideWebAppModal())}>
                <DialogTitle>
                    Add Record
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/** TODO: ENUMERATE THE EDITABLE COLUMNS AS FIELDS */}
                        {
                            /*
                                currentView?.columns?.map((column) => {
                                return (
                                    <Box
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
                            */
                        }
                    </DialogContentText>
                    <DialogActions>
                        <Button
                        // TODO: Populate fields of the record with elements from the input form
                            onClick={() => dispatch(addRecord({
                                index: 0,
                                data: ["Some", "Example", "Fields"],
                                id: 0,
                            }))}
                        >
                            {/** TODO: SEND AN API REQUEST TO ADD RECORD WHEN CONFIRM CLICKED */}
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

export default AddRecordModal;