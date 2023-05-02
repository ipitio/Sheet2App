import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { store, StoreState } from '../../../store/StoreContext';
import { Role, ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/detailviews/EditAppDetailviewRolesStyles';
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Box, Grid, Checkbox, IconButton, FormControlLabel, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { editDetailviewRoles, viewAppRoles, viewDetailviewRoles } from '../../../store/StoreController';
import CircularProgress from '@mui/material/CircularProgress';

function EditAppDetailviewRoles() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(viewAppRoles())
        .then(() => {
            dispatch(viewDetailviewRoles());
        })
        .then(() => {
          setIsLoading(false);
        })
    });

    /* Redux hooks into store. */
    const roles = useSelector((state: StoreState) => state.S2AReducer.roles);
    const detailviewRoles = useSelector((state: StoreState) => state.S2AReducer.detailviewRoles);
    const currentDetailview = useSelector((state: StoreState) => state.S2AReducer.currentDetailview);

    /* React state for tableview roles. */
    const [changedDetailviewRoles, setRoles] = useState<Role[]>(detailviewRoles);

    /* Ensures that the role access checkbox is reflected immediately if detailviewRoles is pulled. */
    useEffect(() => {
        setRoles(detailviewRoles);
    }, [detailviewRoles]);

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
        
        setRoles(prevState => {
            /* Add to list if checked. */
            if (detailviewRoleCheckbox.checked) {
                return [...prevState, { name: roleName }];
            }
            /* Remove from list if unchecked. */
            else {
                return prevState.filter((detailviewRole) => detailviewRole.name !== roleName);
            }
        });
    };

    /* Checks if a role is allowed access to the tableview. */
    const allowAccess = (role: Role) => {
        return changedDetailviewRoles.some(detailviewRole => detailviewRole.name === role.name);
    }

    return (
        <div style={styles.editAppDetailviewRolesWrapper}>   
            {/* Inner Navigation Bar */}
            <EditAppInnerNavBar/>

            {/* Edit App Detailview Roles Display */}
            <div style={styles.editAppDetailviewRolesDisplay}>
            <Typography sx={{fontSize: '32px'}}>
                {`Edit Role Access for ${currentDetailview?.name}`}
            </Typography>
                {/* Save Changes Button */}
                <IconButton onClick={handleSaveDetailviewRoles} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>   

                <Grid sx={styles.grid} container spacing={2}>
                    {/* Map each role to a grid item. */}
                    {isLoading ? <CircularProgress /> :
                        roles.map((role) => (
                            <Grid item xs={1.5} key={role.name}>
                                <Box sx={{...styles.gridItemContainer, '&:hover': {'background': "#EEEEEE"}}}>
                                    {/* Name */}
                                    <div style={styles.columnElement}>{role.name}</div>

                                    {/* Access checkbox. */}
                                    <FormControlLabel
                                        control={<Checkbox id={role.name} onChange={handleDetailviewRoleChange} checked={allowAccess(role)} sx={styles.columnCheckbox} />}
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

export default EditAppDetailviewRoles;