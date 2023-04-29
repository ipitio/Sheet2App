import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import store, { setCurrentApp, setCurrentModalType, markAppToDelete, StoreState } from '../../../store/StoreContext';
import { App, ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/home/HomeStyles'
import HomeNavBar from '../navbars/HomeNavBar';
import { Grid, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import { publishApp, viewDevApps } from '../../../store/StoreController';

function HomeDevelop() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewDevApps());
    }, []);

    /* Redux hooks into store. */
    const devApps = useSelector((state: StoreState) => state.S2AReducer.devApps);
    const searchedDevApps = useSelector((state: StoreState) => state.S2AReducer.searchedDevApps);

    /* Event handlers. */

    /* If the delete icon next to an app is clicked. */
    const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.currentTarget as HTMLButtonElement;
        const appToDelete = devApps.find(app => app.id == Number(deleteButton.id));

        if(appToDelete) {
            dispatch(markAppToDelete(appToDelete));
            dispatch(setCurrentModalType(ModalType.DeleteAppModal));
        }
    }

    /* If the edit icon next to an app is clicked. */
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editButton = event.currentTarget as HTMLButtonElement;
        const appToEdit = devApps.find(app => app.id == Number(editButton.id));

        if(appToEdit) {
            dispatch(setCurrentApp(appToEdit));
            navigate(`/S2A/editapp/datasources/${editButton.id}`);
        }
    }

    /* If the publish icon next to an app is clicked. */
    const handlePublish = (event: React.MouseEvent<HTMLButtonElement>) => {
        const publishButton = event.currentTarget as HTMLButtonElement;
        const appToPublish = devApps.find(app => app.id == Number(publishButton.id));

        if(appToPublish) {
            const newApp = {...appToPublish, isPublished: true};
            dispatch(publishApp(newApp));
            dispatch(viewDevApps());
        }
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
                    <Grid item xs={2} key={app.id}>
                    <Box sx={{...styles.gridItemContainer, '&:hover': {'background': "#EEEEEE"}}}>
                            {app.name}

                            {/* Edit, publish, and delete buttons for apps. */}
                            <IconButton id={app.id.toString()} onClick={handleOpenDeleteModal} sx={styles.deleteAppButton} title="Delete">
                                <DeleteIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton id={app.id.toString()} onClick={handleEdit} sx={styles.editAppButton} title="Edit">
                                <EditIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton id={app.id.toString()} onClick={handlePublish} sx={styles.publishAppButton} title="Publish">
                                <PublishIcon fontSize="medium"/>
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
                </Grid>
            </div>
        </div>
    );
}

export default HomeDevelop;