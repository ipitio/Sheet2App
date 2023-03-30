import { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewAccApps, StoreState } from '../../store/StoreContext';

import "../..styles/Home.css"
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

    /* Event handlers for access screen. */
    const handleAccess = (event: React.MouseEvent<HTMLButtonElement>) => {
        const accessButton = event.target as HTMLButtonElement;
        navigate(`/userapp/${accessButton.id}/home`)
    }

    return (
        <div id="home-wrapper">
            {/* Home Navigation Bar */}
            <HomeNavBar/>

            {/* App Display */}
            <div id="home-display">
                <Grid id="grid" container spacing={2}> 

                    {/* Map each accessible app to a grid item. */}
                    {accApps.map((app) => (
                        <Grid item xs={4}>
                            <div id="grid-item-container">
                                {app.name}

                                {/* Access button for apps. */}
                                <IconButton id={`${app.id} grid-item-button`} onClick={handleAccess}>
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