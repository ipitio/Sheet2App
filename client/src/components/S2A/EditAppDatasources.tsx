import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showEditAppCreateDatasourcesModal, showEditAppEditDatasourcesModal, hideS2AModal, StoreState, createDatasource, setCurrentDatasource, editDatasource, setCurrentColumn } from '../../store/StoreContext';
import { Column, ColumnType, Datasource, ModalType } from '../../store/StoreTypes';

import EditAppNavBar from "./EditAppNavBar";
import { Button, Grid, IconButton, TextField, Modal, FormControlLabel, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


function EditAppDatasources() {
    /* React hooks. */
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const sheetNameRef = useRef<HTMLInputElement>(null);

    /* Hooks foe editing datasource */
    const dsNameRef = useRef<HTMLInputElement>(null);
    const dsTypeRef = useRef<HTMLInputElement>(null);
    const dsInitValRef = useRef<HTMLInputElement>(null);

    const labelCheck = useRef<HTMLInputElement>(null);
    const referenceCheck = useRef<HTMLInputElement>(null);

    /* On mount, pull data. */
    useEffect(() => {
        // add dispatch for viewdatasources
        dispatch(hideS2AModal());
    }, []);

    /* Redux hooks into store. */   
    const currentModalType = useSelector((state: StoreState) => state.s2aReducer.currentModalType);
    const currentDatasource = useSelector((state: StoreState) => state.s2aReducer.currentDatasource);
    const currentColumn = useSelector((state: StoreState) => state.s2aReducer.currentColumn);

    /* REPLACE THIS SAMPLE DATA */

    // TODO: WHEN WE LOAD THE DATASOURCES AND THE COLUMMS, WE NEED TO ASSOCIATE THE COLUMNS
    // WITH THEIR RESPECTIVE DATA SOURCES. LOOK AT STORETYPES FOR DATASOURCE
    // THE CODE WORKS WITH THE SAMPLE DATA, JUST NEED TO STORE IN Datasource.columns THE COLUMNS
    // ASSOCAITED WITH THE DATASOURCE.
    const datasources = [
        { id: 1, name: "Data Source #1", spreadsheetURL: 'https://example.com/spreadsheet1', sheetName: "Sheet #1", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 2, name: "Data Source #2", spreadsheetURL: 'https://example.com/spreadsheet2', sheetName: "Sheet #2", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 3, name: "Data Source #3", spreadsheetURL: 'https://example.com/spreadsheet3', sheetName: "Sheet #3", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[] },
        { id: 4, name: "Data Source #4", spreadsheetURL: 'https://example.com/spreadsheet4', sheetName: "Sheet #4", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 5, name: "Data Source #5", spreadsheetURL: 'https://example.com/spreadsheet5', sheetName: "Sheet #5", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 6, name: "Data Source #6", spreadsheetURL: 'https://example.com/spreadsheet6', sheetName: "Sheet #6", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 7, name: "Data Source #7", spreadsheetURL: 'https://example.com/spreadsheet7', sheetName: "Sheet #7", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 8, name: "Data Source #8", spreadsheetURL: 'https://example.com/spreadsheet8', sheetName: "Sheet #8", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 9, name: "Data Source #9", spreadsheetURL: 'https://example.com/spreadsheet9', sheetName: "Sheet #9", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 10, name: "Data Source #10", spreadsheetURL: 'https://example.com/spreadsheet10', sheetName: "Sheet #10", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 11, name: "Data Source #11", spreadsheetURL: 'https://example.com/spreadsheet11', sheetName: "Sheet #11", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 12, name: "Data Source #12", spreadsheetURL: 'https://example.com/spreadsheet12', sheetName: "Sheet #12", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[] },
        { id: 13, name: "Data Source #13", spreadsheetURL: 'https://example.com/spreadsheet13', sheetName: "Sheet #13", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 14, name: "Data Source #14", spreadsheetURL: 'https://example.com/spreadsheet14', sheetName: "Sheet #14", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 15, name: "Data Source #15", spreadsheetURL: 'https://example.com/spreadsheet15', sheetName: "Sheet #15", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 16, name: "Data Source #16", spreadsheetURL: 'https://example.com/spreadsheet16', sheetName: "Sheet #16", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[] },
        { id: 17, name: "Data Source #17", spreadsheetURL: 'https://example.com/spreadsheet17', sheetName: "Sheet #17", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 18, name: "Data Source #18", spreadsheetURL: 'https://example.com/spreadsheet18', sheetName: "Sheet #18", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 19, name: "Data Source #19", spreadsheetURL: 'https://example.com/spreadsheet19', sheetName: "Sheet #19", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]},
        { id: 20, name: "Data Source #20", spreadsheetURL: 'https://example.com/spreadsheet20', sheetName: "Sheet #20", spreadsheetID: 'spreadsheet1', sheetID: 0, columns:[]}
    ]
    
    const datasourceColumns: Column[] = [
        {id: 1, name: "Col #1", initialValue: "sample formula #1", label: true, reference: true, type: "Boolean", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 2, name: "Col #2", initialValue: "sample formula #2", label: false, reference: true, type: "Number", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 3, name: "Col #3", initialValue: "sample formula #3", label: false, reference: false, type: "Boolean", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 4, name: "Col #4", initialValue: "sample formula #4", label: false, reference: true, type: "Text", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 5, name: "Col #5", initialValue: "sample formula #5", label: false, reference: true, type: "URL", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 6, name: "Col #6", initialValue: "sample formula #6", label: false, reference: false, type: "Number", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 7, name: "Col #7", initialValue: "sample formula #7", label: true, reference: false, type: "Text", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 8, name: "Col #8", initialValue: "sample formula #8", label: true, reference: false, type: "Number", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 9, name: "Col #9", initialValue: "sample formula #9", label: false, reference: true, type: "Boolean", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 10, name: "Col #10", initialValue: "sample formula #10", label: true, reference: true, type: "Text", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 11, name: "Col #11", initialValue: "sample formula #11", label: false, reference: false, type: "URL", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 12, name: "Col #12", initialValue: "sample formula #12", label: false, reference: true, type: "Number", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 13, name: "Col #13", initialValue: "sample formula #13", label: false, reference: false, type: "Boolean", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 14, name: "Col #14", initialValue: "sample formula #14", label: true, reference: true, type: "Text", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 15, name: "Col #15", initialValue: "sample formula #15", label: false, reference: true, type: "URL", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 16, name: "Col #16", initialValue: "sample formula #16", label: false, reference: false, type: "Number", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 17, name: "Col #17", initialValue: "sample formula #17", label: true, reference: false, type: "Boolean", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 18, name: "Col #18", initialValue: "sample formula #18", label: false, reference: true, type: "Text", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 19, name: "Col #19", initialValue: "sample formula #19", label: true, reference: true, type: "Number", include: false, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 20, name: "Col #20", initialValue: "sample formula #20", label: false, reference: false, type: "Boolean", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 21, name: "Col #21", initialValue: "sample formula #21", label: true, reference: false, type: "Text", include: true, isFilter: false, isUserFilter: false, isEditFilter: false}
    ]

    /* Event handler for modals. */
    const handleCloseModal = () => {
        dispatch(hideS2AModal());
    }

    const handleOpenCreateDatasourceModal = () => {
        dispatch(showEditAppCreateDatasourcesModal());
    }

    const handleOpenEditDatasourceModal = (datasource: Datasource) => {
        dispatch(setCurrentDatasource({datasource: datasource}))
        dispatch(showEditAppEditDatasourcesModal());
    }

    /* Event handler for creating/editing data sources. */
    const handleCreateDatasource = () => {
        dispatch(createDatasource({
            spreadsheetID: nameRef.current?.value as string,

            // Default sheet id is 0 when making a new datasource
            // TODO: should be any sheet id, but we don't have a textfield for that.
            sheetID: 0,
            datasourceName: sheetNameRef.current?.value as string
        }));
        dispatch(hideS2AModal());
    }   

    const getColumnsClone = (): Column[] => {
        if (!currentDatasource || !currentColumn) return [];

        const columns: Column[] = JSON.parse(JSON.stringify(currentDatasource.columns));
        return columns;
    }

    const handleEditDatasourceColName = (e: any) => {
        if (e.key !== 'Enter') return;

        if (!currentDatasource || !currentColumn) return;
        const columns = getColumnsClone();

        for (let column of columns) {
            if (column.id == currentColumn.id) {
                column.name = dsNameRef.current?.value as string;
            }
        } 

        dispatch(editDatasource({
            datasourceKey: currentDatasource?.id as number,
            spreadsheetID: currentDatasource?.spreadsheetID as string,
            sheetIdx: currentDatasource?.sheetID as number,
            datasourceName: currentDatasource?.name as string,
            columns: columns as Column[]
        }));
        dispatch(hideS2AModal());
      }
    
    const handleEditDatasourceColType = (e:any) => {
        if (e.key !== 'Enter') return;

        if (!currentDatasource || !currentColumn) return;

        const columns = getColumnsClone();

        for (let column of columns) {
            if (column.id == currentColumn.id) {
                let columnTypeVal;
                switch (dsTypeRef.current?.value) {
                    case ("URL"):
                        columnTypeVal = ColumnType.URL;
                        break;
                    case ("Text"):
                        columnTypeVal = ColumnType.Text;
                        break;
                    case ("Boolean"):
                        columnTypeVal = ColumnType.Boolean;
                        break;
                    case("Number"): 
                        columnTypeVal = ColumnType.Number;
                        break;
                }

                if (columnTypeVal) {
                    column.type = columnTypeVal;
                }
            }
        } 

        dispatch(editDatasource({
            datasourceKey: currentDatasource?.id as number,
            spreadsheetID: currentDatasource?.spreadsheetID as string,
            sheetIdx: currentDatasource?.sheetID as number,
            datasourceName: currentDatasource?.name as string,
            columns: currentDatasource?.columns as Column[]
        }));
        dispatch(hideS2AModal());
    }

    const handleEditDatasourceColInitForm = (e: any) => {
        if (e.key !== 'Enter') return;

        if (!currentDatasource || !currentColumn) return;

        const columns = getColumnsClone();

        for (let column of columns) {
            if (column.id == currentColumn.id) {
                column.initialValue = dsInitValRef.current?.value;
            }
        } 

        dispatch(editDatasource({
            datasourceKey: currentDatasource?.id as number,
            spreadsheetID: currentDatasource?.spreadsheetID as string,
            sheetIdx: currentDatasource?.sheetID as number,
            datasourceName: currentDatasource?.name as string,
            columns: currentDatasource?.columns as Column[]
        }));
        dispatch(hideS2AModal());
    }

    const handleEditDatasourceColLabel = () => {
        if (!currentDatasource || !currentColumn) return;

        const columns = getColumnsClone();

        for (let column of columns) {
            if (column.id == currentColumn.id) {
                column.label = labelCheck.current?.checked as boolean;
            }
        } 

        dispatch(editDatasource({
            datasourceKey: currentDatasource?.id as number,
            spreadsheetID: currentDatasource?.spreadsheetID as string,
            sheetIdx: currentDatasource?.sheetID as number,
            datasourceName: currentDatasource?.name as string,
            columns: currentDatasource?.columns as Column[]
        }));
        dispatch(hideS2AModal());
    }

    const handleEditDatasourceColReference = () => {
        if (!currentDatasource || !currentColumn) return;

        const columns = getColumnsClone();

        for (let column of columns) {
            if (column.id == currentColumn.id) {
                column.label = referenceCheck.current?.checked as boolean;
            }
        } 

        dispatch(editDatasource({
            datasourceKey: currentDatasource?.id as number,
            spreadsheetID: currentDatasource?.spreadsheetID as string,
            sheetIdx: currentDatasource?.sheetID as number,
            datasourceName: currentDatasource?.name as string,
            columns: currentDatasource?.columns as Column[]
        }));
        dispatch(hideS2AModal());
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
            {/* Navigation Bar */}
            <EditAppNavBar/>
            
            {/* Create App Modal */}
            <Modal open={currentModalType == ModalType.EditAppCreateDatasourcesModal} onClose={handleCloseModal} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
                <div style={{ backgroundColor: "#6CA6CD", padding: "30px" }}>
                    <TextField variant="filled" label="Name" inputRef={nameRef} />
                    <TextField variant="filled" label="Spreadsheet URL" style={{ marginLeft: "30px" }} inputRef={urlRef} />
                    <TextField variant="filled" label="Sheet Name" style={{ marginLeft: "30px" }} inputRef={sheetNameRef} />
                    <Button onClick={handleCreateDatasource} variant="outlined" size="large" sx={{marginLeft: '50px', color:'#E1D9D1'}}>Create</Button>
                    <Button onClick={handleCloseModal} variant="outlined" size="large" sx={{marginLeft: '50px', color:'#E1D9D1'}}>Discard</Button>
                </div>
            </Modal>

            {/* Modal for changing data source column information. */}
            <Modal open={currentModalType === ModalType.EditAppEditDatasourcesModal} onClose={handleCloseModal} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
                <div style={{ backgroundColor: "#fff", padding: "30px" }}>
                     <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px', maxHeight: '80vh', overflow: 'auto'}}>
                        {/* Map each data source column to a grid item. */}
                        {datasourceColumns.map((dsC) => (
                            <Grid item xs={4}>
                                <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>

                                    {/* Name/Type/Initial Value Textfields*/}
                                    <TextField key={dsC.id} inputRef={dsNameRef} onKeyDown={handleEditDatasourceColName} variant="filled" label="Name" defaultValue={dsC.name} onClick={() => setCurrentColumn({column: dsC})}/>
                                    <TextField key={dsC.id} inputRef={dsTypeRef} onKeyDown={handleEditDatasourceColType} variant="filled" label="Type" defaultValue={dsC.type} onClick={() => setCurrentColumn({column: dsC})}/>
                                    <TextField key={dsC.id} inputRef={dsInitValRef} onKeyDown={handleEditDatasourceColInitForm} variant="filled" label="Initial Value Formula" defaultValue={dsC.initialValue} onClick={() => setCurrentColumn({column: dsC})}/>

                                    {/* Label and reference checkboxes. */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                key={dsC.id}
                                                onClick={handleEditDatasourceColLabel}
                                                defaultChecked={dsC.label}
                                                inputProps={{ 'aria-label': 'Checkbox example' }}
                                                inputRef={labelCheck}
                                            />
                                        }
                                        label="Label"
                                    />        
                                    <FormControlLabel
                                        key={dsC.id}
                                        control={
                                            <Checkbox
                                                key={dsC.id}
                                                onClick={handleEditDatasourceColReference}
                                                defaultChecked={dsC.reference}
                                                inputProps={{ 'aria-label': 'Checkbox example' }}
                                                inputRef={referenceCheck}
                                            />
                                        }
                                        label="Reference"
                                    />  
                                </div>
                            </Grid>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Display */}
            <div style={{ flex: 1, overflow: 'auto', marginTop: "100px" }}>
                <div>
                    {/* Create datasource button. */}
                    <IconButton onClick={handleOpenCreateDatasourceModal} sx={{ fontSize: '1.25rem'}}>
                        <AddIcon/>
                        Create New Datasource
                    </IconButton>

                    {/* Map each data source to a grid item. */}
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px'}}>
                        {datasources.map((ds) => (
                            <Grid item xs={4} key={ds.id}>
                                <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>
                                    {ds.name}

                                    {/* Name/Spreadsheet URL/Spreadsheet Name Textfields */}
                                    <TextField variant="filled" label="Name" value={ds.name}/>
                                    <TextField variant="filled" label="Spreadsheet URL" value={ds.spreadsheetURL}/>
                                    <TextField variant="filled" label="Sheet Name" value={ds.sheetName}/>

                                    {/* Edit Datasource Button */}
                                    <IconButton onClick={() => {handleOpenEditDatasourceModal(ds)}} sx={{ position: 'absolute', top: -10, right: -5 }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </Grid>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAppDatasources;