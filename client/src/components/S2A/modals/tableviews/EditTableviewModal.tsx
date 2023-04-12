import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewDatasources, viewTableviews, editTableview, finishEdit, StoreState} from '../../../../store/StoreContext';
import { Datasource, Tableview, ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Checkbox, Modal, TextField, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function EditTableviewModal() {
    const dispatch = useDispatch();
    
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

    const currentTableviewToEdit = useSelector((state: StoreState) => state.S2AReducer.currentTableviewToEdit);
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* React state for tableview changes. */
    const [changedTableview, setTableview] = useState<Tableview>({
        id: currentTableviewToEdit?.id ?? 0,
        name: currentTableviewToEdit?.name ?? "",
        datasource: currentTableviewToEdit?.datasource ?? {"id": 0, "name": "", "spreadsheetUrl": "", "sheetName": ""},
        canView: currentTableviewToEdit?.canView ?? false,
        canAdd: currentTableviewToEdit?.canAdd ?? false,
        canDelete: currentTableviewToEdit?.canDelete ?? false
      });

    /* Update state each time modal loads. */
    useEffect(() => {
        setTableview({
            id: currentTableviewToEdit?.id ?? 0,
            name: currentTableviewToEdit?.name ?? "",
            datasource: currentTableviewToEdit?.datasource ?? {"id": 0, "name": "", "spreadsheetUrl": "", "sheetName": ""},
            canView: currentTableviewToEdit?.canView ?? false,
            canAdd: currentTableviewToEdit?.canAdd ?? false,
            canDelete: currentTableviewToEdit?.canDelete ?? false
        });
    }, [currentTableviewToEdit]);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels edit.*/
    const handleCloseModal = () => {
        dispatch(finishEdit());
    }

    /* If the name textfield is altered. */
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameTextfield = event.currentTarget as HTMLInputElement;
        const newName = nameTextfield.value;

        setTableview({ ...changedTableview, "name": newName});
    };

    /* If the view checkbox is checked/unchecked. */
    const handleCanViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const viewCheckbox = event.currentTarget as HTMLInputElement;
        const newCanView = viewCheckbox.checked;

        setTableview({ ...changedTableview, "canView": newCanView});
    }

    /* If the add checkbox is checked/unchecked. */
    const handleCanAddChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addCheckbox = event.currentTarget as HTMLInputElement;
        const newCanAdd = addCheckbox.checked;

        setTableview({ ...changedTableview, "canAdd": newCanAdd});
    }
    
    /* If the delete checkbox is checked/unchecked. */
    const handleCanDeleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const deleteCheckbox = event.currentTarget as HTMLInputElement;
        const newCanDelete = deleteCheckbox.checked;

        setTableview({ ...changedTableview, "canDelete": newCanDelete});
    }

    /* If a datasource is selected from the drop-down menu. */
    const handleDatasourceChange = (event: React.MouseEvent<HTMLElement>) => {
        const datasourceSelect = event.currentTarget as HTMLInputElement;
        const newDatasourceName = datasourceSelect.getAttribute("data-value") ?? "";
        const newDatasource = datasources.find(ds => ds.name === newDatasourceName);

        if(newDatasource) {
            setTableview({ ...changedTableview, "datasource": newDatasource})
        }
    }

    /* If the user confirms creation, create the tableview. */
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(changedTableview);
        if(currentTableviewToEdit) {
            dispatch(editTableview(changedTableview));
            dispatch(viewTableviews());
            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.EditTableviewModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>

                {/* Tableview Name Textfield */}
                <TextField onChange={handleNameChange} variant="filled" label="Tableview Name" value={changedTableview.name} sx={styles.modalTextfield}/>
                
                {/* Tableview Datasource Drop-Down Menu */}
                <FormControl variant="outlined" sx={styles.modalDropdown}>
                    <InputLabel>Datasource</InputLabel>
                    <Select label="Datasource" value={changedTableview.datasource.name}>
                        {datasources.map((ds) => (
                            <MenuItem onClick={handleDatasourceChange} value={ds.name}>{ds.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {/* Tableview Perm Checkboxes: View/Add/Delete */}
                <FormControlLabel
                    control={<Checkbox onChange={handleCanViewChange} checked={changedTableview.canView} sx={styles.modalCheckbox}/>}
                    label="Can View"
                    sx={styles.columnElement}
                />
                <FormControlLabel
                    control={<Checkbox onChange={handleCanAddChange} checked={changedTableview.canAdd} sx={styles.modalCheckbox}/>}
                    label="Can Add"
                    sx={styles.columnElement}
                />
                <FormControlLabel
                    control={<Checkbox onChange={handleCanDeleteChange} checked={changedTableview.canDelete} sx={styles.modalCheckbox}/>}
                    label="Can Delete"
                    sx={styles.columnElement}
                />

                {/* Finish/Cancel Buttons */}
                <Button onClick={handleEdit} variant="outlined" size="large" sx={styles.modalButton}>Finish</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
        </Modal>
    );
}

export default EditTableviewModal;