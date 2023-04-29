import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import store, { setCurrentModalType, resetAll, StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes'

import styles from '../../../styles/S2A/navbars/EditAppNavBarStyles';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { editApp } from '../../../store/StoreController';


function EditAppNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();
    
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

    /* Event handler for changing app name. */
    const handleChangeAppName = (event: React.FocusEvent<HTMLInputElement>) => {
        if(currApp && event.target.value) {
            const newApp = { ...currApp, name: event.target.value};
            dispatch(editApp(newApp));
        }
    };

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
        currApp ? navigate(`/S2A/editapp/rolesheet/${currApp.id}`) : navigate("/")
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
                <TextField onBlur={handleChangeAppName} sx={styles.editAppTextfield} variant="outlined" label="App Name"/>

                {/* Navigation Buttons */}
                <div style={styles.buttonContainer}>
                    <Button onClick={displayDatasources} sx={{ ...styles.displayButton, ...styles.displayDatasourcesButton }} color="inherit">Data Sources</Button>
                    <Button onClick={displayTableviews} sx={{ ...styles.displayButton, ...styles.displayTableviewsButton }} color="inherit">Table Views</Button>
                    <Button onClick={displayDetailviews}sx={{ ...styles.displayButton, ...styles.displayDetailviewsButton }}  color="inherit">Detail Views</Button>
                    <Button onClick={displayRoles} sx={{ ...styles.displayButton, ...styles.displayRolesButton }} color="inherit">Role Spreadsheet</Button>
                    <Button onClick={handleReturn} sx={{ ...styles.displayButton, ...styles.displayReturnButton }}  color="inherit">Home</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default EditAppNavBar;