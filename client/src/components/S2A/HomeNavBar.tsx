import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import { getLoggedOut } from '../../auth/AuthController';

import { showCreateAppModal, hideS2AModal } from '../../store/StoreContext';

import styles from '../../styles/S2A/HomeNavBarStyles'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import Cookies from 'js-cookie';

function HomeNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        dispatch(hideS2AModal());
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
    const handleProfileOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        getLoggedOut();
        navigate("/S2A");
    };

    return (
        <AppBar sx={styles.navBarWrapper}>
            <Toolbar>
                <Typography sx={styles.navBarTitle} variant="h6" component="div">S2A Home</Typography>

                {/* Create App Button */}
                {location.pathname === "/S2A/home/develop" && (
                    <IconButton onClick={handleOpenModal} sx={styles.createAppButton}>
                        <AddIcon/>
                        Create New App
                    </IconButton>
                )}

                {/* Search Textfield and Navigation Buttons */}
                <TextField sx={styles.searchAppTextfield} label="Search app" variant="outlined"/>
                <Button onClick={displayAppsInDev} sx={styles.displayDevAppsButton} color="inherit">Apps in Development</Button>
                <Button onClick={displayAppsAccessible} sx={styles.displayAccAppsButton} color="inherit">Accessible Apps</Button>
                <IconButton onClick={handleProfileOpen} sx={styles.openProfileButton} color="inherit">
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