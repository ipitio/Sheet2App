import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import { getLoggedOut } from '../../auth/AuthController';

import { viewDevApps, showCreateAppModal, hideS2aModal } from '../../store/StoreContext';

import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import Cookies from 'js-cookie';


function HomeNavBar() {
    /* React hooks. */
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* On mount, pull data and display apps in development. */
    useEffect(() => {
        dispatch(viewDevApps());
        dispatch(hideS2aModal());
    }, []);

    /* Event handlers for create app modal. */
    const handleOpenModal = () => {
        dispatch(showCreateAppModal());
    }

    /* Event handlers for navigation bar buttons. */
    const displayAppsInDev = () => {
        navigate("/S2A/home/develop")
    }

    const displayAppsAccessible = () => {
        navigate("/S2A/home/access")
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

    /* Conditional rendering of the create app button.  */
    const createAppButton = 
        /* User is on development screen. */
        (location.pathname === "/S2A/home/develop") ?
            <IconButton onClick={handleOpenModal} sx={{ fontSize: '1rem'}}>
                <AddIcon/>
                Create New App
            </IconButton>
        :
        null;
    
    return (
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
    );
}

export default HomeNavBar;