import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

import { getLoggedOut } from '../../auth/AuthController';

import { StoreState, setCurrentModalType, loadTableview } from '../../store/StoreContext';
import { Datasource, ModalType, Tableview, View } from '../../store/StoreTypes';

import styles from '../../styles/S2A/HomeNavBarStyles'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, TextField, SwipeableDrawer } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';

import Cookies from 'js-cookie';

function DatasourceNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const app = useSelector((state: StoreState) => state.webAppReducer.app);
    // const tableviews = useSelector((state: StoreState) => state.webAppReducer.tableviews);

    const tableviews: View[] = [
        {
            id: 0, 
            name: "First Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 1, 
            name: "Second Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 2, 
            name: "Third Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },        {
            id: 0, 
            name: "First Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 1, 
            name: "Second Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 2, 
            name: "Third Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },        {
            id: 0, 
            name: "First Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 1, 
            name: "Second Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 2, 
            name: "Third Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },        {
            id: 0, 
            name: "First Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 1, 
            name: "Second Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        },
        {
            id: 2, 
            name: "Third Table",
            canView: true,
            datasource: {
                id: 0,
                name: "Datasource 1",
                spreadsheetUrl: "url",
                sheetName: "some sheet name"
            },
            roles: []
        }
    ]

    useEffect(() => {
        dispatch(setCurrentModalType(null));
    }, []);

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

                <SwipeableDrawer
                    open={isDrawerOpen}
                    onClose={handleCloseDrawer}
                    onOpen={handleOpenDrawer}
                >
                    {datasources}
                </SwipeableDrawer>

                <Typography sx={styles.navBarTitle} variant="h6" component="div">{app?.name}</Typography>
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

export default DatasourceNavBar;