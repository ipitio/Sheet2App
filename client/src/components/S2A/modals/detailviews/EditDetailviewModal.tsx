import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import store, { finishEdit, StoreState} from '../../../../store/StoreContext';
import { Datasource, Detailview, ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Checkbox, Modal, TextField, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { editDetailview, viewDatasources, viewDetailviews } from '../../../../store/StoreController';

function EditDetailviewModal() {
    const dispatch = useDispatch<typeof store.dispatch>();
    
    useEffect(() => {
        dispatch(viewDatasources());
    }, []);

    /* Redux hooks into store. */
    //const datasources = useSelector((state: StoreState) => state.S2AReducer.datasources);
    const datasources: Datasource[] = [
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
    ];

    const currentDetailviewToEdit = useSelector((state: StoreState) => state.S2AReducer.currentDetailviewToEdit);
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

     /* React state for detailview changes. */
     const [changedDetailview, setDetailview] = useState<Detailview>({
        id: currentDetailviewToEdit?.id ?? 0,
        name: currentDetailviewToEdit?.name ?? "",
        datasource: currentDetailviewToEdit?.datasource ?? {"id": 0, "name": "", "spreadsheetUrl": "", "sheetName": ""},
        canView: currentDetailviewToEdit?.canView ?? false,
        canEdit: currentDetailviewToEdit?.canEdit ?? false,
    });

    /* Update state each time modal loads. */
    useEffect(() => {
        setDetailview({
            id: currentDetailviewToEdit?.id ?? 0,
            name: currentDetailviewToEdit?.name ?? "",
            datasource: currentDetailviewToEdit?.datasource ?? {"id": 0, "name": "", "spreadsheetUrl": "", "sheetName": ""},
            canView: currentDetailviewToEdit?.canView ?? false,
            canEdit: currentDetailviewToEdit?.canEdit ?? false,
        });
    }, [currentDetailviewToEdit]);

     /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels edit.*/
    const handleCloseModal = () => {
        dispatch(finishEdit());
    }

    /* If the name textfield is altered. */
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameTextfield = event.currentTarget as HTMLInputElement;
        const newName = nameTextfield.value;

        setDetailview({ ...changedDetailview, "name": newName});
    };

    /* If the view checkbox is checked/unchecked. */
    const handleCanViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const viewCheckbox = event.currentTarget as HTMLInputElement;
        const newCanView = viewCheckbox.checked;

        setDetailview({ ...changedDetailview, "canView": newCanView});
    }

    /* If the edit checkbox is checked/unchecked. */
    const handleCanEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const editCheckbox = event.currentTarget as HTMLInputElement;
        const newCanEdit = editCheckbox.checked;

        setDetailview({ ...changedDetailview, "canEdit": newCanEdit});
    }

    /* If a datasource is selected from the drop-down menu. */
    const handleDatasourceChange = (event: React.MouseEvent<HTMLElement>) => {
        const datasourceSelect = event.currentTarget as HTMLInputElement;
        const newDatasourceName = datasourceSelect.getAttribute("data-value") ?? "";
        const newDatasource = datasources.find(ds => ds.name === newDatasourceName);

        if(newDatasource) {
            setDetailview({ ...changedDetailview, "datasource": newDatasource})
        }
    }

    /* If the user confirms creation, create the detailview. */
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentDetailviewToEdit) {
            dispatch(editDetailview(changedDetailview))
            .then(() => {
                dispatch(viewDetailviews());
            });
            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.EditDetailviewModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>

                {/* Detailview Name Textfield */}
                <TextField onChange={handleNameChange} variant="filled" label="Detailview Name" value={changedDetailview.name} sx={styles.modalTextfield}/>
                
                {/* Detailview Datasource Drop-Down Menu */}
                <FormControl variant="outlined" sx={styles.modalDropdown}>
                    <InputLabel>Datasource</InputLabel>
                    <Select label="Datasource" value={changedDetailview.datasource.name}>
                        {datasources.map((ds) => (
                            <MenuItem onClick={handleDatasourceChange} value={ds.name}>{ds.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {/* Detailview Perm Checkboxes: View/Edit */}
                <FormControlLabel
                    control={<Checkbox onChange={handleCanViewChange} checked={changedDetailview.canView} sx={styles.modalCheckbox}/>}
                    label="Can View"
                    sx={styles.columnElement}
                />
                <FormControlLabel
                    control={<Checkbox onChange={handleCanEditChange} checked={changedDetailview.canEdit} sx={styles.modalCheckbox}/>}
                    label="Can Edit"
                    sx={styles.columnElement}
                />

                {/* Finish/Cancel Buttons */}
                <Button onClick={handleEdit} variant="outlined" size="large" sx={styles.modalButton}>Finish</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
        </Modal>
    );
}

export default EditDetailviewModal;