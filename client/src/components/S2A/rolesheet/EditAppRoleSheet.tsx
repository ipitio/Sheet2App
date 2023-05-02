import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {store, StoreState, setCurrentApp } from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes'

import styles from '../../../styles/S2A/rolesheet/EditAppRoleSheetStyles';
import EditAppNavBar from '../navbars/EditAppNavBar';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@mui/material';
import { editApp } from '../../../store/StoreController';

import SaveIcon from '@mui/icons-material/Save';

function EditAppRoleSheet() {
    const dispatch = useDispatch<typeof store.dispatch>();

    /* Redux hooks into store. */   
    const currApp = useSelector((state: StoreState) => state.S2AReducer.currentApp);
    const [url, setUrl] = useState('');

    /* Event handlers. */

    /* If the textfield loses focus, update the role membership spreadsheet URL. */
    const handleChangeRoleSheet = () => {
        if(currApp && url.length) {
            const newApp = { ...currApp, roleMemUrl: url};
            dispatch(editApp(newApp))
            .then(() => {
                dispatch(setCurrentApp(newApp));
            })
            .catch((e) => {
                console.log(`Could not change the role sheet! Error: ${e}`);
            })
        }
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUrl(event.target.value);
    }

    return (
        <div style={styles.editAppRoleSheetWrapper}>
            {/* Edit App Navigation Bar */}
            <EditAppNavBar/>

             {/* Edit App Role Sheet Display */}
             <div style={styles.editAppRoleSheetDisplay}>
                <IconButton onClick={handleChangeRoleSheet} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>
                {/* Textfield Label */}
                <div style={styles.textfieldLabel}>{"Role Membership Spreadsheet URL:"}</div>

                {/* Role Membership Spreadsheet URL Textfield */}
                <TextField onBlur={handleChangeRoleSheet} defaultValue={currApp?.roleMemUrl? currApp?.roleMemUrl : ''} onChange={handleTextChange} style={styles.textfield} variant="outlined"> </TextField>
            </div>
        </div>
    );
}

export default EditAppRoleSheet;