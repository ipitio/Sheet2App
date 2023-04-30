import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { StoreState, showEditRecordModal, store } from '../../store/StoreContext';
import { useDispatch, useSelector } from 'react-redux';
import DatasourceNavBar from './DatasourceNavBar';
import styles from '../../styles/userapp/containers/ContentContainers';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { editRecord, loadDetailview } from '../../store/StoreController';

function Detailview() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const columns = useSelector((state: StoreState) => state.webAppReducer.columns);
    const currentRecordData = useSelector((state: StoreState) => state.webAppReducer.currentRecordData);
    const firstRecordColumns = useSelector((state: StoreState) => state.webAppReducer.firstRecordColumns);
    const records = useSelector((state: StoreState) => state.webAppReducer.records);
    const currentRecordIndex = useSelector((state: StoreState) => state.webAppReducer.currentRecordIndex);

    const [isEditing, setIsEditing] = useState(false);
    const [columnToDataPairs, setColumnToDataPairs] = useState<Record<number, any>>({})

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(loadDetailview())
            .then(() => {
                setIsLoading(false);
            })
    })

    const handleToggleEditing = () => {
        setIsEditing(true);
    }

    const handleEditRecord = () => {
        dispatch(editRecord(columnToDataPairs))
        .then(() => {
            setIsLoading(true);
            setIsEditing(false);
        })
    }

    const handleInputChange = (event: any, index: number) => {
        let newPairs = columnToDataPairs;
        newPairs[index] = event.target.value;

        setColumnToDataPairs(newPairs);
    }

    return (
        <Box>
            <DatasourceNavBar />
            {isLoading ? <CircularProgress sx={{ ...styles.contentContainer }} /> :
                <Box sx={{ ...styles.contentContainer, display: 'grid', flexDirection: 'column', width: '100%', fontSize: '32px', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'block', justifyContent: 'space-between', width: 'full' }}>
                        {isEditing ? firstRecordColumns.map((column, index) => {
                            return (
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography sx={{ marginRight: '40px', marginTop: '40px' }}>{column.name}</Typography>
                                    <TextField sx={{marginTop: '20px'}} onChange={(event) => handleInputChange(event, index)} defaultValue={currentRecordData ? currentRecordData[index + 1] : ''} />
                                </Box>
                            )
                        }) :
                            columns.map((column, index) => {
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography sx={{ marginRight: '40px', marginTop: '12px' }}>{column.name}</Typography>
                                        <Typography sx={{marginTop: '12px'}}>{currentRecordIndex && records[currentRecordIndex - 1] ? records[currentRecordIndex - 1][index] : ''}</Typography>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Divider sx={{ bgcolor: 'black', fontWeight: 'bold', marginTop: '20px' }} />

                    {isEditing ?
                        <Button sx={{ display: 'flex' }} startIcon={<SaveIcon />} onClick={handleEditRecord}>
                            <Typography>Save Record</Typography>
                        </Button> :
                        <Button sx={{ display: 'flex' }} startIcon={<EditIcon />} onClick={handleToggleEditing}>
                            <Typography>Edit Record</Typography>
                        </Button>
                    }
                </Box>
            }
        </Box>
    )
}

export default Detailview;