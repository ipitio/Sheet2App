import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {store,finishCreation, StoreState} from '../../../../store/StoreContext';
import { Datasource, ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Checkbox, Modal, TextField, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createDetailview, viewDatasources, viewDetailviews } from '../../../../store/StoreController';

function CreateDetailviewModal() {
    const dispatch = useDispatch<typeof store.dispatch>();
    
    useEffect(() => {
        dispatch(viewDatasources());
    }, []);

    /* Redux hooks into store. */
    const datasources = useSelector((state: StoreState) => state.S2AReducer.datasources);
    /*const datasources: Datasource[] = [
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
        }
    ];*/

    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* React hooks into elements. */
    const detailviewNameRef = useRef<HTMLInputElement>(null);
    const datasourceNameRef = useRef<HTMLSelectElement>(null);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels creation.*/
    const handleCloseModal = () => {
        dispatch(finishCreation());
    }

    /* If the user confirms creation, create the detailview. */
    const handleCreate = () => {
        const detailviewName = detailviewNameRef?.current?.querySelector("input")?.value ?? "";
        const datasourceName = datasourceNameRef.current?.querySelector("input")?.value ?? "";
        const datasource = datasources.find(ds => ds.name === datasourceName);

        if(detailviewName && datasource) {
            dispatch(createDetailview({"detailviewName": detailviewName, "datasource": datasource }))
            .then(() => {
                dispatch(viewDetailviews());
            })
            handleCloseModal();
        } 
    }

    return (
        <Modal open={currentModalType == ModalType.CreateDetailviewModal} onClose={handleCloseModal} sx={styles.modal}>
           <div style={styles.modalContainer}>

               {/* Detailview Name Textfield */}
               <TextField ref={detailviewNameRef} variant="filled" label="Detailview Name" sx={styles.modalTextfield}/>
               
               {/* Detailview Datasource Drop-Down Menu */}
               <FormControl variant="outlined" sx={styles.modalDropdown}>
                   <InputLabel>Datasource</InputLabel>
                   <Select ref={datasourceNameRef} label="Datasource">
                       {datasources.map((ds) => (
                           <MenuItem value={ds.name}>{ds.name}</MenuItem>
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

export default CreateDetailviewModal;