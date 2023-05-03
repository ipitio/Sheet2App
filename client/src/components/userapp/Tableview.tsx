import { Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useDispatch, useSelector } from 'react-redux';
import { store, StoreState, showAddRecordModal, showDeleteRecordModal, setFirstRecordColumns, setRecords, setCurrentRecordIndex, setCurrentRecordViewableData } from '../../store/StoreContext';
import { useEffect, useState } from 'react';
import DatasourceNavBar from './DatasourceNavBar';
import { loadDetailview, loadTableview } from '../../store/StoreController';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../../styles/userapp/containers/ContentContainers';
import Cookies from 'js-cookie';

function Tableview() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const navigate = useNavigate();

    const app = useSelector((state: StoreState) => state.webAppReducer.app);
    const records = useSelector((state: StoreState) => state.webAppReducer.records);
    const columns = useSelector((state: StoreState) => state.webAppReducer.columns);
    const currentRecordIndex = useSelector((state: StoreState) => state.webAppReducer.currentRecordIndex);

    const filterColumns = useSelector((state: StoreState) => state.webAppReducer.filterColumns);
    const userFilterColumns = useSelector((state: StoreState) => state.webAppReducer.userFilterColumns);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(loadTableview())
            .then(() => {
                setIsLoading(false);
            })
    })

    const columnNames = columns.map((col) => { return col.name });

    const handleShowDeleteModal = (index: number) => {
        dispatch(setCurrentRecordIndex(index));
        dispatch(showDeleteRecordModal());
    }

    const handleShowAddRecordModal = () => {
        dispatch(showAddRecordModal());
    }

    const handleOpenDetailview = (index: number) => {
        dispatch(setCurrentRecordIndex(index));
        dispatch(loadDetailview());
        //TODO: replace index with detailview id
        navigate(`/userapp/${app?.id}/detailview/${index}`);
    }

    let colorCounter = 0;

    let formattedData = records?.map((record, index) => {
        if (filterColumns && filterColumns[index] && filterColumns[index].toLowerCase() == 'false') return ([<></>]);
        if (userFilterColumns && userFilterColumns[index] && userFilterColumns[index].toLowerCase() != 'none' && userFilterColumns[index].toLowerCase() != '' && Cookies.get("email") != userFilterColumns[index]) return ([<></>]);

        let bgColor = ((colorCounter % 2 == 0) ? '#E0E0E0' : '#FFFFFF');
        let rounded = index == records.length - 1 ? '8px' : '0px';
        colorCounter++;

        return (
            record.map((entry, index) => (
                <Grid item xs={1} sx={{ bgcolor: bgColor, borderBottomLeftRadius: rounded, borderBottomRightRadius: rounded }}>
                    {columns && columns[index] && columns[index].type == 'URL' ? (
                        <Typography sx={{ textAlign: 'center' }}><NavLink to={entry} target="_blank">{entry}</NavLink></Typography>
                    ) : columns && columns[index] && columns[index].isRef ? (
                        <Typography sx={{ textAlign: 'center' }}><NavLink to={entry} target="_blank">{entry}</NavLink></Typography>
                    ) : (
                        <Typography sx={{ textAlign: 'center' }}>{entry}</Typography>
                    )
                    }
                </Grid>
            ))
        )
    });

    colorCounter = 0;
    /** Add the View and Delete buttons for each record */
    for (let i = 0; i < formattedData.length; i++) {
        if (filterColumns && filterColumns[i] && filterColumns[i].toLowerCase() == 'false') {
            formattedData[i].push(<></>);
            continue;
        }
        if (userFilterColumns && userFilterColumns[i] && userFilterColumns[i].toLowerCase() != 'none' && userFilterColumns[i].toLowerCase() != '' && Cookies.get("email") != userFilterColumns[i]) {
            formattedData[i].push(<></>);
            continue;
        }

        let bgColor = ((colorCounter % 2 == 0) ? '#E0E0E0' : '#FFFFFF');
        colorCounter++;

        formattedData[i].push(
            <Grid item xs={0.5} sx={{justifyContent: 'center', bgcolor: bgColor, borderLeft: 1}}>
                <Button sx={{ justifyContent: 'center' }} onClick={() => { handleOpenDetailview(i + 1) }} disabled={!store.getState().webAppReducer.currentDetailview}>
                    <UnfoldMoreIcon/>
                    <Typography>
                        View
                    </Typography>
                </Button>
            </Grid>
        )

        formattedData[i].push(
            <Grid item xs={0.5} sx={{justifyContent: 'center', bgcolor: bgColor}}>
                <Button sx={{ justifyContent: 'center'}} onClick={() => { handleShowDeleteModal(i + 1)}} disabled={!store.getState().webAppReducer.currentTableview.canDelete}>
                    <DeleteOutlineIcon />
                    <Typography>
                        Delete
                    </Typography>
                </Button>
            </Grid>
        )
    }

    /** Insert the column headers */
    formattedData.unshift(
        columnNames.map((columnHeader) => {
            return (
                <Grid item xs={1}><Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '32px' }}>{columnHeader}</Typography></Grid>
            )
        })
    )

    /** Insert a filler cell for the column headers */
    formattedData[0].splice(columnNames.length, 0, <Grid item xs={1} sx={{ borderLeft: 1}}/>)

    const table =
        <Grid container columns={columnNames.length + 1} rowSpacing="8px" sx={{ border: 1, borderRadius: '8px', borderColor: 'black' }}>
            {formattedData}
        </Grid >

    const addRecordButton = (
        <Button startIcon={<AddCircleOutlineIcon />} sx={{ border: 1, width: '15%', marginTop: '32px', bgcolor: '#1976d2', color: 'white', '&:hover': { 'background': "#0062A5" } }} onClick={handleShowAddRecordModal} disabled={!store.getState().webAppReducer.currentTableview.canAdd}>
            <Typography>
                Add Record
            </Typography>
        </Button>
    )

    return (
        <Box>
            <DatasourceNavBar />
            {isLoading ? <CircularProgress sx={styles.contentContainer} /> :
                <Box sx={{ ...styles.contentContainer, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {table}
                    {addRecordButton}
                </Box>
            }
        </Box>
    );
}

export default Tableview;