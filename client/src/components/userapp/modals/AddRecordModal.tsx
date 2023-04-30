import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {store, hideWebAppModal, StoreState } from '../../../store/StoreContext';
import { Column, ModalType } from '../../../store/StoreTypes';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { addRecord, loadTableview } from '../../../store/StoreController';

function AddRecordModal() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const currentModalType = useSelector((state: StoreState) => state.webAppReducer.currentModalType);
    const currentTableview = useSelector((state: StoreState) => state.webAppReducer.currentTableview);
    const columnData = useSelector((state: StoreState) => state.webAppReducer.columnData);
    const firstRecordColumns = useSelector((state: StoreState) => state.webAppReducer.firstRecordColumns);

    const [columnToDataPairs, setColumnToDataPairs] = useState<Record<number, any>>({})

    const handleAddRecord = () => {
        dispatch(hideWebAppModal());
        dispatch(addRecord(columnToDataPairs))
        .then(() => {
            dispatch(loadTableview());
        })
    }

    const handleInputChange = (event: any, index: number) => {
        let newPairs = columnToDataPairs;
        newPairs[index] = event.target.value;

        setColumnToDataPairs(newPairs);
    }

    return (
        <Box id='add-record-modal'>
            <Dialog open={currentModalType === ModalType.AddRecordModal} onClose={() => dispatch(hideWebAppModal())}>
                <DialogTitle>
                    Add Record
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {firstRecordColumns?.map((column, index) => {
                            return (
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '8px'}}>
                                    <Typography sx={{marginRight: '40px', alignContent: 'center', paddingTop:'16px'}}>
                                        {column.name}
                                    </Typography>
                                    <TextField onChange={(event) => handleInputChange(event, index)}/>
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