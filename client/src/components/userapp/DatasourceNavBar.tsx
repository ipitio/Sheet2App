import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

import { getLoggedOut } from '../../auth/AuthController';

import {store, StoreState, setCurrentModalType, returnToS2A, goToUserAppHome, webAppSetCurrentTableview } from '../../store/StoreContext';
import { Datasource, Tableview } from '../../store/StoreTypes';

import styles from '../../styles/userapp/navbars/HomeNavBarStyles'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, TextField, SwipeableDrawer } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Cookies from 'js-cookie';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { loadTableview } from '../../store/StoreController';

function DatasourceNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const app = useSelector((state: StoreState) => state.webAppReducer.app);
    // TODO: have the tableviews list load based on the current web app reducer
    const tableviews = useSelector((state: StoreState) => state.webAppReducer.tableviews);

    useEffect(() => {
        dispatch(setCurrentModalType(null));
    }, []);

    /* Event handlers. */
    const handleOpenTableview = (tableview: Tableview) => {
        if (!app) return;

        dispatch(webAppSetCurrentTableview(tableview));
        navigate(`/userapp/${app.id}/tableview/${tableview.id}`);    
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
        navigate("/userapp");
    };

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    }

    const handleReturnToS2A = () => {
        dispatch(returnToS2A());
        navigate('/S2A/home/access');
    }

    const handleAppHome = () => {
        if (!app) return;

        dispatch(goToUserAppHome());
        navigate(`/userapp/${app.id}/home`);
    }

    /** Display the list of datasources accessible to this app */
    const datasources = 
        tableviews.map((tableview) => {
            return (
            <Button onClick={() => { handleOpenTableview(tableview) }} sx={{ width: '13vw', justifyContent: "flex-start", paddingLeft: '10%', textTransform: 'none' }}>
                <Typography>{tableview.name}</Typography>
            </Button>)
        });
    
    return (
        <AppBar sx={styles.navBarWrapper}>
            <Toolbar>
                <SwipeableDrawer open={isDrawerOpen} onClose={handleCloseDrawer} onOpen={handleOpenDrawer}>
                    {datasources}
                </SwipeableDrawer>
                <Box sx={styles.navBarContainer}>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpenDrawer}>
                        <MenuIcon />
                    </IconButton>

                    <Button onClick={handleAppHome} sx={styles.appName}>
                        <Typography sx={{fontSize: '36px', fontWeight:'bold'}}>{app?.name}</Typography>
                    </Button>

                    <TextField sx={{...styles.searchAppTextfield}} label={<Box sx={{ display: 'flex' }}><SearchIcon />{"Search Views"}</Box>} variant="filled" />

                    <Button onClick={handleReturnToS2A} sx={{textTransform: 'none', backgroundColor: '#E0E0E0', '&:hover': {'background': "#BFBFBF"}}} startIcon={<KeyboardReturnIcon/>}>
                        <Typography>
                                Return to S2A
                        </Typography>
                    </Button>

                    <IconButton onClick={handleProfileOpen} sx={styles.openProfileButton} color="inherit">
                        <AccountCircle />
                    </IconButton>

                    {/* Search Textfield and Navigation Buttons */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
                        <MenuItem> {Cookies.get("email")} </MenuItem>
                        <MenuItem onClick={handleLogout}> Logout </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default DatasourceNavBar;