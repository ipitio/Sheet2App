import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

import { getLoggedOut } from '../../auth/AuthController';

import store, { StoreState, setCurrentModalType, loadTableview } from '../../store/StoreContext';
import { Datasource, ModalType, Tableview, View } from '../../store/StoreTypes';

import styles from '../../styles/userapp/navbars/HomeNavBarStyles'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, TextField, SwipeableDrawer } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Cookies from 'js-cookie';

import { getAppById } from '../../store/StoreController';

function DatasourceNavBar() {
    const location = useLocation();
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

    useEffect(() => {
        if (app) return;

        const appId: number = location.pathname.split('/')[2] as unknown as number;

        getAppById(appId)
        .then((res) => {
            console.log(res);
        })
    });

    /* Event handlers. */
    const handleOpenView = (datasource: Datasource) => {
        dispatch(loadTableview(datasource));
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

    /** Display the list of datasources accessible to this app */
    const datasources = 
        tableviews.map((tableview) => {
            return (
                <Button onClick={() => { handleOpenView(tableview.datasource) }} sx={{width: '13vw', justifyContent:"flex-start", paddingLeft: '10%', textTransform: 'none'}}>
                    <Typography>{tableview.name}</Typography>
                </Button>
            )
        })

    return (
        <AppBar sx={styles.navBarWrapper}>
            <Toolbar>
                <SwipeableDrawer
                    open={isDrawerOpen}
                    onClose={handleCloseDrawer}
                    onOpen={handleOpenDrawer}
                >
                    {datasources}
                </SwipeableDrawer>
                <Box sx={styles.navBarContainer}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleOpenDrawer}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography sx={styles.appName}>{window.location.pathname.split('/')[2]}</Typography>

                    <TextField sx={styles.searchAppTextfield} label={<Box sx={{ display: 'flex' }}><SearchIcon />{"Search App"}</Box>} variant="filled" />

                    <Typography sx={styles.navBarTitle} variant="h6" component="div">{app?.name}</Typography>
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