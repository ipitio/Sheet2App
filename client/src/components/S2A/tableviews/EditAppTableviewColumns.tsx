import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { store, StoreState } from '../../../store/StoreContext';
import { Column } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/tableviews/EditAppTableviewColumnsStyles'
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Grid, Checkbox, IconButton, TextField, FormControlLabel, Typography, CircularProgress, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { editTableviewColumns, viewTableviewColumns } from '../../../store/StoreController';

function EditAppTableviewColumns() {
    const dispatch = useDispatch<typeof store.dispatch>();

    useEffect(() => {
        dispatch(viewTableviewColumns());
    }, []);

    /* Redux hooks into store. */
    const tableviewColumns = useSelector((state: StoreState) => state.S2AReducer.tableviewColumns);
    const filterColumn = useSelector((state: StoreState) => state.S2AReducer.filterColumn);
    const userFilterColumn = useSelector((state: StoreState) => state.S2AReducer.userFilterColumn);

    const currentTableview = useSelector((state: StoreState) => state.S2AReducer.currentTableview);

    /* React state for conditional rendering. */
    const [display, setDisplay] = useState<string>("Columns");

    /* React state for tableview columns. */
    const [changedColumns, setColumns] = useState<Column[]>(tableviewColumns);
    const [changedFilter, setFilter] = useState<boolean[] | null>(filterColumn);
    const [changedUserFilter, setUserFilter] = useState<string[] | null>(userFilterColumn);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(viewTableviewColumns())
        .then(() => {
          setColumns(tableviewColumns);
          setFilter(filterColumn);
          setUserFilter(userFilterColumn);
          setIsLoading(false);
        })
    });

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
        dispatch(editTableviewColumns({"tableviewColumns": changedColumns, "filterColumn": filterColumn, "userFilterColumn": userFilterColumn}))
        .then(() => {
            dispatch(viewTableviewColumns());
        })
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
                <Typography sx={{fontSize: '32px', fontWeight: 'bold'}}>
                    {`Edit Columns for ${currentTableview?.name}`}
                </Typography>

                {/* Save Changes Button */}
                <IconButton onClick={handleSaveTableviewColumns} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>

                {/* Swap Display Button */}
                <IconButton onClick={handleSwapDisplay} title="Swap">
                    <SwapHorizIcon fontSize="large"/>
                    {`Edit ${display}`}
                </IconButton>
                
                {/* Display Columns or Filters */}
                {isLoading ? <CircularProgress/> : 
                display === "Columns" ? (
                    <Grid sx={styles.grid} container spacing={2}>
                        {/* Map each datasource column to a grid item. */}
                        {changedColumns.map((col) => (
                            <Grid item xs={1.5} key={col.id}>
                                <Box sx={{...styles.gridItemContainer, '&:hover': {'background': "#EEEEEE"}}}>
                                    {/* Name*/}
                                    <div style={styles.columnElement}> {col.name} </div>

                                    {/* Viewable checkbox. */}
                                    <FormControlLabel
                                        control={<Checkbox id={col.id.toString()} onChange={handleViewableChange} checked={col.viewable ?? false} sx={styles.columnCheckbox}/>}
                                        label="Viewable"
                                        sx={styles.columnElement}
                                    />
                                </Box>
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