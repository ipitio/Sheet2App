import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import store, { StoreState } from '../../../store/StoreContext';

import styles from "../../../styles/S2A/home/HomeStyles"
import HomeNavBar from '../navbars/HomeNavBar';
import { Grid, IconButton, Box, CircularProgress } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
    const handleAccess = (event: React.MouseEvent<HTMLButtonElement>) => {
        const accessButton = event.currentTarget as HTMLButtonElement;
        navigate(`/userapp/${accessButton.id}/home`)
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

                                    {/* Access button for apps. */}
                                    <IconButton id={app.id.toString()} onClick={handleAccess} sx={styles.accessAppButton}>
                                        <ChevronRightIcon />
                                    </IconButton>
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