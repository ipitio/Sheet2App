import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewDevApps, setCurrentApp, setCurrentModalType, markAppToDelete, StoreState } from '../../store/StoreContext';
import { ModalType } from '../../store/StoreTypes';

import styles from '../../styles/S2A/HomeStyles'
import HomeNavBar from './HomeNavBar';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function HomeDevelop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewDevApps());
    }, []);

    /* Redux hooks into store. */
    const devApps = useSelector((state: StoreState) => state.S2AReducer.devApps);

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

    return (                                                                
        <div style={styles.homeWrapper}>
            {/* Home Navigation Bar */}
            <HomeNavBar/>
            
            {/* App Display */}
            <div style={styles.homeDisplay}>
                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app in development to a grid item. */}
                {devApps.map((app) => (
                    <Grid item xs={2} key={app.id}>
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