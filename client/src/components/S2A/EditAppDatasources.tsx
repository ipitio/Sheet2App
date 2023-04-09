import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewDatasources, createDatasource, setCurrentDatasource, editDatasource, setCurrentColumn, StoreState } from '../../store/StoreContext';
import { Column, ColumnType, Datasource, ModalType } from '../../store/StoreTypes';

import styles from "../../styles/S2A/EditAppDatasourcesStyles";
import EditAppNavBar from "./EditAppNavBar";
import { Button, Grid, IconButton, TextField, Modal, FormControlLabel, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


function EditAppDatasources() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewDatasources());
    }, []);

    /* Redux hooks into store. */   
    //const datasources = useSelector((state: StoreState) => state.s2aReducer.datasources);
    const datasources = {}


    return (
        <div style={styles.editAppDatasourcesWrapper}>
            <EditAppNavBar/>

            <div style={{ flex: 1, overflow: 'auto', marginTop: "100px" }}>
                {/* Map each data source to a grid item. */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px'}}>
                    {datasources.map((ds) => (
                        <Grid item xs={4} key={ds.id}>
                            <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>
                                {ds.name}

                                {/* Name/Spreadsheet URL/Spreadsheet Name Textfields */}
                                <TextField variant="filled" label="Name" value={ds.name}/>
                                <TextField variant="filled" label="Spreadsheet URL" value={ds.spreadsheetURL}/>
                                <TextField variant="filled" label="Sheet Name" value={ds.sheetName}/>

                                {/* Edit Datasource Button */}
                                <IconButton onClick={() => {handleOpenEditDatasourceModal(ds)}} sx={{ position: 'absolute', top: -10, right: -5 }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </Grid>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EditAppDatasources;