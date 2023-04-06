import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StoreState } from '../../store/StoreContext';

import { AppBar, Toolbar, Button, TextField } from '@mui/material';

function EditAppNavBar() {
    const navigate = useNavigate();

    /* Redux hooks into store. */   
    const currApp = useSelector((state: StoreState) => state.s2aReducer.currentApp);

    /* Event handlers for navigation bar buttons. */
    const displayDatasources = () => {
        currApp ? navigate(`/S2A/editapp/datasources/${currApp.id}`) : navigate("/")
    }

    const displayViews = () => {
        currApp ? navigate(`/S2A/editapp/views/${currApp.id}`) : navigate("/")
    }
    
    const displayRoles = () => {
        currApp ? navigate(`/S2A/editapp/roles/${currApp.id}`) : navigate("/")
    }

    const handleSaveChanges = () => {
        navigate("/S2A/home");
    }

    const handleDiscardChanges = () => {
        navigate("/S2A/home");
    }

    return (
        <AppBar style={{ backgroundColor: '#6CA6CD' }}>
            <Toolbar>
                <TextField
                    variant="outlined"
                    label="App Name"
                    sx={{ flexGrow: 0.8 }}
                />

                {/* Navigation Buttons */}
                <Button onClick={displayDatasources} color="inherit" sx={{ marginLeft: '40vw' }}>App Data Sources</Button>
                <Button onClick={displayViews}  color="inherit" sx={{ marginLeft: '10px' }}>App Views</Button>
                <Button onClick={displayRoles}  color="inherit" sx={{ marginLeft: '10px' }}>App Role Management</Button>
                <Button onClick={handleSaveChanges} color="inherit" sx={{ marginLeft: '10px' }}>Save</Button>
                <Button onClick={handleDiscardChanges} color="inherit" sx={{ marginLeft: '10px' }}>Discard</Button>
            </Toolbar>
        </AppBar>
    );
}

export default EditAppNavBar;