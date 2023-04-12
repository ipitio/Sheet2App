import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import { getLoggedOut } from '../../auth/AuthController';

import { setCurrentModalType } from '../../store/StoreContext';
import { ModalType } from '../../store/StoreTypes';

import styles from '../../styles/S2A/HomeNavBarStyles'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import Cookies from 'js-cookie';

function DatasourceNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const tableviews = useSelector((state: StoreState) => state.webAppReducer.tableviews);

    // useEffect(() => {
    //     dispatch(setCurrentModalType(null));
    // }, []);

    /* Event handlers. */

    /* If the create app button is clicked. */
    const handleOpenModal = () => {
        dispatch(setCurrentModalType(ModalType.CreateAppModal));
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

    return (
        <AppBar sx={styles.navBarWrapper}>
            <Toolbar>
                <Typography sx={styles.navBarTitle} variant="h6" component="div">Web App</Typography>

                {/* Nav Bar */}
                {location.pathname === "/S2A/home/develop" && (
                    <IconButton onClick={handleOpenModal} sx={styles.createAppButton}>
                        <AddIcon/>
                        Create New App
                    </IconButton>
                )}

                {/* Search Textfield and Navigation Buttons */}
                {/* <TextField sx={styles.searchAppTextfield} label="Search app" variant="filled"/> */}
                {
                    tableviews.forEach((tableview) => {
                        return (<Button>
                            tableview.
                        </Button>)
                    })
                }

                <Button onClick={() => {}} sx={{ ...styles.displayButton, ...styles.displayDevAppsButton }} color="inherit">Apps in Development</Button>
                <Button onClick={() => {}} sx={{ ...styles.displayButton, ...styles.displayAccAppsButton }} color="inherit">Accessible Apps</Button>
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