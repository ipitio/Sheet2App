import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { finishEdit, StoreState } from '../../store/StoreContext';

import styles from '../../styles/S2A/EditColumnsNavBarStyles';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function EditColumnsNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Redux hooks into store. */
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);

    /* Event handlers. */

    /* Navigation bar buttons. */
    const handleExit = () => {
        dispatch(finishEdit());
        if(location.pathname.startsWith("/S2A/editapp/datasources/datasourcecolumns")) 
            currApp ? navigate(`/S2A/editapp/datasources/${currApp.id}`) : navigate("/");
        if(location.pathname.startsWith("/S2A/editapp/tableviews/tableviewcolumns"))
            currApp ? navigate(`/S2A/editapp/tableviews/${currApp.id}`) : navigate("/");
        if(location.pathname.startsWith("/S2A/editapp/detailviews/detailviewcolumns"))
            currApp ? navigate(`/S2A/editapp/detailviews/${currApp.id}`) : navigate("/");
    }

    return (
        <AppBar style={styles.navBarWrapper}>
            <Toolbar>
                <Typography sx={styles.navBarTitle} variant="h6" component="div">S2A Edit Columns</Typography>

                {/* Navigation Buttons */}
                <IconButton onClick={handleExit} sx={styles.exitButton} title="Exit">
                    <ExitToAppIcon fontSize="large"/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default EditColumnsNavBar;