import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewDatasourceColumns, editDatasourceColumns, StoreState } from '../../store/StoreContext';
import { Column, ModalType } from '../../store/StoreTypes';

import styles from '../../styles/S2A/EditAppDatasourceColumnsStyles';
import EditColumnsNavBar from "./EditColumnsNavBar";
import { Grid, Checkbox, IconButton, TextField, FormControl, FormControlLabel, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function EditAppDatasourceColumns() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(viewDatasourceColumns());
    }, []);

    /* Redux hooks into store. */
    //const datasourceColumns = useSelector((state: StoreState) => state.S2AReducer.datasourceColumns);
    const datasourceColumns: Column[] = [
        {
          id: 1,
          name: 'Column 1',
          initialValue: 'Initial value 1',
          isLabel: true,
          isRef: false,
          type: 'Text',
          isFilter: true,
          isUserFilter: false,
          isEditFilter: true,
          viewable: true,
          editable: false
        },
        {
          id: 2,
          name: 'Column 2',
          initialValue: 'Initial value 2',
          isLabel: false,
          isRef: true,
          type: 'Number',
          isFilter: false,
          isUserFilter: true,
          isEditFilter: false,
          viewable: null,
          editable: null
        },
        {
          id: 3,
          name: 'Column 3',
          initialValue: '',
          isLabel: false,
          isRef: false,
          type: 'URL',
          isFilter: true,
          isUserFilter: true,
          isEditFilter: false,
          viewable: false,
          editable: true
        },
        {
          id: 4,
          name: 'Column 4',
          initialValue: '',
          isLabel: false,
          isRef: false,
          type: 'Text',
          isFilter: true,
          isUserFilter: false,
          isEditFilter: false,
          viewable: true,
          editable: false
        },
        {
          id: 5,
          name: 'Column 5',
          initialValue: '',
          isLabel: true,
          isRef: false,
          type: 'Number',
          isFilter: false,
          isUserFilter: true,
          isEditFilter: false,
          viewable: null,
          editable: null
        },
        {
          id: 6,
          name: 'Column 6',
          initialValue: '',
          isLabel: false,
          isRef: true,
          type: 'Text',
          isFilter: true,
          isUserFilter: true,
          isEditFilter: false,
          viewable: false,
          editable: true
        },
        {
          id: 7,
          name: 'Column 7',
          initialValue: '',
          isLabel: false,
          isRef: false,
          type: 'URL',
          isFilter: false,
          isUserFilter: false,
          isEditFilter: true,
          viewable: true,
          editable: true
        },
        {
          id: 8,
          name: 'Column 8',
          initialValue: 'Initial value 8',
          isLabel: true,
          isRef: false,
          type: 'Text',
          isFilter: false,
          isUserFilter: false,
          isEditFilter: true,
          viewable: false,
          editable: false
        },
        {
          id: 9,
          name: 'Column 9',
          initialValue: '',
          isLabel: false,
          isRef: true,
          type: 'Number',
          isFilter: true,
          isUserFilter: true,
          isEditFilter: false,
          viewable: null,
          editable: null
        },
        {
          id: 10,
          name: 'Column 10',
          initialValue: '',
          isLabel: false,
          isRef: false,
          type: 'Text',
          isFilter: true,
          isUserFilter: false,
          isEditFilter: false,
          viewable: false,
          editable: true
        },
        {
            id: 11,
            name: 'Column 11',
            initialValue: '',
            isLabel: false,
            isRef: false,
            type: 'Text',
            isFilter: true,
            isUserFilter: true,
            isEditFilter: false,
            viewable: false,
            editable: true
          },
          {
            id: 12,
            name: 'Column 12',
            initialValue: '',
            isLabel: false,
            isRef: true,
            type: 'Number',
            isFilter: true,
            isUserFilter: false,
            isEditFilter: false,
            viewable: null,
            editable: null
          },
          {
            id: 13,
            name: 'Column 13',
            initialValue: '',
            isLabel: false,
            isRef: false,
            type: 'URL',
            isFilter: false,
            isUserFilter: false,
            isEditFilter: true,
            viewable: true,
            editable: true
          },
          {
            id: 14,
            name: 'Column 14',
            initialValue: '',
            isLabel: true,
            isRef: false,
            type: 'Text',
            isFilter: false,
            isUserFilter: false,
            isEditFilter: true,
            viewable: false,
            editable: false
          },
          {
            id: 15,
            name: 'Column 15',
            initialValue: '',
            isLabel: false,
            isRef: true,
            type: 'Number',
            isFilter: true,
            isUserFilter: true,
            isEditFilter: false,
            viewable: null,
            editable: null
          },
          {
            id: 16,
            name: 'Column 16',
            initialValue: '',
            isLabel: false,
            isRef: false,
            type: 'Text',
            isFilter: true,
            isUserFilter: false,
            isEditFilter: false,
            viewable: false,
            editable: true
          },
          {
            id: 17,
            name: 'Column 17',
            initialValue: '',
            isLabel: false,
            isRef: false,
            type: 'URL',
            isFilter: true,
            isUserFilter: true,
            isEditFilter: false,
            viewable: false,
            editable: false
          },
          {
            id: 18,
            name: 'Column 18',
            initialValue: '',
            isLabel: false,
            isRef: true,
            type: 'Number',
            isFilter: false,
            isUserFilter: false,
            isEditFilter: true,
            viewable: true,
            editable: true
          },
          {
            id: 19,
            name: 'Column 19',
            initialValue: '',
            isLabel: false,
            isRef: false,
            type: 'Text',
            isFilter: false,
            isUserFilter: true,
            isEditFilter: false,
            viewable: null,
            editable: null
          },
          {
            id: 20,
            name: 'Column 20',
            initialValue: '',
            isLabel: true,
            isRef: false,
            type: 'URL',
            isFilter: true,
            isUserFilter: false,
            isEditFilter: false,
            viewable: false,
            editable: true
          },
     ]

    /* React state for datasource columns. */
    const [changedColumns, setColumns] = useState<Column[]>(datasourceColumns);
    
    /* Event handlers. */

    /* If the save button is clicked. */
    const handleSaveDatasourceColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(editDatasourceColumns(changedColumns));
        dispatch(viewDatasourceColumns());
    }

    /* If the initial value textfield is altered. */
    const handleInitialValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const initialValueTextfield = event.currentTarget as HTMLInputElement;
        const colToEditIdx = datasourceColumns.findIndex(col => col.id === Number(initialValueTextfield.id));
        const newInitialValue = initialValueTextfield.value;

        if(colToEditIdx != -1) {
            const newColumns = [...changedColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], initialValue: newInitialValue};
            setColumns(newColumns);
        }
    };

    /* If the label checkbox is checked/unchecked. */
    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const labelCheckbox = event.currentTarget as HTMLInputElement;
        const colToEditIdx = datasourceColumns.findIndex(col => col.id === Number(labelCheckbox.id));
        const newLabel = labelCheckbox.checked;

        if(colToEditIdx != -1) {
            const newColumns = [...changedColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], isLabel: newLabel};
            setColumns(newColumns);
        }
    }

    /* If the reference checkbox is checked/unchecked. */
    const handleRefChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const refCheckbox = event.currentTarget as HTMLInputElement;
        const colToEditIdx = datasourceColumns.findIndex(col => col.id === Number(refCheckbox.id));
        const newRef = refCheckbox.checked;

        if(colToEditIdx != -1) {
            const newColumns = [...changedColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], isRef: newRef};
            setColumns(newColumns);
        }
    }

    /* If a type is selected from the drop-down menu. */
    const handleTypeChange = (event: React.MouseEvent<HTMLElement>) => {
        const typeSelect = event.currentTarget as HTMLSelectElement;
        const colToEditIdx = datasourceColumns.findIndex(col => col.id === Number(typeSelect.id));
        const newType = typeSelect.getAttribute("data-value") ?? "Number";

        if(colToEditIdx !== -1) {
            const newColumns = [...changedColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], type: newType};
            setColumns(newColumns); 
        }
    }

    return (
        <div style={styles.editAppDatasourceColumnsWrapper}>
            {/* Navigation Bar for Columns */}
            <EditColumnsNavBar/>

            {/* Edit App Datasource Columns Display */}
            <div style={styles.editAppDatasourceColumnsDisplay}>
                {/* Save Changes Button */}
                <IconButton onClick={handleSaveDatasourceColumns} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>

                <Grid sx={styles.grid} container spacing={2}>  
                    {/* Map each datasource column to a grid item. */}
                    {changedColumns.map((col) => (
                        <Grid item xs={1.5} key={col.id}>
                            <div style={styles.gridItemContainer}>
                                {/* Name*/}
                                <div style={styles.columnElement}> {col.name} </div>

                                {/* Initial Value Textfield */}    
                                <TextField id={col.id.toString()} onChange={handleInitialValueChange} variant="outlined" label="Initial Value" value={col.initialValue} sx={styles.columnElement}/>

                                {/* Type Dropdown Menu */}
                                <FormControl variant="outlined" sx={styles.columnElement}>
                                    <InputLabel>Type</InputLabel>
                                    <Select label="Type" value={col.type}>
                                        <MenuItem id={col.id.toString()} onClick={handleTypeChange} value="Boolean">Boolean</MenuItem>
                                        <MenuItem id={col.id.toString()} onClick={handleTypeChange} value="Number">Number</MenuItem>
                                        <MenuItem id={col.id.toString()} onClick={handleTypeChange} value="Text">Text</MenuItem>
                                        <MenuItem id={col.id.toString()} onClick={handleTypeChange} value="URL">URL</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Label/Reference Checkboxes */}
                                <FormControlLabel
                                    control={<Checkbox id={col.id.toString()} onChange={handleLabelChange} checked={col.isLabel} sx={styles.columnCheckbox}/>}
                                    label="Label"
                                    sx={styles.columnElement}
                                />
                                <FormControlLabel
                                    control={<Checkbox id={col.id.toString()} onChange={handleRefChange} checked={col.isRef} sx={styles.columnCheckbox}/>}
                                    label="Reference"
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

export default EditAppDatasourceColumns;