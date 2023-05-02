import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

import { getLoggedOut } from '../../../auth/AuthController';

import {store, hideErrorAlert, hideSuccessAlert, setCurrentModalType, StoreState, searchDevApps, clearSearch } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/navbars/HomeNavBarStyles'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import Cookies from 'js-cookie';

function HomeNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isGlobalDev = useSelector((state: StoreState) => state.S2AReducer.isGlobalDev);
    const [searchQuery, setSearchQuery] = useState('');

    // const devApps = useSelector((state: StoreState) => state.S2AReducer.devApps);

    useEffect(() => {
        dispatch(setCurrentModalType(null));
    }, []);

    /* Event handlers. */

    /* If the create app button is clicked. */
    const handleOpenModal = () => {
        dispatch(setCurrentModalType(ModalType.CreateAppModal));
    }

    /* If the navigational buttons are clicked. */
    const displayAppsInDev = () => {
        navigate("/S2A/home/develop");

        dispatch(hideSuccessAlert());
        dispatch(hideErrorAlert());
    }

    const displayAppsAccessible = () => {
        navigate("/S2A/home/access");

        dispatch(hideSuccessAlert());
        dispatch(hideErrorAlert());
    }

    /* If the profile menu is clicked.  */
    const handleProfileOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        getLoggedOut();
        navigate("/");
    };

    const handleKeyDown = (event: any) => {
        if (event.key && event.key == 'Enter') {
            handleSearchApp();
        } else {
            dispatch(clearSearch());
        }
    }

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchQuery(event.target.value);
    }

    const handleSearchApp = () => {
        dispatch(searchDevApps(searchQuery));
    }

    return (
        <AppBar sx={styles.navBarWrapper}>
            <Toolbar>
                <Typography sx={styles.navBarTitle} variant="h6" component="div">S2A Home</Typography>

                {/* Create App Button */}
                {location.pathname === "/S2A/home/develop" && (
                    <IconButton onClick={handleOpenModal} sx={styles.createAppButton} disabled={!isGlobalDev}>
                        <AddIcon/>
                        Create New App
                    </IconButton>   
                )}

                {/* Search Textfield and Navigation Buttons */}
                <TextField sx={styles.searchAppTextfield} label={<Box sx={{display: 'flex'}}><SearchIcon/>{"Search App"}</Box>} variant="filled" onKeyDown={handleKeyDown} onChange={handleSearchInput} onSubmit={handleSearchApp}/>
                <Button onClick={displayAppsInDev} sx={{ ...styles.displayButton, ...styles.displayDevAppsButton }} color="inherit">Apps in Development</Button>
                <Button onClick={displayAppsAccessible} sx={{ ...styles.displayButton, ...styles.displayAccAppsButton }} color="inherit">Accessible Apps</Button>
                <IconButton onClick={handleProfileOpen} sx={styles.openProfileButton} color="inherit" aria-label="open profile menu">
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