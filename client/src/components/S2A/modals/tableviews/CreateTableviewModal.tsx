import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import store, { finishCreation, StoreState} from '../../../../store/StoreContext';
import { Datasource, ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Checkbox, Modal, TextField, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTableview, viewDatasources, viewTableviews } from '../../../../store/StoreController';

function CreateTableviewModal() {
    const dispatch = useDispatch<typeof store.dispatch>();
    
    useEffect(() => {
        dispatch(viewDatasources());
    }, []);

    /* Redux hooks into store. */
    const datasources = useSelector((state: StoreState) => state.S2AReducer.datasources);
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* React hooks into elements. */
    const tableviewNameRef = useRef<HTMLInputElement>(null);
    const datasourceNameRef = useRef<HTMLSelectElement>(null);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels creation.*/
    const handleCloseModal = () => {
        dispatch(finishCreation());
    }

    /* If the user confirms creation, create the tableview. */
    const handleCreate = () => {
        const tableviewName = tableviewNameRef?.current?.querySelector("input")?.value ?? "";
        const datasourceName = datasourceNameRef.current?.querySelector("input")?.value ?? "";
        const datasource = datasources.find(ds => ds.name === datasourceName);

        if(tableviewName && datasource) {
            dispatch(createTableview({"tableviewName": tableviewName, "datasource": datasource }))
            .then(() => {
                dispatch(viewTableviews());
            });

            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.CreateTableviewModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>

                {/* Tableview Name Textfield */}
                <TextField ref={tableviewNameRef} variant="filled" label="Tableview Name" sx={styles.modalTextfield}/>
                
                {/* Tableview Datasource Drop-Down Menu */}
                <FormControl variant="outlined" sx={styles.modalDropdown}>
                    <InputLabel>Datasource</InputLabel>
                    <Select ref={datasourceNameRef} label="Datasource">
                        {datasources.map((ds) => (
                            <MenuItem value={ds.name} key={ds.id}>{ds.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Create/Cancel Buttons */}
                <Button onClick={handleCreate} variant="outlined" size="large" sx={styles.modalButton}>Create</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
        </Modal>
    );
}

export default CreateTableviewModal;