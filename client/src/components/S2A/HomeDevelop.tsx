import { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewDevApps, createApp, deleteApp, hideS2aModal, StoreState } from '../../store/StoreContext';
import { ModalType } from '../../store/StoreTypes';

import HomeNavBar from './HomeNavBar';
import { Button, Grid, Modal, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function HomeDevelop() {
    /* React hooks. */
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    /* On mount, pull data and display apps in development. */
    useEffect(() => {
        dispatch(viewDevApps());
        dispatch(hideS2aModal());
    }, []);

    /* Redux hooks into store. */   
    const devApps = useSelector((state: StoreState) => state.s2aReducer.devApps);
    const currentModalType = useSelector((state: StoreState) => state.s2aReducer.currentModalType);

    /* Event handlers for create app modal. */
    const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        const createButton = event.target as HTMLButtonElement;
        dispatch(createApp(createButton.id));
        dispatch(viewDevApps());
        handleCloseModal();
    }

    const handleCloseModal = () => {
        dispatch(hideS2aModal());
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.target as HTMLButtonElement;
        dispatch(deleteApp(Number(deleteButton.id)));
        dispatch(viewDevApps());
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editButton = event.target as HTMLButtonElement;
        navigate(`/S2A/editapp/${editButton.id}`)
    }

    return (                                                                
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
            {/* Home Navigation Bar */}
            <HomeNavBar/>

            {/* Create App Modal */}
            <Modal open={currentModalType == ModalType.CreateAppModal} onClose={handleCloseModal} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
                <div style={{ backgroundColor: "#6CA6CD", padding: "30px" }}>

                    {/* App Name Textfield, Create/Discard Buttons */}
                    <TextField variant="filled" label="App Name"/>
                    <Button onClick={handleCreate} variant="outlined" size="large" sx={{marginLeft: '50px', color:'#E1D9D1'}}>Create</Button>
                    <Button onClick={handleCloseModal} variant="outlined" size="large" sx={{marginLeft: '50px', color:'#E1D9D1'}}>Discard</Button>
                </div>
            </Modal>
            
            {/* App Display */}
            <div style={{ flex: 1, overflow: 'auto', marginTop: "75px" }}>
                <Grid container spacing={2} sx={{ overflow: 'auto', p: 2 }}>  

                {/* Map each app in development to a grid item. */}
                {devApps.map((app) => (
                    <Grid item xs={4}>
                        <div style={{ height: '60px', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative' }}>
                            {app.name}

                            {/* Edit and delete buttons for apps. */}
                            <IconButton id={app.id.toString()} onClick={handleDelete} sx={{ position: 'absolute', top: 0, left: 0 }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton id={app.id.toString()} onClick={handleEdit} sx={{ position: 'absolute', top: 0, right: 0 }}>
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