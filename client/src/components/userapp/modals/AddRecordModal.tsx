import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {store, hideWebAppModal, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function AddRecordModal() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);
    const currentTableview = useSelector((state: StoreState) => state.webAppReducer.currentTableview);
    const columnData = useSelector((state: StoreState) => state.webAppReducer.columnData);
    const firstRecordColumns = useSelector((state: StoreState) => state.webAppReducer.firstRecordColumns);

    const handleAddRecord = () => {

    }

    return (
        <Box id='add-record-modal'>
            <Dialog open={currentModalType === ModalType.AddRecordModal} onClose={() => dispatch(hideWebAppModal())}>
                <DialogTitle>
                    Add Record
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {firstRecordColumns?.map((column) => {
                            return (
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '8px'}}>
                                    <Typography sx={{marginRight: '40px', alignContent: 'center', paddingTop:'16px'}}>
                                        {column.name}
                                    </Typography>
                                    <TextField>

                                    </TextField>
                                </Box>
                            )
                        })} 
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleAddRecord} startIcon={<CheckIcon />}>
                            Confirm
                        </Button>
                        <Button onClick={() => dispatch(hideWebAppModal())} startIcon={<CloseIcon />}>
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default AddRecordModal;