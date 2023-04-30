import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { StoreState, showEditRecordModal, store } from '../../store/StoreContext';
import { useDispatch, useSelector } from 'react-redux';
import DatasourceNavBar from './DatasourceNavBar';
import styles from '../../styles/userapp/containers/ContentContainers';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

function Detailview() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const columns = useSelector((state: StoreState) => state.webAppReducer.columns);
    const currentRecordData = useSelector((state: StoreState) => state.webAppReducer.currentRecordData);

    const [isEditing, setIsEditing] = useState(false);

    const handleToggleEditing = () => {
        setIsEditing(true);
    }

    const handleEditRecord = () => {

    }

    return (
        <Box>
            <DatasourceNavBar />
            <Box sx={{ ...styles.contentContainer, display: 'grid', flexDirection: 'column', width: '100%', fontSize: '32px', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'block', justifyContent: 'space-between', width: 'full' }}>
                    {columns.map((column) => {
                        return <Box>{column.name}</Box>
                    })}
                </Box>
                <Divider sx={{ bgcolor: 'black', fontWeight: 'bold' }} />

                {!isEditing ?
                    <Button sx={{ display: 'flex' }} startIcon={<EditIcon />} onClick={handleToggleEditing}>
                        <Typography>Edit Record</Typography>
                    </Button> :
                    <Button sx={{ display: 'flex' }} startIcon={<SaveIcon />} onClick={handleEditRecord}>
                        <Typography>Save Record</Typography>
                    </Button>
                }
            </Box>
        </Box>
    )
}

export default Detailview;