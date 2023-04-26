import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import store, { setCurrentTableview, setCurrentModalType, markTableviewToEdit, markTableviewToDelete, StoreState} from '../../../store/StoreContext';
import { Datasource, Tableview, ModalType } from '../../../store/StoreTypes';

import styles from "../../../styles/S2A/tableviews/EditAppTableviewsStyles";
import EditAppNavBar from "../navbars/EditAppNavBar";
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import { viewTableviews } from '../../../store/StoreController';


function EditAppTableviews() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewTableviews());
    }, []);

    /* Redux hooks into store. */
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);
    //const tableviews = useSelector((state: StoreState) => state.S2AReducer.tableviews);
    
    const datasource1: Datasource = {
        id: 1,
        name: "Sales Data",
        spreadsheetUrl: "https://example.com/spreadsheet1",
        sheetName: "Sheet1"
    };
    
    const datasource2: Datasource = {
        id: 2,
        name: "Customer Data",
        spreadsheetUrl: "https://example.com/spreadsheet2",
        sheetName: "Sheet2"
    };

    const tableviews: Tableview[] = [
        {
            id: 1,
            name: "Sales Table",
            canView: true,
            canAdd: true,
            canDelete: true,
            datasource: datasource1
        },
        {
            id: 2,
            name: "Customer Table",
            canView: true,
            canAdd: false,
            canDelete: false,
            datasource: datasource2
        },
        {
            id: 3,
            name: "Inventory Table",
            canView: false,
            canAdd: false,
            canDelete: false,
            datasource: datasource1
        }
    ];

    /* Event handlers. */

    /* If the delete icon next to a tableview is clicked. */
    const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.currentTarget as HTMLButtonElement;
        const tableviewToDelete = tableviews.find(tv => tv.id === Number(deleteButton.id));

        if(tableviewToDelete) {
            dispatch(markTableviewToDelete(tableviewToDelete));
            dispatch(setCurrentModalType(ModalType.DeleteTableviewModal));
        }
    }
    
    /* If the edit columns icon next to a tableview is clicked. */
    const handleNavigateEditColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editColumnsButton = event.currentTarget as HTMLButtonElement;
        const tableviewOrigin = tableviews.find(tv => tv.id === Number(editColumnsButton.id));

        if(tableviewOrigin && currApp) {
            dispatch(setCurrentTableview(tableviewOrigin));
            navigate(`/S2A/editapp/tableviews/tableviewcolumns/${currApp.id}`);
        }
    }

    /* If the edit roles icon next to a tableview is clicked. */
    const handleNavigateEditRoles = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editRolesButton = event.currentTarget as HTMLButtonElement;
        const tableviewOrigin = tableviews.find(tv => tv.id === Number(editRolesButton.id));

        if(tableviewOrigin && currApp) {
            dispatch(setCurrentTableview(tableviewOrigin));
            navigate(`/S2A/editapp/tableviews/tableviewroles/${currApp.id}`);
        }
    }

    /* If the edit icon next to a tableview is clicked. */
    const handleOpenEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editButton = event.currentTarget as HTMLButtonElement;
        const tableviewToEdit = tableviews.find(tv => tv.id === Number(editButton.id));

        if(tableviewToEdit) {
            dispatch(markTableviewToEdit(tableviewToEdit));
            dispatch(setCurrentModalType(ModalType.EditTableviewModal));
        }
    }

    return (
        <div style={styles.editAppTableviewsWrapper}>
            {/* Edit App Navigation Bar */}
            <EditAppNavBar/>

            {/* Edit App Tableviews Display */}
            <div style={styles.editAppTableviewsDisplay}>
                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app tableview to a grid item. */}
                {tableviews.map((tv) => (
                    <Grid item xs={1.5} key={tv.id}>
                        <div style={styles.gridItemContainer}>
                            {tv.name}

                            {/* Delete, edit columns, edit roles, edit buttons for tableviews. */}
                            <IconButton id={tv.id.toString()} onClick={handleOpenDeleteModal} sx={styles.deleteTableviewButton} title="Delete">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                            <IconButton id={tv.id.toString()} onClick={handleNavigateEditColumns} sx={styles.editTableviewColumnsButton} title="Edit Tableview Columns">
                                <ViewColumnIcon fontSize="small"/>
                            </IconButton>
                            <IconButton id={tv.id.toString()} onClick={handleNavigateEditRoles} sx={styles.editTableviewRolesButton} title="Edit Tableview Roles">
                                <PeopleIcon fontSize="small"/>
                            </IconButton>
                            <IconButton id={tv.id.toString()} onClick={handleOpenEditModal} sx={styles.editTableviewButton} title="Edit Tableview">
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

export default EditAppTableviews;