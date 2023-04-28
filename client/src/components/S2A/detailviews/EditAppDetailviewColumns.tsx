import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import store, { StoreState } from '../../../store/StoreContext';
import { Column } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/detailviews/EditAppDetailviewColumnsStyles';
import EditAppInnerNavBar from "../navbars/EditAppInnerNavBar";
import { Grid, Checkbox, IconButton, TextField, FormControlLabel, InputLabel, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { editDetailviewColumns, viewDetailviewColumns } from '../../../store/StoreController';

function EditAppDetailviewColumns() {
    const dispatch = useDispatch<typeof store.dispatch>();

     /* Redux hooks into store. */
    const detailviewColumns = useSelector((state: StoreState) => state.S2AReducer.detailviewColumns);
    const editFilterColumn = useSelector((state: StoreState) => state.S2AReducer.editFilterColumn);
    const currentDetailview = useSelector((state: StoreState) => state.S2AReducer.currentDetailview);

    /* React state for conditional rendering. */
    const [display, setDisplay] = useState<string>("Columns");

    /* React state for detailview columns. */
    const [changedColumns, setColumns] = useState<Column[]>(detailviewColumns);
    const [changedEditFilter, setEditFilter] = useState<boolean[] | null>(editFilterColumn);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(viewDetailviewColumns())
        .then(() => {
          setColumns(detailviewColumns);
          setEditFilter(editFilterColumn);

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
    const handleSaveDetailviewColumns = () => {
        dispatch(editDetailviewColumns({"detailviewColumns": changedColumns, "editFilterColumn": changedEditFilter}))
        .then(() => {
          dispatch(viewDetailviewColumns());
        });
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

    /* If the editable checkbox is checked/unchecked. */
    const handleEditableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const editableCheckbox = event.currentTarget as HTMLInputElement;
        const colToEditIdx = changedColumns.findIndex(col => col.id === Number(editableCheckbox.id));
        const newEditable = editableCheckbox.checked;

        if(colToEditIdx != -1) {
            const newColumns = [...changedColumns];
            newColumns[colToEditIdx] = { ...newColumns[colToEditIdx], editable: newEditable};
            setColumns(newColumns);
        }
    }

    /* If the add edit filter button is clicked. */
    const handleAddEditFilter = () => {
        setEditFilter([]);
        handleSaveDetailviewColumns();
    }

    /* If the remove edit filter button is clicked. */
    const handleRemoveEditFilter = () => {
        setEditFilter(null);
        handleSaveDetailviewColumns();
    }

    /* If an edit filter checkbox is checked/unchecked. */
    const handleEditFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const editFilterCheckbox = event.currentTarget as HTMLInputElement;
        const newEditFilterValue = editFilterCheckbox.checked;

        if(changedEditFilter) {
            const newEditFilter = [ ...changedEditFilter ];
            newEditFilter[Number(editFilterCheckbox.id)] = newEditFilterValue;
            setEditFilter(newEditFilter);
        }
    }

    return (
        <div style={styles.editAppDetailviewColumnsWrapper}>
            {/* Inner Navigation Bar */}
            <EditAppInnerNavBar/>

            {/* Edit App Detailview Columns Display */}
            <div style={styles.editAppDetailviewColumnsDisplay}>
            <Typography sx={{fontSize: '32px'}}>
                {`Edit Columns for ${currentDetailview?.name}`}
            </Typography>
                {/* Save Changes Button */}
                <IconButton onClick={handleSaveDetailviewColumns} sx={styles.saveButton} title="Save">
                    {"Save Changes"}
                    <SaveIcon fontSize="large" sx={styles.saveIcon}/>
                </IconButton>

                {/* Swap Display Button */}
                <IconButton onClick={handleSwapDisplay} title="Swap">
                    <SwapHorizIcon fontSize="large"/>
                    {`Edit ${display}`}
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

                                    {/* Editable checkbox. */}
                                    <FormControlLabel
                                        control={<Checkbox id={col.id.toString()} onChange={handleEditableChange} checked={col.editable ?? false} sx={styles.columnCheckbox}/>}
                                        label="Editable"
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
                            {changedEditFilter === null ? (
                                <IconButton onClick={handleAddEditFilter} title="Add Edit Filter" sx={styles.filterButton}>
                                    Add Edit Filter
                                    <AddIcon fontSize="large" sx={styles.addIcon}/>
                                </IconButton>
                            ) :
                                <IconButton onClick={handleRemoveEditFilter} title="Delete Edit Filter" sx={styles.filterButton}>
                                    Delete Edit Filter
                                    <RemoveIcon fontSize="large" sx={styles.removeIcon}/>
                                </IconButton>
                            }       

                            {/* Map each value in the filter column to a checkbox. */}
                            {changedEditFilter && changedEditFilter.map((val, idx) => (
                                <FormControlLabel
                                    control={<Checkbox id={idx.toString()} onChange={handleEditFilterChange} checked={val} sx={styles.columnCheckbox}/>}
                                    label={`Allow Editing: Record #${idx + 1}`}
                                    sx={styles.columnElement}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );



}

export default EditAppDetailviewColumns;