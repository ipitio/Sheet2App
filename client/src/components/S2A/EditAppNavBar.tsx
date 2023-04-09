import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState, setCurrentModalType, resetAll } from '../../store/StoreContext';
import { ModalType } from '../../store/StoreTypes'

import styles from '../../styles/S2A/EditAppNavBarStyles';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function EditAppNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setCurrentModalType(null));
    }, []);

    /* Redux hooks into store. */   
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);

    /* Conditional rendering of UI. */
    const createButtonText = (
        location.pathname.startsWith("/S2A/editapp/datasources/") ? 
            "Create New Datasource" :
        location.pathname.startsWith("/S2A/editapp/tableviews/") ? 
            "Create New Tableview" :
        location.pathname.startsWith("/S2A/editapp/detailviews/") ?
            "Create New Detailview" :
        ""
    )

    /* Event handler for creation of resources. */
    const createResource = () => {
        if(location.pathname.startsWith("/S2A/editapp/datasources/"))
            dispatch(setCurrentModalType(ModalType.CreateDatasourceModal));
        if(location.pathname.startsWith("/S2A/editapp/tableviews/"))
            dispatch(setCurrentModalType(ModalType.CreateTableviewModal));
        if(location.pathname.startsWith("/S2A/editapp/detailviews/"))
            dispatch(setCurrentModalType(ModalType.CreateDetailviewModal));
    }

    /* Event handlers for navigation bar buttons. */
    const displayDatasources = () => {
        currApp ? navigate(`/S2A/editapp/datasources/${currApp.id}`) : navigate("/")
    }

    const displayTableviews = () => {
        currApp ? navigate(`/S2A/editapp/tableviews/${currApp.id}`) : navigate("/")
    }
    
    const displayDetailviews = () => {
        currApp ? navigate(`/S2A/editapp/detailviews/${currApp.id}`) : navigate("/")
    }
    
    const displayRoles = () => {
        currApp ? navigate(`/S2A/editapp/roles/${currApp.id}`) : navigate("/")
    }

    const handleReturn = () => {
        dispatch(resetAll());
        navigate("/S2A/home/develop");
    }

    return (
        <AppBar style={styles.navBarWrapper}>
            <Toolbar>
                <Typography sx={styles.navBarTitle} variant="h6" component="div">S2A Edit App</Typography>
                
                {/* Create Resource Button */}
                {createButtonText && (
                    <IconButton onClick={createResource} sx={styles.createButton}>
                        <AddIcon />
                        {createButtonText}
                    </IconButton>
                )}

                {/* Edit App Name Textfield */}
                <TextField sx={styles.editAppTextfield} variant="outlined" label="App Name"/>

                {/* Navigation Buttons */}
                <Button onClick={displayDatasources} sx={{ ...styles.displayButton, ...styles.displayDatasourcesButton }} color="inherit">App Data Sources</Button>
                <Button onClick={displayTableviews} sx={{ ...styles.displayButton, ...styles.displayTableviewsButton }} color="inherit">App Tableviews</Button>
                <Button onClick={displayDetailviews}sx={{ ...styles.displayButton, ...styles.displayDetailviewsButton }}  color="inherit">App Detailviews</Button>
                <Button onClick={displayRoles} sx={{ ...styles.displayButton, ...styles.displayRolesButton }} color="inherit">App Role Management</Button>
                <Button onClick={handleReturn} sx={{ ...styles.displayButton, ...styles.displayReturnButton }}  color="inherit">Return To Home</Button>
            </Toolbar>
        </AppBar>
    );
}

export default EditAppNavBar;