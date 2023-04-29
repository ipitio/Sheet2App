import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import store, { setCurrentModalType, markDatasourceToEdit, markDatasourceToDelete, StoreState, setCurrentDatasource } from '../../../store/StoreContext';
import { Column, Datasource, ModalType } from '../../../store/StoreTypes';

import styles from "../../../styles/S2A/datasources/EditAppDatasourcesStyles";
import EditAppNavBar from "../navbars/EditAppNavBar";
import { Box, Typography, Button, Grid, IconButton, TextField, Modal, FormControlLabel, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { viewDatasources } from '../../../store/StoreController';

function EditAppDatasources() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewDatasources());
    }, []);

    /* Redux hooks into store. */
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);
    const datasources = useSelector((state: StoreState) => state.S2AReducer.datasources);
    /* Event handlers. */
    
    /* If the delete icon next to a datasource is clicked. */
    const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.currentTarget as HTMLButtonElement;
        const datasourceToDelete = datasources.find(ds => ds.id === Number(deleteButton.id));

        if(datasourceToDelete) {
            dispatch(markDatasourceToDelete(datasourceToDelete));
            dispatch(setCurrentModalType(ModalType.DeleteDatasourceModal));
        }
    }
    
    /* If the edit columns icon next to a datasource is clicked. */
    const handleNavigateEditColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editColumnsButton = event.currentTarget as HTMLButtonElement;
        const datasourceOrigin = datasources.find(ds => ds.id === Number(editColumnsButton.id));

        if(datasourceOrigin && currApp) {
            dispatch(setCurrentDatasource(datasourceOrigin));
            navigate(`/S2A/editapp/datasources/datasourcecolumns/${currApp.id}`)
        }
    }

    /* If the edit icon next to a datasource is clicked. */
    const handleOpenEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
      const editButton = event.currentTarget as HTMLButtonElement;
      const datasourceToEdit = datasources.find(ds => ds.id === Number(editButton.id));

      if(datasourceToEdit) {
          dispatch(markDatasourceToEdit(datasourceToEdit));
          dispatch(setCurrentModalType(ModalType.EditDatasourceModal));
      }
    }
 
    return (
        <div style={styles.editAppDatasourcesWrapper}>
            {/* Edit App Navigation Bar */}
            <EditAppNavBar/>

            {/* Edit App Datasources Display */}
            <div style={styles.editAppDatasourcesDisplay}>
                <Typography sx={{fontSize: '32px', fontWeight: 'bold'}}>
                  {`${currApp?.name} Datasources`}
                </Typography>

                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app datasource to a grid item. */}
                {datasources.map((ds) => (
                    <Grid item xs={1.5} key={ds.id}>
                    <Box sx={{...styles.gridItemContainer, '&:hover': {'background': "#EEEEEE"}}}>
                            {ds.name}

                            {/* Edit, delete, and edit columns buttons for datasources. */}
                            <IconButton id={ds.id.toString()} onClick={handleOpenDeleteModal} sx={styles.deleteDatasourceButton} title="Delete">
                                <DeleteIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton id={ds.id.toString()} onClick={handleNavigateEditColumns} sx={styles.editDatasourceColumnsButton} title="Edit Datasource Columns">
                                <ViewColumnIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton id={ds.id.toString()} onClick={handleOpenEditModal} sx={styles.editDatasourceButton} title="Edit Datasource">
                                <EditIcon fontSize="medium"/>
                            </IconButton>                         
                        </Box>
                    </Grid>
                ))}
                </Grid>
            </div>
        </div>
    );
}

export default EditAppDatasources;