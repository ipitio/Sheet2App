import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import store, { viewTableviewRoles, editTableviewRoles, StoreState } from '../../../store/StoreContext';
import { Role, ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/tableviews/EditAppTableviewRolesStyles'
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Grid, Checkbox, IconButton, FormControlLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { viewAppRoles } from '../../../store/StoreController';

function EditAppTableviewRoles() {
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewAppRoles());
        dispatch(viewTableviewRoles());
    }, []);

    /* Redux hooks into store. */
    //const roles = useSelector((state: StoreState) => state.S2AReducer.roles);
    //const tableviewRoles = useSelector((state: StoreState) => state.S2AReducer.tableviewRoles);
    const roles: Role[] = [
        { name: 'Admin' },
        { name: 'User' },
        { name: 'Guest' },
        { name: 'Manager' },
        { name: 'Editor' },
        { name: 'Developer' },
        { name: 'Designer' },
        { name: 'Support' },
    ];

    const tableviewRoles : Role[] = [
        { name: 'User' },
        { name: 'Guest' },
        { name: 'Manager' },
        { name: 'Editor' },
    ];

    /* React state for tableview roles. */
    const [changedTableviewRoles, setRoles] = useState<Role[]>(tableviewRoles);

    /* Event handlers. */

     /* If the save button is clicked. */
    const handleSaveTableviewRoles = () => {
        dispatch(editTableviewRoles(changedTableviewRoles));
        dispatch(viewAppRoles());
        dispatch(viewTableviewRoles());
    }

    /* If the tableview role change checkbox is checked/unchecked. */
    const handleTableviewRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tableviewRoleCheckbox = event.currentTarget;
        const roleName = tableviewRoleCheckbox.id;
        
        /* Add to list if checked. */
        if (tableviewRoleCheckbox.checked) {
            const newTableviewRoles = [...changedTableviewRoles, { name: roleName }];
            setRoles(newTableviewRoles);
        } 
        /* Remove from list if unchecked. */
        else {
            const newTableviewRoles = [...changedTableviewRoles];
            const removalIdx = newTableviewRoles.findIndex((tableviewRole) => tableviewRole.name === roleName);
            if (removalIdx !== -1) {
                newTableviewRoles.splice(removalIdx, 1);
                setRoles(newTableviewRoles);
            }
        }
    };
      
    return (
        <div style={styles.editAppTableviewRolesWrapper}>   
            {/* Inner Navigation Bar */}
            <EditAppInnerNavBar/>

            {/* Edit App Tableview Roles Display */}
            <div style={styles.editAppTableviewRolesDisplay}>
                {/* Save Changes Button */}
                <IconButton onClick={handleSaveTableviewRoles} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>

                <Grid sx={styles.grid} container spacing={2}>
                    {/* Map each role to a grid item. */}
                    {roles.map((role) => (
                        <Grid item xs={1.5} key={role.name}>
                            <div style={styles.gridItemContainer}>
                                {/* Name */}
                                <div style={styles.columnElement}>{role.name}</div>

                                {/* Access checkbox. */}
                                <FormControlLabel
                                    control={<Checkbox id={role.name} onChange={handleTableviewRoleChange} checked={changedTableviewRoles.some(tableviewRole => tableviewRole.name === role.name)} sx={styles.columnCheckbox}/>}
                                    label="Allow Access"
                                    sx={styles.columnElement}
                                />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default EditAppTableviewRoles;