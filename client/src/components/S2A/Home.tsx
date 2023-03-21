import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getLoggedOut } from '../../auth/AuthController';
import { viewDevApps, viewAccApps, createApp, deleteApp, displayDevApps, displayAccApps, showCreateAppModal, hideS2aModal, StoreState } from '../../store/StoreContext';
import { AppDisplayType, ModalType } from '../../store/StoreTypes';

import Cookies from 'js-cookie';

import { AppBar, Toolbar, Typography, Button, Grid, Modal, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Home() {  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* On mount, pull data and display apps in development. */
    useEffect(() => {
        dispatch(viewDevApps());
        dispatch(viewAccApps());
        dispatch(displayDevApps());
        dispatch(hideS2aModal());
    }, []);
    
    /* Redux hooks into store. */   
    const devApps = useSelector((state: StoreState) => state.s2aReducer.devApps);
    const accApps = useSelector((state: StoreState) => state.s2aReducer.accApps);
    const currentAppDisplayType = useSelector((state: StoreState) => state.s2aReducer.currentAppDisplayType);
    const currentModalType = useSelector((state: StoreState) => state.s2aReducer.currentModalType);

    /* Event handlers for navigation bar buttons. */
    const displayAppsInDev = () => {
        dispatch(displayDevApps());
    }

    const displayAppsAccessible = () => {
        dispatch(displayAccApps());
    }

    /* Event handlers for profile menu. */
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleProfileOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        getLoggedOut();
        navigate("/S2A");
    }

    /* Event handlers for development screen. */
    const handleOpenModal = () => {
        dispatch(showCreateAppModal());
    }

    const handleCloseModal = () => {
        dispatch(hideS2aModal());
    }

    const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        const createButton = event.target as HTMLButtonElement;
        dispatch(createApp(createButton.id));
        dispatch(viewDevApps());
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.target as HTMLButtonElement;
        dispatch(deleteApp(Number(deleteButton.id)));
        dispatch(viewDevApps());
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editButton = event.target as HTMLButtonElement;
        navigate(`/S2A/editapp/${editButton.id}`)
    }

    /* Event handlers for access screen. */
    const handleAccess = (event: React.MouseEvent<HTMLButtonElement>) => {
        const accessButton = event.target as HTMLButtonElement;
        navigate(`/userapp/${accessButton.id}/home`)
    }

    /* Conditional rendering of the create app button.  */
    const createAppButton = 
         /* User is on development screen. */
        (currentAppDisplayType === AppDisplayType.AppDevelopment) ?
            <IconButton onClick={handleOpenModal} sx={{ fontSize: '1rem'}}>
                <AddIcon/>
                Create New App
            </IconButton>
        :
        null;

    /* Conditional rendering of the app display. */
    const apps = 
        /* User is on development screen. */
        (currentAppDisplayType === AppDisplayType.AppDevelopment) ?
            <Grid container spacing={2} sx={{ overflow: 'auto', p: 2 }}>  

                {/* Map each app in development to a grid item. */}
                {devApps.map((app) => (
                    <Grid item xs={4}>
                        <div style={{ height: '60px', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative' }}>
                            {app.name}

                            {/* Edit and delete buttons for apps. */}
                            <IconButton id={app.id.toString()} onClick={handleDelete} sx={{ position: 'absolute', top: 0, left: 0 }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton id={app.id.toString()} onClick={handleEdit} sx={{ position: 'absolute', top: 0, right: 0 }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Grid>
                ))}
            </Grid>
        
        /* User is on access screen. */
        : (currentAppDisplayType === AppDisplayType.AppAccess) ?
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
        
        /* Unexpected state. */
        :
        <div>
            Error
        </div>

    return (                                                                
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
            {/* Navigation Bar */}
            <AppBar style={{ backgroundColor: '#6CA6CD' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>S2A Home</Typography>

                    {/* Create App Button */}
                    {createAppButton}

                    {/* Search Textfield and Navigation Buttons */}
                    <TextField label="Search app" variant="outlined" sx={{height: '55px', flexGrow: 0.75, marginLeft: 'auto'}} />
                    <Button onClick={displayAppsInDev} color="inherit" sx={{ marginLeft: '200px' }}>Apps in Development</Button>
                    <Button onClick={displayAppsAccessible} color="inherit" sx={{ marginLeft: '10px' }}>Accessible Apps</Button>
                    <IconButton onClick={handleProfileOpen} color="inherit"sx={{ marginLeft: '10px' }}>
                        <AccountCircle />
                    </IconButton>

                    {/* Search Textfield and Navigation Buttons */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
                        <MenuItem> {Cookies.get("email")} </MenuItem>
                        <MenuItem onClick={handleLogout}> Logout </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Create App Modal */}
            <Modal open={currentModalType == ModalType.CreateAppModal} onClose={handleCloseModal} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
                <div style={{ backgroundColor: "#6CA6CD", padding: "30px" }}>

                    {/* App Name Textfield, Create/Discard Buttons */}
                    <TextField variant="filled" label="App Name"/>
                    <Button onClick={handleCreate} variant="outlined" size="large" sx={{marginLeft: '50px', color:'#E1D9D1'}}>Create</Button>
                    <Button onClick={handleCloseModal} variant="outlined" size="large" sx={{marginLeft: '50px', color:'#E1D9D1'}}>Discard</Button>
                </div>
            </Modal>
            
            {/* App Display */}
            <div style={{ flex: 1, overflow: 'auto', marginTop: "75px" }}>
                {apps}
            </div>
        </div>
    );
}

export default Home;