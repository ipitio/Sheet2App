import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewTableviewColumns, editTableviewColumns, StoreState } from '../../../store/StoreContext';
import { Column } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/tableviews/EditAppTableviewColumnsStyles'
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Grid, Checkbox, IconButton, TextField, FormControlLabel, InputLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function EditAppTableviewColumns() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewTableviewColumns());
    }, []);

    /* Redux hooks into store. */
    //const tableviewColumns = useSelector((state: StoreState) => state.S2AReducer.tableviewColumns);
    //const filterColumn = useSelector((state: StoreState) => state.S2AReducer.filterColumn);
    //const userFilterColumn = useSelector((state: StoreState) => state.S2AReducer.userFilterColumn);

    const tableviewColumns: Column[] = [
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

    const filterColumn = [true, true, true, false, false, true, false, true, false, true];
    const userFilterColumn = ["johndoe@gmail.com", "janedoe@yahoo.com", "bobsmith@hotmail.com", "lisa.white@outlook.com", "markjohnson@gmail.com", "sarahbrown@yahoo.com", "davidlee@hotmail.com", "jennifer.nguyen@outlook.com", "michael.gonzalez@gmail.com", "elizabeth.wang@yahoo.com"];

    /* React state for conditional rendering. */
    const [display, setDisplay] = useState<string>("Columns");

    /* React state for tableview columns. */
    const [changedColumns, setColumns] = useState<Column[]>(tableviewColumns);
    const [changedFilter, setFilter] = useState<boolean[] | null>(filterColumn);
    const [changedUserFilter, setUserFilter] = useState<string[] | null>(userFilterColumn);

    /* Event handlers. */

    /* If the swap button is clicked. */
    const handleSwapDisplay = () => {
        if(display === "Columns")  {
            setDisplay("Filters");
        }
        if(display === "Filters") {
            setDisplay("Columns");
        }
    }

    /* If the save button is clicked. */
    const handleSaveTableviewColumns = () => {
        dispatch(editTableviewColumns({"tableviewColumns": changedColumns, "filterColumn": filterColumn, "userFilterColumn": userFilterColumn}));
        dispatch(viewTableviewColumns());
    }

    /* If the viewable checkbox is checked/unchecked. */
    const handleViewableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const viewableCheckbox = event.currentTarget as HTMLInputElement;
        const colToEditIdx = changedColumns.findIndex(col => col.id === Number(viewableCheckbox.id));
        const newViewable = viewableCheckbox.checked;

        if(colToEditIdx != -1) {
            const newColumns = [...changedColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], viewable: newViewable};
            setColumns(newColumns);
        }
    }

    /* If the add filter button is clicked. */
    const handleAddFilter = () => {
        setFilter([]);
        handleSaveTableviewColumns();
    }

    /* If the remove filter button is clicked. */
    const handleRemoveFilter = () => {
        setFilter(null);
        handleSaveTableviewColumns();
    }

    /* If a filter checkbox is checked/unchecked. */
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterCheckbox = event.currentTarget as HTMLInputElement;
        const newFilterValue = filterCheckbox.checked;

        if(changedFilter) {
            const newFilter = [ ...changedFilter ];
            newFilter[Number(filterCheckbox.id)] = newFilterValue;
            setFilter(newFilter);
        }
    }

    /* If the add user filter button is clicked. */
    const handleAddUserFilter = () => {
        setUserFilter([]);
        handleSaveTableviewColumns();
    }

    /* If the remove user filter button is clicked. */
    const handleRemoveUserFilter = () => {
        setUserFilter(null);
        handleSaveTableviewColumns();
    }

    /* If a user filter textfield is altered. */
    const handleUserFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userFilterTextfield = event.currentTarget as HTMLInputElement;
        const newUserFilterValue = userFilterTextfield.value;

        if(changedUserFilter) {
            const newUserFilter = [ ...changedUserFilter ];
            newUserFilter[Number(userFilterTextfield.id)] = newUserFilterValue;
            setUserFilter(newUserFilter);
        }
    }

    return (
        <div style={styles.editAppTableviewColumnsWrapper}>
            {/* Inner Navigation Bar */}
            <EditAppInnerNavBar/>

            {/* Edit App Tableview Columns Display */}
            <div style={styles.editAppTableviewColumnsDisplay}>
                {/* Save Changes Button */}
                <IconButton onClick={handleSaveTableviewColumns} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>

                {/* Swap Display Button */}
                <IconButton onClick={handleSwapDisplay} title="Swap">
                    <SwapHorizIcon fontSize="large"/>
                </IconButton>
                
                {/* Display Columns or Filters */}
                {display === "Columns" ? (
                    <Grid sx={styles.grid} container spacing={2}>
                        {/* Map each datasource column to a grid item. */}
                        {changedColumns.map((col) => (
                            <Grid item xs={1.5} key={col.id}>
                                <div style={styles.gridItemContainer}>
                                    {/* Name*/}
                                    <div style={styles.columnElement}> {col.name} </div>

                                    {/* Viewable checkbox. */}
                                    <FormControlLabel
                                        control={<Checkbox id={col.id.toString()} onChange={handleViewableChange} checked={col.viewable ?? false} sx={styles.columnCheckbox}/>}
                                        label="Viewable"
                                        sx={styles.columnElement}
                                    />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ) : 
                    <div style={styles.filterWrapper}>
                        {/* Filter Column */}
                        <div style={styles.filterContainer}> 
                            {/* Add/Delete Filter Button */}
                            {changedFilter === null ? (
                                <IconButton onClick={handleAddFilter} title="Add Filter" sx={styles.filterButton}>
                                    Add Filter
                                    <AddIcon fontSize="large" sx={styles.addIcon}/>
                                </IconButton>
                            ) :
                                <IconButton onClick={handleRemoveFilter} title="Delete Filter" sx={styles.filterButton}>
                                    Delete Filter
                                    <RemoveIcon fontSize="large" sx={styles.removeIcon}/>
                                </IconButton>
                            }       

                            {/* Map each value in the filter column to a checkbox. */}
                            {changedFilter && changedFilter.map((val, idx) => (
                                <FormControlLabel
                                    control={<Checkbox id={idx.toString()} onChange={handleFilterChange} checked={val} sx={styles.columnCheckbox}/>}
                                    label={`Include: Record #${idx + 1}`}
                                    sx={styles.columnElement}
                                />
                            ))}
                        </div>

                        {/* User Filter Column */}
                        <div style={styles.filterContainer}> 
                            {/* Add/Delete User Filter Button */}
                            {changedUserFilter === null ? (
                                <IconButton onClick={handleAddUserFilter} title="Add User Filter" sx={styles.filterButton}>
                                    Add User Filter
                                    <AddIcon fontSize="large" sx={styles.addIcon}/>
                                </IconButton>
                            ) :
                                <IconButton onClick={handleRemoveUserFilter} title="Delete User Filter" sx={styles.filterButton}>
                                    Delete User Filter
                                    <RemoveIcon fontSize="large" sx={styles.removeIcon}/>
                                </IconButton>
                            }  

                            {/* Map each value in the user filter column to a textfield. */}
                            {changedUserFilter && changedUserFilter.map((val, idx) => (
                                <TextField id={idx.toString()} onChange={handleUserFilterChange} label={`Email for Record #${idx + 1}`} value={val} sx={styles.columnElement}></TextField>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default EditAppTableviewColumns;