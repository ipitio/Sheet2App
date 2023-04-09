import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecord, hideWebAppModal, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';

function DeleteRecordModal() {
    // Retrieve the dispatcher for the store
    const dispatch = useDispatch();

    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);
    const currentRecord = useSelector((state: StoreState) => state.webAppReducer.currentRecord);

    return (
        <Box
            id='delete-record-modal'
        >
            <Dialog
                open={currentModalType === ModalType.DeleteRecordModal}
                onClose={() => dispatch(hideWebAppModal())}
            >
                <DialogTitle>
                    Delete Record
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Are you sure you want to delete this record?
                        </Typography>

                        <Divider />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly'
                            }}
                        >
                            {
                                currentRecord?.data.map((element) => {
                                    return (
                                        <Typography>
                                            {element}
                                        </Typography>
                                    )
                                })
                            }
                        </Box>
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            onClick={() => dispatch(deleteRecord())}
                        >
                            {/** TODO: SEND AN API REQUEST TO DELETE RECORD WHEN CONFIRM CLICKED */}
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

export default DeleteRecordModal;