import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import store, { StoreState } from '../../../store/StoreContext';
import { Role, ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/detailviews/EditAppDetailviewRolesStyles';
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Grid, Checkbox, IconButton, FormControlLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { editDetailviewRoles, viewAppRoles, viewDetailviewRoles } from '../../../store/StoreController';

function EditAppDetailviewRoles() {
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewAppRoles());
        dispatch(viewDetailviewRoles());
    }, []);

    /* Redux hooks into store. */
    const roles = useSelector((state: StoreState) => state.S2AReducer.roles);
    const detailviewRoles = useSelector((state: StoreState) => state.S2AReducer.detailviewRoles);
    /*const roles: Role[] = [
        { name: 'Admin' },
        { name: 'User' },
        { name: 'Guest' },
        { name: 'Manager' },
        { name: 'Editor' },
        { name: 'Developer' },
        { name: 'Designer' },
        { name: 'Support' },
    ];*/

    /*const detailviewRoles : Role[] = [
        { name: 'User' },
        { name: 'Guest' },
        { name: 'Manager' },
        { name: 'Editor' },
    ];*/

    /* React state for tableview roles. */
    const [changedDetailviewRoles, setRoles] = useState<Role[]>(detailviewRoles);

    /* Event handlers. */

    /* If the save button is clicked. */
    const handleSaveDetailviewRoles = () => {
        dispatch(editDetailviewRoles(changedDetailviewRoles))
        .then(() => {
            dispatch(viewAppRoles());
        })
        .then(() => {
            dispatch(viewDetailviewRoles());
        })
    }

    /* If the detailview role change checkbox is checked/unchecked. */
    const handleDetailviewRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const detailviewRoleCheckbox = event.currentTarget;
        const roleName = detailviewRoleCheckbox.id;
        
        /* Add to list if checked. */
        if (detailviewRoleCheckbox.checked) {
            const newDetailviewRoles = [...changedDetailviewRoles, { name: roleName }];
            setRoles(newDetailviewRoles);
        } 
        /* Remove from list if unchecked. */
        else {
            const newDetailviewRoles = [...changedDetailviewRoles];
            const removalIdx = newDetailviewRoles.findIndex((detailviewRole) => detailviewRole.name === roleName);
            if (removalIdx !== -1) {
                newDetailviewRoles.splice(removalIdx, 1);
                setRoles(newDetailviewRoles);
            }
        }
    };

    return (
        <div style={styles.editAppDetailviewRolesWrapper}>   
            {/* Inner Navigation Bar */}
            <EditAppInnerNavBar/>

            {/* Edit App Detailview Roles Display */}
            <div style={styles.editAppDetailviewRolesDisplay}>
                {/* Save Changes Button */}
                <IconButton onClick={handleSaveDetailviewRoles} sx={styles.saveButton} title="Save">
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
                                    control={<Checkbox id={role.name} onChange={handleDetailviewRoleChange} checked={changedDetailviewRoles.some(detailviewRole => detailviewRole.name === role.name)} sx={styles.columnCheckbox}/>}
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

export default EditAppDetailviewRoles;