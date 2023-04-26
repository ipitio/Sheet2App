import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import store, { StoreState } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes'

import styles from '../../../styles/S2A/rolesheet/EditAppRoleSheetStyles';
import EditAppNavBar from '../navbars/EditAppNavBar';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@mui/material';
import { editApp } from '../../../store/StoreController';

function EditAppRoleSheet() {
    const dispatch = useDispatch<typeof store.dispatch>();

    /* Redux hooks into store. */   
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);

    /* Event handlers. */

    /* If the textfield loses focus, update the role membership spreadsheet URL. */
    const handleChangeRoleSheet = (event: React.FocusEvent<HTMLInputElement>) => {
        if(currApp && event.target.value) {
            const newApp = { ...currApp, roleMemUrl: event.target.value};
            dispatch(editApp(newApp));
        }
    }

    return (
        <div style={styles.editAppRoleSheetWrapper}>
            {/* Edit App Navigation Bar */}
            <EditAppNavBar/>

             {/* Edit App Role Sheet Display */}
             <div style={styles.editAppRoleSheetDisplay}>
                {/* Textfield Label */}
                <div style={styles.textfieldLabel}>{"Role Membership Spreadsheet URL:"}</div>

                {/* Role Membership Spreadsheet URL Textfield */}
                <TextField onBlur={handleChangeRoleSheet} style={styles.textfield} variant="outlined"> </TextField>
            </div>
        </div>
    );
}

export default EditAppRoleSheet;