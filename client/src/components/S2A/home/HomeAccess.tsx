import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { store, StoreState, openApp, markAppToUnpublish, setCurrentModalType } from '../../../store/StoreContext';
import { App, ModalType } from '../../../store/StoreTypes';

import styles from "../../../styles/S2A/home/HomeStyles"
import HomeNavBar from '../navbars/HomeNavBar';
import { Button, Grid, Box, CircularProgress } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import { viewAccApps } from '../../../store/StoreController';

function HomeAccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(viewAccApps())
        .then(() => {
          setIsLoading(false);
        })
    });

    /* Redux hooks into store. */   
    const accApps = useSelector((state: StoreState) => state.S2AReducer.accApps);
    const searchedAccApps = useSelector((state: StoreState) => state.S2AReducer.searchedAccApps);
      
    /* Event handlers. */   

    /* If the access icon next to an app is clicked. */
    const handleAccess = (app: App) => {
        dispatch(openApp(app));
        navigate(`/userapp/${app.id}/home`);
    }

    /* If the unpublish icon next to an app is clicked. */
    const handleUnpublish = (app: App) => {
        dispatch(markAppToUnpublish(app))
        dispatch(setCurrentModalType(ModalType.UnpublishAppModal));
    }

    return (
        <div style={styles.homeWrapper}>
            {/* Home Navigation Bar */}
            <HomeNavBar/>

            {/* App Display */}
            <div style={styles.homeDisplay}>
                {isLoading ? <CircularProgress /> :
                    <Grid sx={styles.grid} container spacing={2}>

                        {/* Map each app in development to a grid item. */}
                        {(searchedAccApps.length > 0 ? searchedAccApps : accApps).map((app) => (
                            <Grid item xs={2} key={app.id}>
                                <Box sx={{ ...styles.gridItemContainer, '&:hover': { 'background': "#EEEEEE" } }}>
                                    {app.name}

                                    {/* Access, unpublish button for apps. */}
                                    <Box sx={styles.buttonContainer}>
                                        <Button onClick={() => { handleAccess(app) }} title="Access" startIcon={<ChevronRightIcon fontSize="medium" />}>
                                            Launch
                                        </Button>
                                        <Button onClick={() => { handleUnpublish(app) }} title="Unpublish" startIcon={<FileDownloadOffIcon fontSize="medium" />}>
                                            Unpublish
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                }
            </div>
        </div>
    );
}

export default HomeAccess;