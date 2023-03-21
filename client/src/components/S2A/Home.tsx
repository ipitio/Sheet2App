import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Grid, Modal, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Home() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [display, setDisplay] = useState<String>("dev");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    /* Event handlers for navigation bar buttons. */
    const displayAppsInDev = () => {
        setDisplay("dev");
    }

    const displayAppsAccessible = () => {
        setDisplay("acc");
    }


    /* Event handlers for profile menu. */
    const handleProfileOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        
    }


    /* Event handlers for development screen. */
    const devApps = Array.from({ length: 20 }, (_, index) => `Development App ${index + 1}`);
    const accApps = Array.from({ length: 20 }, (_, index) => `Accessible App ${index + 1}`);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        setModalOpen(false);
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {

    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/S2A/editapp/fillerid")
    }


    /* Event handlers for access screen. */
    const handleAccess = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/userapp/fillerid/home")
    }


    /* Conditional rendering of the create app button.  */
    const createAppButton = 
         /* User is on development screen. */
        (display === "dev") ?
            <IconButton onClick={handleOpenModal} sx={{ fontSize: '1rem'}}>
                <AddIcon/>
                Create New App
            </IconButton>
        :
        null;


    /* Conditional rendering of the app display. */
    const apps = 
        /* User is on development screen. */
        (display === "dev") ?
            <Grid container spacing={2} sx={{ overflow: 'auto', p: 2 }}>  

                {/* Map each app in development to a grid item. */}
                {devApps.map((app) => (
                    <Grid item xs={4} key={app}>
                        <div style={{ height: '60px', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative' }}>
                            {app}

                            {/* Edit and delete buttons for apps. */}
                            <IconButton onClick={handleDelete} sx={{ position: 'absolute', top: 0, left: 0 }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={handleEdit} sx={{ position: 'absolute', top: 0, right: 0 }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Grid>
                ))}
            </Grid>
        
        /* User is on access screen. */
        : <Grid container spacing={2} sx={{ overflow: 'auto', p: 2 }}>

            {/* Map each accessible app to a grid item. */}
            {accApps.map((app) => (
                <Grid item xs={4} key={app}>
                    <div style={{ height: '60px', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative' }}>
                        {app}

                        {/* Access buttons for apps. */}
                        <IconButton onClick={handleAccess} sx={{ position: 'absolute', top: 0, right: 0 }}>
                            <ChevronRightIcon/>
                        </IconButton>
                    </div>
                </Grid>
            ))}
        </Grid>

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
                        <MenuItem> placeholder@gmail.com </MenuItem>
                        <MenuItem onClick={handleLogout}> Logout </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Create App Modal */}
            <Modal open={modalOpen} onClose={handleCloseModal} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
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