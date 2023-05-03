import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { StoreState, showEditRecordModal, store, webAppSetCurrentDatasource, webAppSetCurrentTableview } from '../../store/StoreContext';
import { useDispatch, useSelector } from 'react-redux';
import DatasourceNavBar from './DatasourceNavBar';
import styles from '../../styles/userapp/containers/ContentContainers';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { editRecord, loadDetailview } from '../../store/StoreController';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from 'react-router-dom';

function Detailview() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const navigate = useNavigate();

    const currentTableview = useSelector((state: StoreState) => state.webAppReducer.currentTableview)
    const app = useSelector((state: StoreState) => state.webAppReducer.app)
    const currentRecordData = useSelector((state: StoreState) => state.webAppReducer.currentRecordData);
    const editableColumns = useSelector((state: StoreState) => state.webAppReducer.editableColumns);
    const viewableColumns = useSelector((state: StoreState) => state.webAppReducer.viewableColumns);
    const editFilterColumn = useSelector((state: StoreState) => state.webAppReducer.editFilterColumn);
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
            setIsEditing(false);
            setIsLoading(true);
        })
    }

    const handleInputChange = (event: any, index: number) => {
        let newPairs = columnToDataPairs;
        newPairs[index] = event.target.value;

        setColumnToDataPairs(newPairs);
    }

    const handleReturnToTableview = () => {
        dispatch(webAppSetCurrentDatasource(currentTableview.datasource));
        dispatch(webAppSetCurrentTableview(currentTableview));
        navigate(`/userapp/${app.id}/tableview/${currentTableview.id}`);
    }

    return (
        <Box>
            <DatasourceNavBar />
            {isLoading ? <CircularProgress sx={{ ...styles.contentContainer }} /> :
                <Box sx={{ ...styles.contentContainer, display: 'grid', flexDirection: 'column', width: '100%', fontSize: '32px', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'block', justifyContent: 'space-between', width: 'full' }}>
                        {isEditing ? editableColumns.map((column, index) => {
                            return (
                                column.editable &&
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography sx={{ marginRight: '40px', marginTop: '40px' }}>{column.name}</Typography>
                                        <TextField sx={{ marginTop: '20px' }} onChange={(event) => handleInputChange(event, index)} defaultValue={currentRecordData ? currentRecordData[index + 1] : ''} />
                                    </Box>
                            )
                        }) :
                            viewableColumns.map((column, index) => {
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography sx={{ marginRight: '40px', marginTop: '12px' }}>{column.name}</Typography>
                                        <Typography sx={{ marginTop: '12px' }}>{currentRecordData ? currentRecordData[column.column_index] : ''}</Typography>
                                    </Box>
                                )
                            }
                            )
                        }
                    </Box>
                    <Divider sx={{ bgcolor: 'black', fontWeight: 'bold', marginTop: '20px' }} />

                    {isEditing ?
                        <Button sx={{ display: 'flex' }} startIcon={<SaveIcon />} onClick={handleEditRecord}>
                            <Typography>Save Record</Typography>
                        </Button> :
                        <Button sx={{ display: 'flex' }} startIcon={<EditIcon />} onClick={handleToggleEditing} disabled={!editFilterColumn || !(editFilterColumn && editFilterColumn[currentRecordIndex - 1] && editFilterColumn[currentRecordIndex - 1].toLowerCase() == 'true') || !store.getState().webAppReducer.currentDetailview.canEdit}>
                            <Typography>Edit Record</Typography>
                        </Button>
                    }

                    <Button startIcon={<KeyboardReturnIcon/>} sx={{marginTop: '15vh'}} onClick={handleReturnToTableview}>
                        <Typography>Return to Table View</Typography>
                    </Button>
                </Box>
            }
        </Box>
    )
}

export default Detailview;