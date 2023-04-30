import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import DatasourceNavBar from './DatasourceNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadApp } from '../../store/StoreController';
import { store, StoreState, webAppSetCurrentTableview } from '../../store/StoreContext';
import styles from '../../styles/userapp/containers/ContentContainers'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tableview } from '../../store/StoreTypes';
import { useNavigate } from 'react-router-dom';

function UserAppHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();

    const tableviews = useSelector((state: StoreState) => state.webAppReducer.tableviews)
    const app = useSelector((state: StoreState) => state.webAppReducer.app)

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(loadApp())
        .then(() => {
            setIsLoading(false);
        })
    })

    const handleOpenTableview = (tableview: Tableview) => {
        if (!app) return;

        dispatch(webAppSetCurrentTableview(tableview));
        navigate(`/userapp/${app.id}/tableview/${tableview.id}`);
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <DatasourceNavBar />
            <Typography sx={{...styles.contentContainer, fontWeight: 'bold', fontSize: '36px', justifyContent:'center', display: 'flex'}}>
                Welcome
            </Typography>
            <Typography sx={{fontSize: '18px', justifyContent:'center', display: 'flex'}}>
                Built and Powered by S2A
            </Typography>
            {isLoading ? <CircularProgress /> :
                <Grid sx={styles.grid} container spacing={2}>
                    {tableviews.map((tableview) =>
                        <Grid item xs={3}>
                            <Box sx={{ ...styles.gridItemContainer, '&:hover': { 'background': "#0062A5" } }}>
                                {tableview.name}

                                {/* Access button for views */}
                                <Button id={tableview.id.toString()} onClick={() => { handleOpenTableview(tableview) }} sx={{...styles.accessAppButton, textTransform: 'none'}} endIcon={<ChevronRightIcon />}>
                                    Open
                                </Button>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            }
        </Box>
    );
}

export default UserAppHome;