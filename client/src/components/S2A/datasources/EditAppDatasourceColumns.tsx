import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { store, StoreState } from '../../../store/StoreContext';
import { Column, ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/datasources/EditAppDatasourceColumnsStyles';
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Typography, Grid, Checkbox, IconButton, TextField, FormControl, FormControlLabel, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { editDatasourceColumns, viewDatasourceColumns } from '../../../store/StoreController';

function EditAppDatasourceColumns() {
    const dispatch = useDispatch<typeof store.dispatch>();
    
    useEffect(() => {
        dispatch(viewDatasourceColumns());
    }, []);

    /* Redux hooks into store. */
    const storeDatasourceColumns = useSelector((state: StoreState) => state.S2AReducer.datasourceColumns);
    const datasource = useSelector((state: StoreState) =>  state.S2AReducer.currentDatasource);

    /* React state hooks. */
    const [datasourceColumns, setDatasourceColumns] = useState(JSON.parse(JSON.stringify(storeDatasourceColumns)) as Column[]);
    const [keyColExists, setKeyColExists] = useState(storeDatasourceColumns.some(col => col.isKey));
    const [labelColExists, setLabelColExists] = useState(storeDatasourceColumns.some(col => col.isLabel));

    /* Ensures that all state variables are updated upon change of store's datasourceColumns. */
    useEffect(() => {
        setDatasourceColumns(storeDatasourceColumns);
        setKeyColExists(storeDatasourceColumns.some(col => col.isKey));
        setLabelColExists(storeDatasourceColumns.some(col => col.isLabel));
    }, [storeDatasourceColumns]);

    /* If the save button is clicked. */
    const handleSaveDatasourceColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(editDatasourceColumns(datasourceColumns))
        .then(() => {
          dispatch(viewDatasourceColumns());
        });
    }

    /* If the initial value textfield is altered. */
    const handleInitialValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const initialValueTextfield = event.currentTarget as HTMLInputElement;
        const colToEditIdx = storeDatasourceColumns.findIndex(col => col.id === Number(initialValueTextfield.id));
        const newInitialValue = initialValueTextfield.value;

        if(colToEditIdx != -1) {
            const newColumns = [...datasourceColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], initialValue: newInitialValue};
        
            setDatasourceColumns(newColumns);    
        }
    };

    /* If the key checkbox is checked/unchecked. */
    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const labelCheckbox = event.currentTarget as HTMLInputElement;
        const colToEditIdx = storeDatasourceColumns.findIndex(col => col.id === Number(labelCheckbox.id));
        const newKey = labelCheckbox.checked;
        
        if(colToEditIdx != -1) {
            const newColumns = [...datasourceColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], isKey: newKey};
            
            setDatasourceColumns(newColumns);    
            setKeyColExists(newKey);
        }
    }

    /* If the label checkbox is checked/unchecked. */
    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const labelCheckbox = event.currentTarget as HTMLInputElement;
        const colToEditIdx = storeDatasourceColumns.findIndex(col => col.id === Number(labelCheckbox.id));
        const newLabel = labelCheckbox.checked;

        if(colToEditIdx != -1) {
            const newColumns = [...datasourceColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], isLabel: newLabel};
        
            setDatasourceColumns(newColumns);    
            setLabelColExists(newLabel);
        }
    }

    /* If the reference checkbox is checked/unchecked. */
    const handleRefChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const refCheckbox = event.currentTarget as HTMLInputElement;
        const colToEditIdx = storeDatasourceColumns.findIndex(col => col.id === Number(refCheckbox.id));
        const newRef = refCheckbox.checked;

        if(colToEditIdx != -1) {
            const newColumns = [...datasourceColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], isRef: newRef};
          
            setDatasourceColumns(newColumns);    
        }
    }

    /* If a type is selected from the drop-down menu. */
    const handleTypeChange = (event: React.MouseEvent<HTMLElement>) => {
        const typeSelect = event.currentTarget as HTMLSelectElement;
        const colToEditIdx = storeDatasourceColumns.findIndex(col => col.id === Number(typeSelect.id));
        const newType = typeSelect.getAttribute("data-value") ?? "Number";

        if(colToEditIdx !== -1) {
            const newColumns = [...datasourceColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], type: newType};

            setDatasourceColumns(newColumns);    
        }
    }

    return (
        <div style={styles.editAppDatasourceColumnsWrapper}>
            {/* Inner Navigation Bar */}
            <EditAppInnerNavBar/>

            {/* Edit App Datasource Columns Display */}
            <div style={styles.editAppDatasourceColumnsDisplay}>
                <Typography sx={{fontSize: '32px', fontWeight: 'bold'}}>
                    {`Edit Columns for ${datasource?.name}`}
                </Typography>
                {/* Save Changes Button */}
                <IconButton onClick={handleSaveDatasourceColumns} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>

                <Grid sx={styles.grid} container spacing={2}>  
                    {/* Map each datasource column to a grid item. */}
                    {datasourceColumns.map((col) => (
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
                                    control={<Checkbox id={col.id.toString()} onChange={handleKeyChange} disabled={!col.isKey && keyColExists} checked={col.isKey} sx={styles.columnCheckbox}/>}
                                    label="Key"
                                    sx={styles.columnElement}
                                />
                                <FormControlLabel
                                    control={<Checkbox id={col.id.toString()} onChange={handleLabelChange} disabled={!col.isLabel && labelColExists} checked={col.isLabel} sx={styles.columnCheckbox}/>}
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