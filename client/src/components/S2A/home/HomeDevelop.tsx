import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { store, setCurrentApp, markAppToPublish, markAppToDelete, setCurrentModalType, StoreState } from '../../../store/StoreContext';
import { App, ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/home/HomeStyles'
import HomeNavBar from '../navbars/HomeNavBar';
import { Grid, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import { getIsGlobalDev, viewDevApps } from '../../../store/StoreController';

function HomeDevelop() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(getIsGlobalDev());
        dispatch(viewDevApps());
    }, []);

    /* Redux hooks into store. */
    const devApps = useSelector((state: StoreState) => state.S2AReducer.devApps);
    const searchedDevApps = useSelector((state: StoreState) => state.S2AReducer.searchedDevApps);
    const isGlobalDev = useSelector((state: StoreState) => state.S2AReducer.isGlobalDev);

    /* Event handlers. */

    /* If the delete icon next to an app is clicked. */
    const handleOpenDeleteModal = (app: App) => {
        dispatch(markAppToDelete(app));
        dispatch(setCurrentModalType(ModalType.DeleteAppModal));
    }

    /* If the edit icon next to an app is clicked. */
    const handleEdit = (app: App) => {
        dispatch(setCurrentApp(app));
        navigate(`/S2A/editapp/datasources/${app.id}`);
    }

    /* If the publish icon next to an app is clicked. */
    const handlePublish = (app: App) => {
        dispatch(markAppToPublish(app))
        dispatch(setCurrentModalType(ModalType.PublishAppModal));
    }

    return (                                                                
        <div style={styles.homeWrapper}>
            {/* Home Navigation Bar */}
            <HomeNavBar/>
            
            {/* App Display */}
            <div style={styles.homeDisplay}>
                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app in development to a grid item. */}
                {(searchedDevApps.length > 0 ? searchedDevApps : devApps).map((app) => (
                    <Grid item xs={3} key={app.id}>
                        <Box sx={{...styles.gridItemContainer, '&:hover': {'background': "#EEEEEE"}}}>
                            {app.name}
                            
                            {/* Edit, publish, and delete buttons for apps. */}
                            <Box sx={styles.buttonContainer}>
                                <Button onClick={() => { handleOpenDeleteModal(app) }} title="Delete" startIcon={<DeleteIcon fontSize="medium" />} disabled={!isGlobalDev}>
                                    Delete 
                                </Button>
                                <Button onClick={() => { handleEdit(app) }} title="Edit" startIcon={<EditIcon fontSize="medium" />} disabled={!isGlobalDev}>
                                    Edit
                                </Button>
                                <Button onClick={() => { handlePublish(app) }} title="Publish" startIcon={<PublishIcon fontSize="medium" />} disabled={!app.roleMemUrl || !isGlobalDev}>
                                    Publish
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                </Grid>
            </div>
        </div>
    );
}

export default HomeDevelop;