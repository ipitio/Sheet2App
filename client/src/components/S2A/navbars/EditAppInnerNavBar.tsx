import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { finishEdit, hideErrorAlert, hideSuccessAlert, StoreState } from '../../../store/StoreContext';

import styles from '../../../styles/S2A/navbars/EditAppInnerNavBar';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function EditAppInnerNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Redux hooks into store. */
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);

    /* Event handlers. */

    /* Navigation bar buttons. */
    const handleExit = () => {
        dispatch(finishEdit());
        dispatch(hideSuccessAlert());
        dispatch(hideErrorAlert());
        if(location.pathname.startsWith("/S2A/editapp/datasources/")) 
            currApp ? navigate(`/S2A/editapp/datasources/${currApp.id}`) : navigate("/");
        if(location.pathname.startsWith("/S2A/editapp/tableviews/"))
            currApp ? navigate(`/S2A/editapp/tableviews/${currApp.id}`) : navigate("/");
        if(location.pathname.startsWith("/S2A/editapp/detailviews/"))
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

export default EditAppInnerNavBar;