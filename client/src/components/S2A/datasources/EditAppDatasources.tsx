import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import store, { setCurrentModalType, markDatasourceToEdit, markDatasourceToDelete, StoreState, setCurrentDatasource } from '../../../store/StoreContext';
import { Column, Datasource, ModalType } from '../../../store/StoreTypes';

import styles from "../../../styles/S2A/datasources/EditAppDatasourcesStyles";
import EditAppNavBar from "../navbars/EditAppNavBar";
import { Button, Grid, IconButton, TextField, Modal, FormControlLabel, Checkbox } from '@mui/material';
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
    //const datasources = useSelector((state: StoreState) => state.S2AReducer.datasources);
    const datasources: Datasource[] = [
        {
          id: 1,
          name: 'Sales Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1aBcD123EfgHijKlmNop4567/edit#gid=0',
          sheetName: 'Sales',
        },
        {
          id: 2,
          name: 'Marketing Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/2dEfG456HijKlmNop7890/edit#gid=0',
          sheetName: 'Marketing',
        },
        {
          id: 3,
          name: 'Inventory Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/3eGhI890JklMnOq1234/edit#gid=0',
          sheetName: 'Inventory',
        },
        {
          id: 4,
          name: 'Customer Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/4fHiJ567KlmNop8901/edit#gid=0',
          sheetName: 'Customers',
        },
        {
          id: 5,
          name: 'Employee Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/5gJkL234MnoPq5678/edit#gid=0',
          sheetName: 'Employees',
        },
        {
          id: 6,
          name: 'Financial Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/6hKmN901LopQr2345/edit#gid=0',
          sheetName: 'Financials',
        },
        {
          id: 7,
          name: 'Production Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/7iJkL234MnoPq5678/edit#gid=0',
          sheetName: 'Production',
        },
        {
          id: 8,
          name: 'Quality Control Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/8jKlM345NopQr9012/edit#gid=0',
          sheetName: 'Quality Control',
        },
        {
          id: 9,
          name: 'Shipping Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/9kLnO678Pqr1234/edit#gid=0',
          sheetName: 'Shipping',
        },
        {
          id: 10,
          name: 'Vendor Data',
          spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/10mNoPqR1234Stu567/edit#gid=0',
          sheetName: 'Vendors',
        },
      ];
    
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
                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app datasource to a grid item. */}
                {datasources.map((ds) => (
                    <Grid item xs={1.5} key={ds.id}>
                        <div style={styles.gridItemContainer}>
                            {ds.name}

                            {/* Edit, delete, and edit columns buttons for datasources. */}
                            <IconButton id={ds.id.toString()} onClick={handleOpenDeleteModal} sx={styles.deleteDatasourceButton} title="Delete">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                            <IconButton id={ds.id.toString()} onClick={handleNavigateEditColumns} sx={styles.editDatasourceColumnsButton} title="Edit Datasource Columns">
                                <ViewColumnIcon fontSize="small"/>
                            </IconButton>
                            <IconButton id={ds.id.toString()} onClick={handleOpenEditModal} sx={styles.editDatasourceButton} title="Edit Datasource">
                                <EditIcon fontSize="small"/>
                            </IconButton>                         
                        </div>
                    </Grid>
                ))}
                </Grid>
            </div>
        </div>
    );
}

export default EditAppDatasources;