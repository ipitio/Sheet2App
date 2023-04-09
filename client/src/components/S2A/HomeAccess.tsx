import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewAccApps, StoreState } from '../../store/StoreContext';

import styles from "../../styles/S2A/HomeStyles"
import HomeNavBar from './HomeNavBar';
import { Grid, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function HomeAccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewAccApps());
    }, []);

    /* Redux hooks into store. */   
    const accApps = useSelector((state: StoreState) => state.s2aReducer.accApps);

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
                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app in development to a grid item. */}
                {accApps.map((app) => (
                    <Grid item xs={2}>
                        <div style={styles.gridItemContainer}>
                            {app.name}

                                {/* Access button for apps. */}
                                <IconButton id={app.id.toString()} onClick={handleAccess} sx={styles.accessAppButton}>
                                    <ChevronRightIcon/>
                                </IconButton>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default HomeAccess;