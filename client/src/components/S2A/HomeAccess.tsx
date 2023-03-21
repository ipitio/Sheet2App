import { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewAccApps, hideS2aModal, StoreState } from '../../store/StoreContext';

import HomeNavBar from './HomeNavBar';
import { Grid, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


function HomeAccess() {
    /* React hooks. */
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* On mount, pull data and display accessible apps. */
    useEffect(() => {
        dispatch(viewAccApps());
        dispatch(hideS2aModal());
    }, []);

    /* Redux hooks into store. */   
    const accApps = useSelector((state: StoreState) => state.s2aReducer.accApps);

    /* Event handlers for access screen. */
    const handleAccess = (event: React.MouseEvent<HTMLButtonElement>) => {
        const accessButton = event.target as HTMLButtonElement;
        navigate(`/userapp/${accessButton.id}/home`)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
            {/* Home Navigation Bar */}
            <HomeNavBar/>

            {/* App Display */}
            <div style={{ flex: 1, overflow: 'auto', marginTop: "75px" }}>
            <Grid container spacing={2} sx={{ overflow: 'auto', p: 2 }}>

                {/* Map each accessible app to a grid item. */}
                {accApps.map((app) => (
                    <Grid item xs={4}>
                        <div style={{ height: '60px', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative' }}>
                            {app.name}

                            {/* Access buttons for apps. */}
                            <IconButton id={app.id.toString()} onClick={handleAccess} sx={{ position: 'absolute', top: 0, right: 0 }}>
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