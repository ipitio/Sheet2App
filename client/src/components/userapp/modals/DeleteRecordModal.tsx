import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import store, { hideWebAppModal, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';
import { deleteRecord, loadTableview } from '../../../store/StoreController';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function DeleteRecordModal() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);
    const currentRecord = useSelector((state: StoreState) => state.webAppReducer.currentRecord);

    const handleDeleteRecord = () => {
        dispatch(deleteRecord())
        .then(() => {
            dispatch(loadTableview());
        })
    }

    return (
        <Box
            id='delete-record-modal'
        >
            <Dialog open={currentModalType === ModalType.DeleteRecordModal} onClose={() => dispatch(hideWebAppModal())}>
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
                            {currentRecord?.data.map((element) => {
                                return (
                                    <Typography key={element}>
                                        {element}
                                    </Typography>
                                )
                            })}
                        </Box>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleDeleteRecord} startIcon={<CheckIcon/>}>
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

export default DeleteRecordModal;