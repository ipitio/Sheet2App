import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { store, StoreState } from '../../../store/StoreContext';
import { Role, ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/tableviews/EditAppTableviewRolesStyles'
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Typography, Grid, Checkbox, IconButton, FormControlLabel, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { viewAppRoles, viewTableviewRoles, editTableviewRoles } from '../../../store/StoreController';

function EditAppTableviewRoles() {
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewAppRoles());
        dispatch(viewTableviewRoles());
    }, []);

    /* Redux hooks into store. */
    const roles = useSelector((state: StoreState) => state.S2AReducer.roles);
    const tableviewRoles = useSelector((state: StoreState) => state.S2AReducer.tableviewRoles);

    const currentTableview = useSelector((state: StoreState) => state.S2AReducer.currentTableview);

    /* React state for tableview roles. */
    const [changedTableviewRoles, setRoles] = useState<Role[]>(tableviewRoles);

    /* Ensures that the role access checkbox is reflected immediately if tableviewRoles is pulled. */
    useEffect(() => {
        setRoles(tableviewRoles);
    }, [tableviewRoles]);

    /* Event handlers. */

     /* If the save button is clicked. */
    const handleSaveTableviewRoles = () => {
        dispatch(editTableviewRoles(changedTableviewRoles))
        .then(() => {
            dispatch(viewAppRoles());
        })
        .then(() => {
            dispatch(viewTableviewRoles());
        });
    }

    /* If the tableview role change checkbox is checked/unchecked. */
    const handleTableviewRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tableviewRoleCheckbox = event.currentTarget;
        const roleName = tableviewRoleCheckbox.id;
        
        setRoles(prevState => {
            /* Add to list if checked. */
            if (tableviewRoleCheckbox.checked) {
              return [...prevState, { name: roleName }];
            }
            /* Remove from list if unchecked. */
            else {
              return prevState.filter((tableviewRole) => tableviewRole.name !== roleName);
            }
        });
    };

    /* Checks if a role is allowed access to the tableview. */
    const allowAccess = (role: Role) => {
        return changedTableviewRoles.some(tableviewRole => tableviewRole.name === role.name);
    }

    return (
        <div style={styles.editAppTableviewRolesWrapper}>   
            {/* Inner Navigation Bar */}
            <EditAppInnerNavBar/>

            {/* Edit App Tableview Roles Display */}
            <div style={styles.editAppTableviewRolesDisplay}>
                <Typography sx={{fontSize: '32px', fontWeight: 'bold'}}>
                    {`Edit Roles for ${currentTableview?.name}`}
                </Typography>

                {/* Save Changes Button */}
                <IconButton onClick={handleSaveTableviewRoles} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>

                <Grid sx={styles.grid} container spacing={2}>
                    {/* Map each role to a grid item. */}
                    {roles.map((role) => (
                        <Grid item xs={1.5} key={role.name}>
                            <Box sx={{...styles.gridItemContainer, '&:hover': {'background': "#EEEEEE"}}}>
                                {/* Name */}
                                <div style={styles.columnElement}>{role.name}</div>

                                {/* Access checkbox. */}
                                <FormControlLabel
                                    control={<Checkbox id={role.name} onChange={handleTableviewRoleChange} checked={allowAccess(role)} sx={styles.columnCheckbox}/>}
                                    label="Allow Access"
                                    sx={styles.columnElement}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default EditAppTableviewRoles;