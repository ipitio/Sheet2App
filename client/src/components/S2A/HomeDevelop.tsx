import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewDevApps, createApp, deleteApp, setCurrentApp, showDeleteAppModal, hideS2AModal, markAppToDelete, StoreState } from '../../store/StoreContext';
import { ModalType } from '../../store/StoreTypes';

import styles from '../../styles/S2A/HomeStyles'
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
    const currentAppToDelete = useSelector((state: StoreState) => state.s2aReducer.currentAppToDelete);
    const currentModalType = useSelector((state: StoreState) => state.s2aReducer.currentModalType);

    /* React hooks into elements. */
    const appNameTextField = useRef<HTMLDivElement>(null);

    /* Event handlers for UI interaction. */
    const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.currentTarget as HTMLButtonElement;
        const appToDelete = devApps.find(app => app.id == Number(deleteButton.id));

        if(appToDelete) {
            dispatch(markAppToDelete(appToDelete));
            dispatch(showDeleteAppModal());
        }
    }

    const handleCloseModal = () => {
        dispatch(hideS2AModal());
    }

    const handleCreate = () => {
        const textField = appNameTextField.current;
        const input = textField ? textField.querySelector("input") : null;
        const appName = input ? input.value : "";

        if(appName) {
            dispatch(createApp(appName));
            dispatch(viewDevApps());
            handleCloseModal();
        }
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentAppToDelete) {
            dispatch(deleteApp(currentAppToDelete.id));
            dispatch(viewDevApps());
            handleCloseModal();
        }
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editButton = event.currentTarget as HTMLButtonElement;
        const appToEdit = devApps.find(app => app.id == Number(editButton.id));

        if(appToEdit) {
            dispatch(setCurrentApp(appToEdit));
            navigate(`/S2A/editapp/datasources/${editButton.id}`);
        }
    }

    return (                                                                
        <div style={styles.homeWrapper}>
            {/* Home Navigation Bar */}
            <HomeNavBar/>

            {/* Create App Modal */}
            <Modal open={currentModalType == ModalType.CreateAppModal} onClose={handleCloseModal} sx={styles.modal}>
                <div style={styles.modalContainer}>

                    {/* App Name Textfield, Create/Discard Buttons */}
                    <TextField ref={appNameTextField} variant="filled" label="App Name"/>
                    <Button onClick={handleCreate} variant="outlined" size="large" sx={styles.modalButton}>Create</Button>
                    <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Discard</Button>
                </div>
            </Modal>

            {/* Delete App Modal */}
            <Modal open={currentModalType == ModalType.DeleteAppModal} onClose={handleCloseModal} sx={styles.modal}>
                <div style={styles.modalContainer}>
                     Delete {currentAppToDelete?.name} App?
                    <Button onClick={handleDelete} variant="outlined" size="large" sx={styles.modalButton}>Confirm</Button>
                    <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
                </div>
            </Modal>
            
            {/* App Display */}
            <div style={styles.homeDisplay}>
                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app in development to a grid item. */}
                {devApps.map((app) => (
                    <Grid item xs={2}>
                        <div style={styles.gridItemContainer}>
                            {app.name}

                            {/* Edit and delete buttons for apps. */}
                            <IconButton id={app.id.toString()} onClick={handleOpenDeleteModal} sx={styles.deleteAppButton}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                            <IconButton id={app.id.toString()} onClick={handleEdit} sx={styles.editAppButton}>
                                <EditIcon fontSize="small"/>
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