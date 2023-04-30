import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { store, setCurrentDetailview, setCurrentModalType, markDetailviewToEdit, markDetailviewToDelete, StoreState} from '../../../store/StoreContext';
import { Datasource, Detailview, ModalType } from '../../../store/StoreTypes';

import styles from "../../../styles/S2A/detailviews/EditAppDetailviewsStyles";
import EditAppNavBar from "../navbars/EditAppNavBar";
import { Box, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import { viewDetailviews } from '../../../store/StoreController';

function EditAppDetailviews() {
    const navigate = useNavigate();
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewDetailviews());
    }, []);

    /* Redux hooks into store. */
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);
    const detailviews = useSelector((state: StoreState) => state.S2AReducer.detailviews);
    const currentApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);

     /* Event handlers. */

    /* If the delete icon next to a detailview is clicked. */
    const handleOpenDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteButton = event.currentTarget as HTMLButtonElement;
        const detailviewToDelete = detailviews.find(dv => dv.id === Number(deleteButton.id));

        if(detailviewToDelete) {
            dispatch(markDetailviewToDelete(detailviewToDelete));
            dispatch(setCurrentModalType(ModalType.DeleteDetailviewModal));
        }
    }
    
    /* If the edit columns icon next to a detailview is clicked. */
    const handleNavigateEditColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editColumnsButton = event.currentTarget as HTMLButtonElement;
        const detailviewOrigin = detailviews.find(dv => dv.id === Number(editColumnsButton.id));

        if(detailviewOrigin && currApp) {
            dispatch(setCurrentDetailview(detailviewOrigin));
            navigate(`/S2A/editapp/detailviews/detailviewcolumns/${currApp.id}`);
        }
    }

    /* If the edit roles icon next to a detailview is clicked. */
    const handleNavigateEditRoles = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editRolesButton = event.currentTarget as HTMLButtonElement;
        const detailviewOrigin = detailviews.find(dv => dv.id === Number(editRolesButton.id));

        if(detailviewOrigin && currApp) {
            dispatch(setCurrentDetailview(detailviewOrigin));
            navigate(`/S2A/editapp/detailviews/detailviewroles/${currApp.id}`)
        }
    }

    /* If the edit icon next to a detailview is clicked. */
    const handleOpenEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const editButton = event.currentTarget as HTMLButtonElement;
        const detailviewToEdit = detailviews.find(dv => dv.id === Number(editButton.id));

        if(detailviewToEdit) {
            dispatch(markDetailviewToEdit(detailviewToEdit));
            dispatch(setCurrentModalType(ModalType.EditDetailviewModal));
        }
    }

    return (
        <div style={styles.editAppDetailviewsWrapper}>
            {/* Edit App Navigation Bar */}
            <EditAppNavBar/>

            {/* Edit App Detailviews Display */}
            <div style={styles.editAppDetailviewsDisplay}>
            <Typography sx={{fontSize: '32px', fontWeight: 'bold'}}>
                {`${currentApp?.name} Detail Views`}
            </Typography>
                <Grid sx={styles.grid} container spacing={2}>  

                {/* Map each app detailview to a grid item. */}
                {detailviews.map((dv) => (
                    <Grid item xs={1.5} key={dv.id}>
                        <Box sx={{...styles.gridItemContainer, '&:hover': {'background': "#EEEEEE"}}}>
                            {dv.name}

                            {/* Delete, edit columns, edit roles, edit buttons for detailviews. */}
                            <IconButton id={dv.id.toString()} onClick={handleOpenDeleteModal} sx={styles.deleteDetailviewButton} title="Delete">
                                <DeleteIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton id={dv.id.toString()} onClick={handleNavigateEditColumns} sx={styles.editDetailviewColumnsButton} title="Edit Detailview Columns">
                                <ViewColumnIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton id={dv.id.toString()} onClick={handleNavigateEditRoles} sx={styles.editDetailviewRolesButton} title="Edit Detailview Roles">
                                <PeopleIcon fontSize="medium"/>
                            </IconButton>
                            <IconButton id={dv.id.toString()} onClick={handleOpenEditModal} sx={styles.editDetailviewButton} title="Edit Detailview">
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

export default EditAppDetailviews;