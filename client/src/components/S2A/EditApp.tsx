import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, Button, Grid, IconButton, TextField, Modal, FormControlLabel, Checkbox, Select, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

function EditApp() {
    const [display, setDisplay] = useState<String>("ds");
    const [modalOpen, setModalOpen] = useState<string>("");
    const navigate = useNavigate();

    /* Event handlers for navigation bar buttons. */
    const displayDatasources = () => {
        setDisplay("ds");
    }

    const displayViews = () => {
        setDisplay("views");
    }
    
    const displayRoles = () => {
        setDisplay("roles");
    }

    /* Event handler for modals. */
    const handleCloseModal = () => {
        setModalOpen("");
    }

    /* Event handlers for datasources screen. */
    const datasources = [
        { id: 1, name: "Data Source #1", spreadsheetURL: 'https://example.com/spreadsheet1', sheetName: "Sheet #1"},
        { id: 2, name: "Data Source #2", spreadsheetURL: 'https://example.com/spreadsheet2', sheetName: "Sheet #2"},
        { id: 3, name: "Data Source #3", spreadsheetURL: 'https://example.com/spreadsheet3', sheetName: "Sheet #3" },
        { id: 4, name: "Data Source #4", spreadsheetURL: 'https://example.com/spreadsheet4', sheetName: "Sheet #4"},
        { id: 5, name: "Data Source #5", spreadsheetURL: 'https://example.com/spreadsheet5', sheetName: "Sheet #5"},
        { id: 6, name: "Data Source #6", spreadsheetURL: 'https://example.com/spreadsheet6', sheetName: "Sheet #6"},
        { id: 7, name: "Data Source #7", spreadsheetURL: 'https://example.com/spreadsheet7', sheetName: "Sheet #7"},
        { id: 8, name: "Data Source #8", spreadsheetURL: 'https://example.com/spreadsheet8', sheetName: "Sheet #8"},
        { id: 9, name: "Data Source #9", spreadsheetURL: 'https://example.com/spreadsheet9', sheetName: "Sheet #9"},
        { id: 10, name: "Data Source #10", spreadsheetURL: 'https://example.com/spreadsheet10', sheetName: "Sheet #10"},
        { id: 11, name: "Data Source #11", spreadsheetURL: 'https://example.com/spreadsheet11', sheetName: "Sheet #11"},
        { id: 12, name: "Data Source #12", spreadsheetURL: 'https://example.com/spreadsheet12', sheetName: "Sheet #12" },
        { id: 13, name: "Data Source #13", spreadsheetURL: 'https://example.com/spreadsheet13', sheetName: "Sheet #13"},
        { id: 14, name: "Data Source #14", spreadsheetURL: 'https://example.com/spreadsheet14', sheetName: "Sheet #14"},
        { id: 15, name: "Data Source #15", spreadsheetURL: 'https://example.com/spreadsheet15', sheetName: "Sheet #15"},
        { id: 16, name: "Data Source #16", spreadsheetURL: 'https://example.com/spreadsheet16', sheetName: "Sheet #16" },
        { id: 17, name: "Data Source #17", spreadsheetURL: 'https://example.com/spreadsheet17', sheetName: "Sheet #17"},
        { id: 18, name: "Data Source #18", spreadsheetURL: 'https://example.com/spreadsheet18', sheetName: "Sheet #18"},
        { id: 19, name: "Data Source #19", spreadsheetURL: 'https://example.com/spreadsheet19', sheetName: "Sheet #19"},
        { id: 20, name: "Data Source #20", spreadsheetURL: 'https://example.com/spreadsheet20', sheetName: "Sheet #20"}
    ]
    
    const datasourceColumns = [
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
        {id: 21, name: "Col #21", initialValue: "sample formula #21", label: true, reference: false, type: "Text", include: true, isFilter: false, isUserFilter: false, isEditFilter: false},
        {id: 22, name: "Filter", initialValue: "", label: false, reference: false, type: "Boolean", isFilter: true, isUserFilter: false, isEditFilter: false},
        {id: 24, name: "User Filter", initialValue: "", label: false, reference: false, type: "String", isFilter: false, isUserFilter: true, isEditFilter: false},
        {id: 25, name: "Edit Filter", initialValue: "", label: false, reference: false, type: "Boolean", isFilter: false, isUserFilter: false, isEditFilter: true}
        
    ]

    const recordCount = 20;
    
    const handleCreateDatasource = () => {

    }

    const handleEditDatasource = () => {
        setModalOpen("ds");
    }


    /* Event handlers for views screen. */
    const tableViews = [
        {id: 1, name: "TableView #1", datasourceName: "Data Source #1" },
        {id: 2, name: "TableView #2", datasourceName: "Data Source #2" },
        {id: 3, name: "TableView #3", datasourceName: "Data Source #3" },
        {id: 4, name: "TableView #4", datasourceName: "Data Source #4" },
        {id: 5, name: "TableView #5", datasourceName: "Data Source #5" },
        {id: 6, name: "TableView #6", datasourceName: "Data Source #6" },
        {id: 7, name: "TableView #7", datasourceName: "Data Source #7" },
        {id: 8, name: "TableView #8", datasourceName: "Data Source #8" },
        {id: 9, name: "TableView #9", datasourceName: "Data Source #9" },
        {id: 10, name: "TableView #10", datasourceName: "Data Source #10" },
        {id: 11, name: "TableView #11", datasourceName: "Data Source #11" },
        {id: 12, name: "TableView #12", datasourceName: "Data Source #12" },
        {id: 13, name: "TableView #13", datasourceName: "Data Source #13" },
        {id: 14, name: "TableView #14", datasourceName: "Data Source #14" },
        {id: 15, name: "TableView #15", datasourceName: "Data Source #15" },
        {id: 16, name: "TableView #16", datasourceName: "Data Source #16" },
        {id: 17, name: "TableView #17", datasourceName: "Data Source #17" },
        {id: 18, name: "TableView #18", datasourceName: "Data Source #18" },
        {id: 19, name: "TableView #19", datasourceName: "Data Source #19" },
        {id: 20, name: "TableView #20", datasourceName: "Data Source #20" }
    ];
    
    const detailViews = [
        {id: 1, name: "DetailView #1", editableCols: [1, 3, 5, 6, 7, 8]},
        {id: 2, name: "DetailView #2", editableCols: [2, 4, 5, 6, 7, 8]},
        {id: 3, name: "DetailView #3", editableCols: [5, 6, 7]}
    ]

    const handleCreateTableView = () => {

    }

    const handleTableViewZoom = () => {
        setModalOpen("dv")
    }

    const handleEditTableView = () => {
        setModalOpen("tv");
    }

    const handleEditDetailView = () => {
        setModalOpen("editdv");
    }

    /* Event handlers for roles screen. */
    const roleMemURL = "https://examplerolesheet.com/"
    const roles = [
        {id: 1, name: "Role #1"},
        {id: 2, name: "Role #2"},
        {id: 3, name: "Role #3"},
        {id: 4, name: "Role #4"},
        {id: 5, name: "Role #5"},
        {id: 6, name: "Role #6"},
        {id: 7, name: "Role #7"},
        {id: 8, name: "Role #8"},
        {id: 9, name: "Role #9"},
        {id: 10, name: "Role #10"},
        {id: 11, name: "Role #11"},
        {id: 12, name: "Role #12"},
        {id: 13, name: "Role #13"},
        {id: 14, name: "Role #14"},
        {id: 15, name: "Role #15"},
        {id: 16, name: "Role #16"},
        {id: 17, name: "Role #17"},
        {id: 18, name: "Role #18"},
        {id: 19, name: "Role #19"},
        {id: 20, name: "Role #20"}
    ];

    const tableViewPerms = [
        {id: 1, name: "TableView #1", viewPerm: true, addPerm: false, deletePerm: false},
        {id: 2, name: "TableView #2", viewPerm: true, addPerm: false, deletePerm: false},
        {id: 3, name: "TableView #3", viewPerm: false, addPerm: true, deletePerm: false},
        {id: 4, name: "TableView #4", viewPerm: true, addPerm: false, deletePerm: true},
        {id: 5, name: "TableView #5", viewPerm: true, addPerm: false, deletePerm: false},
        {id: 6, name: "TableView #6", viewPerm: false, addPerm: true, deletePerm: false},
        {id: 7, name: "TableView #7", viewPerm: true, addPerm: false, deletePerm: true},
        {id: 8, name: "TableView #8", viewPerm: true, addPerm: false, deletePerm: true},
        {id: 9, name: "TableView #9", viewPerm: false, addPerm: false, deletePerm: true},
        {id: 10, name: "TableView #10", viewPerm: true, addPerm: false, deletePerm: false},
        {id: 11, name: "TableView #11", viewPerm: true, addPerm: false, deletePerm: true},
        {id: 12, name: "TableView #12", viewPerm: false, addPerm: false, deletePerm: true},
        {id: 13, name: "TableView #13", viewPerm: true, addPerm: false, deletePerm: true},
        {id: 14, name: "TableView #14", viewPerm: true, addPerm: true, deletePerm: true},
        {id: 15, name: "TableView #15", viewPerm: false, addPerm: false, deletePerm: false},
        {id: 16, name: "TableView #16", viewPerm: true, addPerm: false, deletePerm: true},
        {id: 17, name: "TableView #17", viewPerm: false, addPerm: false, deletePerm: true},
        {id: 18, name: "TableView #18", viewPerm: true, addPerm: false, deletePerm: true },
        {id: 19, name: "TableView #19", viewPerm: true, addPerm: true, deletePerm: true },
        {id: 20, name: "TableView #20", viewPerm: false, addPerm: false, deletePerm: true}
    ];

    const detailViewPerms = [
        {id: 1, name: "DetailView #1", editPerm: true},
        {id: 2, name: "DetailView #2", editPerm: false},
        {id: 3, name: "DetailView #3", editPerm: false},
        {id: 4, name: "DetailView #4", editPerm: true},
        {id: 5, name: "DetailView #5", editPerm: true}
    ];

    const handleEditRole = () => {
        setModalOpen("role")
    }
      
    /* Event handlers for saving and discarding changes to app. */
    const handleSaveChanges = () => {
        navigate("/S2A/home");
    }

    const handleDiscardChanges = () => {
        navigate("/S2A/home");
    }

    /* Conditional rendering of the modal content. */
    const modalContent =
        /* Modal is for editing a data source. */
        (modalOpen === "ds") ?
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px', maxHeight: '80vh', overflow: 'auto'}}>

                {/* Map each data source column to a grid item. */}
                {datasourceColumns.map((dsC) => (
                    <Grid item xs={4} key={dsC.id}>
                        <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>

                            {/* Name/Type/Initial Value Textfields*/}
                            <TextField variant="filled" label="Name" value={dsC.name} />
                            <TextField variant="filled" label="Type" value={dsC.type} />
                            <TextField variant="filled" label="Initial Value Formula" value={dsC.initialValue} />

                            {/* Label and reference checkboxes. */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dsC.label}
                                        inputProps={{ 'aria-label': 'Checkbox example' }}
                                    />
                                }
                                label="Label"
                            />        
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dsC.reference}
                                        inputProps={{ 'aria-label': 'Checkbox example' }}
                                    />
                                }
                                label="Reference"
                            />  
                        </div>
                    </Grid>
                ))}
            </div>

        /* Modal is for editing a tableview. */
        : (modalOpen === "tv") ?
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop: '10px', maxHeight: '90vh', overflow: 'auto'}}>

                {/* Map each data source column to a grid item. Skip edit filter columns, only relevant to detailview. */}
                {datasourceColumns.map((dsC) => (
                    (dsC.isEditFilter) ?
                        null
                    :
                    <Grid item xs={10} key={dsC.id}>
                        <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>
                            {   
                                /* Don't allow name change for filter columns. */
                                (dsC.isFilter) ?
                                    <div>
                                        <TextField variant="filled" label="Filter" value={dsC.name} />
                                    </div> 
                                : (dsC.isUserFilter) ?
                                <div>
                                    <TextField variant="filled" label="User Filter" value={dsC.name} />
                                </div> 

                                /* General column, allow edit. */
                                : <div style={{ display: 'flex', flexDirection: 'row'}}>
                                    <TextField variant="filled" label="Name" value={dsC.name} />
                                    <Checkbox
                                        checked={dsC.include}
                                    />  
                                </div>
                            }    

                            {/* Create as many textfields for each column as there are records. */}
                            {[...Array(recordCount)].map((_, index) => (
                                <TextField variant="filled"></TextField>
                            ))}
                        </div>
                    </Grid>
                ))}
            </div>

        /* Modal is for opening a detailview. */
        : (modalOpen === "dv") ?
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px', maxHeight: '80vh', overflow: 'auto'}}>
                
                {/* Map each detailview to a grid item. */}
                {detailViews.map((dv) => (
                    <Grid item xs={4} key={dv.id}>
                        <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px', fontFamily: 'sans-serif'}}>
                            {dv.name}

                            {/* Name Textfield and Edit DetailView Button */}
                            <TextField variant="filled" label="Name" value={dv.name} />
                            <IconButton onClick={handleEditDetailView} sx={{ position: 'absolute', top: -10, right: -5 }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Grid>
                ))}
            </div>

        /* Modal is for editing a detailview. */
        : (modalOpen === "editdv") ?
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop: '10px', maxHeight: '90vh', overflow: 'auto'}}>

                {/* Map each data source column to a grid item. Skip filter and user filter columns, only relevant to tableview. */}
                {datasourceColumns.map((dsC) => (
                    (dsC.isFilter || dsC.isUserFilter) ?
                        null
                    : 
                    <Grid item xs={10} key={dsC.id}>
                    {
                        <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>
                        {
                            /* Don't allow name change for edit filter column. */
                            dsC.isEditFilter ? 
                            <div>
                                <TextField variant="filled" label="Edit Filter" value={dsC.name} />
                            </div>

                            /* General column, allow edit. */
                            : <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <TextField variant="filled" label="Name" value={dsC.name} />
                                <Checkbox checked={detailViews[0].editableCols.includes(dsC.id)} />
                            </div>
                        }
                        
                        {/* Create as many textfields for each column as there are records. */}
                        {[...Array(recordCount)].map((_, index) => (
                            <TextField variant="filled" key={index}></TextField>
                        ))}
                        </div>
                    }
                    </Grid>
                ))}
            </div>

        /* Modal is for editing roles. */
        : 
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px', maxHeight: '80vh', overflow: 'auto'}}>
                    {tableViewPerms.map((tv) => (
                        <Grid item xs={4} key={tv.id}>
                            <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px', fontFamily: 'sans-serif'}}>
                                <div>{tv.name}</div>

                                {/* View Permission Checkbox */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tv.viewPerm}
                                            inputProps={{ 'aria-label': 'Checkbox example' }}
                                        />
                                    }
                                    label="View"
                                />  

                                {/* Add Record Checkbox */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tv.addPerm}
                                            inputProps={{ 'aria-label': 'Checkbox example' }}
                                        />
                                    }
                                    label="Add Record"
                                />  

                                {/* Delete Record Checkbox */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tv.deletePerm}
                                            inputProps={{ 'aria-label': 'Checkbox example' }}
                                        />
                                    }
                                    label="Delete Record"
                                /> 
                                
                                {/* Permission Dropdown */}
                                <FormControl>
                                    <InputLabel>DetailView</InputLabel>
                                    <Select style={{minWidth: '8vw', marginTop: '10px', marginBottom: '5px'}}> 

                                    {/* Select DetailView(s) Accessible */}
                                    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginLeft: '10px', marginTop: '10px', maxWidth: '110vh', maxHeight: '80vh', overflow: 'auto'}}>
                                        {detailViewPerms.map((dv) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={dv.editPerm}
                                                        inputProps={{ 'aria-label': 'Checkbox example' }}
                                                    />
                                                }
                                                label={dv.name}
                                            /> 
                                        ))}
                                    </div>
                                    </Select>
                                </FormControl>

                            </div>
                        </Grid>
                    ))}
            </div>
        

    /* Conditional rendering of the display screen. */
    const createScreen = 

        /* Display is for data sources. */
        (display === "ds") ?
            <div>
                {/* Create datasource button. */}
                <IconButton onClick={handleCreateDatasource} sx={{ fontSize: '1.25rem'}}>
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
                                <TextField variant="filled" label="Spreadsheet Name" value={ds.sheetName}/>

                                {/* Edit Datasource Button */}
                                <IconButton onClick={handleEditDatasource} sx={{ position: 'absolute', top: -10, right: -5 }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </Grid>
                    ))}
                </div>
            </div>

        /* Display is for tableviews. */
        : (display === "views") ?
            <div>
                {/* Create tableview button. */}
                <IconButton onClick={handleCreateTableView} sx={{ fontSize: '1.25rem'}}>
                    <AddIcon/>
                    Create New TableView
                </IconButton>

                {/* Map each table view to a grid item. */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px'}}>
                    {tableViews.map((tv) => (
                        <Grid item xs={4} key={tv.id}>
                            <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>
                                {tv.name}

                                {/* Name/Datasource Name Textfields */}
                                <TextField variant="filled" label="Name" value={tv.name}/>
                                <TextField variant="filled" label="Datasource Name" value={tv.datasourceName}/>

                                {/* Access DetailViews and Edit TableView Buttons */}
                                <IconButton onClick={handleTableViewZoom} sx={{ position: 'absolute', top: -10, left: -5 }}>
                                    <ZoomInIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={handleEditTableView} sx={{ position: 'absolute', top: -10, right: -5 }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </Grid>
                    ))}
                </div>
            </div>  
        /* Display is for roles. */
        : 
            <div>
                {/* Role Membership URL Textfield */}
                <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginLeft: '20px', marginTop: '20px'}}>
                    <div>Role Membership URL</div>
                    <TextField variant="filled" value={roleMemURL} sx={{maxWidth: '30vw'}}/>
                </div>
                
                {/* Map each role to a grid item. */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginLeft: '10px',marginTop: '20px'}}>
                    {roles.map((role) => (
                        <Grid item xs={4} key={role.id}>
                            <div style={{ width: '10vw', border: "2px solid #87CEEB", textAlign: 'center', position: 'relative', marginLeft: '10px', marginBottom: '20px'}}>
                                {role.name}

                                {/* Edit Role Button */}
                                <IconButton onClick={handleEditRole} sx={{ position: 'absolute', top: -10, right: -5 }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </Grid>
                    ))}
                </div>
            </div>

    return (
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
            {/* Navigation Bar */}
            <AppBar style={{ backgroundColor: '#6CA6CD' }}>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="App Name"
                        sx={{ flexGrow: 0.8 }}
                    />
                    <Button onClick={displayDatasources} color="inherit" sx={{ marginLeft: '40vw' }}>App Data Sources</Button>
                    <Button onClick={displayViews}  color="inherit" sx={{ marginLeft: '10px' }}>App Views</Button>
                    <Button onClick={displayRoles}  color="inherit" sx={{ marginLeft: '10px' }}>App Role Management</Button>
                    <Button onClick={handleSaveChanges} color="inherit" sx={{ marginLeft: '10px' }}>Save</Button>
                    <Button onClick={handleDiscardChanges} color="inherit" sx={{ marginLeft: '10px' }}>Discard</Button>
                </Toolbar>
            </AppBar>

            {/* Modal */}
            <Modal open={modalOpen !== ""} onClose={handleCloseModal} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
                <div style={{ backgroundColor: "#fff", padding: "30px" }}>
                    {modalContent}
                </div>
            </Modal>

            {/* Display */}
            <div style={{ flex: 1, overflow: 'auto', marginTop: "100px" }}>
                {createScreen}
            </div>
        </div>
    );
}

export default EditApp;