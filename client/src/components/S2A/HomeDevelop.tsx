import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewDevApps, createApp, deleteApp, hideS2AModal, StoreState } from '../../store/StoreContext';
import { ModalType } from '../../store/StoreTypes';

import "../..styles/Home.css"
import HomeNavBar from './HomeNavBar';
import { Button, Grid, Modal, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function HomeDevelop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewDevApps());
    }, []);

    /* Redux hooks into store. */
    const devApps = useSelector((state: StoreState) => state.s2aReducer.devApps);
    const currentModalType = useSelector((state: StoreState) => state.s2aReducer.currentModalType);

    /* Event handlers for UI interaction. */
    const handleCloseModal = () => {
        dispatch(hideS2AModal());
    }

    const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        const createButton = event.target as HTMLButtonElement;
        dispatch(createApp(createButton.id));
        dispatch(viewDevApps());
        handleCloseModal();
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.target as HTMLButtonElement;
        dispatch(deleteApp(Number(deleteButton.id)));
        dispatch(viewDevApps());
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editButton = event.target as HTMLButtonElement;
        navigate(`/S2A/editapp/datasources/${editButton.id}`)
    }

    return (                                                                
        <div id="home-wrapper">
            {/* Home Navigation Bar */}
            <HomeNavBar/>

            {/* Create App Modal */}
            <Modal id="create-app-modal" open={currentModalType == ModalType.CreateAppModal} onClose={handleCloseModal}>
                <div id="modal-container">

                    {/* App Name Textfield, Create/Discard Buttons */}
                    <TextField variant="filled" label="App Name"/>
                    <Button id="modalButton" onClick={handleCreate} variant="outlined" size="large">Create</Button>
                    <Button id="modalButton" onClick={handleCloseModal} variant="outlined" size="large">Discard</Button>
                </div>
            </Modal>
            
            {/* App Display */}
            <div id="home-display">
                <Grid id="grid" container spacing={2}>  

                {/* Map each app in development to a grid item. */}
                {devApps.map((app) => (
                    <Grid item xs={4}>
                        <div id="grid-item-container">
                            {app.name}

                            {/* Edit and delete buttons for apps. */}
                            <IconButton id={`${app.id} grid-item-button`} onClick={handleDelete}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton id={`${app.id} grid-item-button`} onClick={handleEdit}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Grid>
                ))}
                </Grid>
            </div>
        </div>
    );
}

export default HomeDevelop;