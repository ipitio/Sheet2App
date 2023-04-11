import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit"

import { App, Datasource, Column, Record, Tableview, Detailview, Role, ModalType, View } from './StoreTypes'

import storeController from './StoreController'

export interface IS2AState {
    /* An array of developable apps for the current user. Set when navigating onto developable apps screen. */
    devApps: App[],

    /* An array of accessible apps for the current user. Set when anvigating onto accessible apps screen. */
    accApps: App[],

    /* An array of datasources belonging to the current app. Set when navigating onto edit datasources screen. */
    datasources: Datasource[],

    /* An array of datasource columns belonging to the current datasource. Set when navigating onto edit datasource columns screen. */
    datasourceColumns: Column[],

    /* An array of tableviews belonging to the current app. Set when navigating on edit tableviews screen. */
    tableviews: Tableview[],

    /* An array of tableview columns belonging to the current tableview. Set when navigating onto edit tableview columns screen. */
    tableviewColumns: Column[],

    /* An array of boolean values representing the filter column belonging to a tableview. */
    filterColumn: boolean[],

    /* An array of string values representing the user filter column belonging to a tableview. */
    userFilterColumn: string[],

    /* An array of tableview roles belonging to the current tableview. Set when navigating onto edit tableview roles screen. */
    tableviewRoles: Role[],

    /* An array of detailviews belonging to the current app. Set when navigating on edit detailviews screen. */
    detailviews: Detailview[],

    /* An array of detailview columns belonging to the current detailview. Set when navigating onto edit detailview columns screen. */
    detailviewColumns: Column[],

    /* An array of boolean values representing the edit filter column belonging to a detailview. */
    editFilterColumn: boolean[],

    /* An array of detailview roles belonging to the current detailview. Set when navigating onto edit detailview roles screen. */
    detailviewRoles: Role[],

    /* The current app focus. Set when the user navigates into edit app. */
    currentApp: App | null,

    /* The current datasource focus. Set when the user navigates into edit datasource. */
    currentDatasource: Datasource | null,
    
    /* The current tableview focus. Set when the user navigates into edit tableview. */
    currentTableview: Tableview | null,

    /* The current detailview focus. Set when the user navigates into edit detailview. */
    currentDetailview: Detailview | null,

    /* The type of modal currently open for creation/edit/deletion. */
    currentModalType: ModalType | null,

    /* The datasource marked for edit on confirmation. */
    currentDatasourceToEdit: Datasource | null,

    /* The tableview marked for edit on confirmation. */
    currentTableviewToEdit: Tableview | null,

    /* The detailview marked for edit on confirmation. */
    currentDetailviewToEdit: Detailview | null,

    /* The app marked for deletion on confirmation. */
    currentAppToDelete: App | null,

    /* The datasource marked for deletion on confirmation. */
    currentDatasourceToDelete: Datasource | null,

    /* The tableview marked for deletion on confirmation. */
    currentTableviewToDelete: Tableview | null,

    /* The detailview marked for deletion on confirmation. */
    currentDetailviewToDelete: Detailview | null,
}

const S2AState: IS2AState = {
    devApps: [],
    accApps: [],

    datasources: [],
    datasourceColumns: [],

    tableviews: [],
    tableviewColumns: [],
    filterColumn: [],
    userFilterColumn: [],
    tableviewRoles: [],

    detailviews: [],
    detailviewColumns: [],
    editFilterColumn: [],
    detailviewRoles: [],

    currentApp: null,
    currentDatasource: null,
    currentTableview: null,
    currentDetailview: null,
    currentModalType: null,

    currentDatasourceToEdit: null,
    currentTableviewToEdit: null,
    currentDetailviewToEdit: null,

    currentAppToDelete: null,
    currentDatasourceToDelete: null,
    currentTableviewToDelete: null,
    currentDetailviewToDelete: null,
}

const S2AReducer = createSlice({
    name: 'S2AReducer',
    initialState: S2AState,
    reducers: {
        /* App related reducers. */
        viewDevApps: (state) => {
            storeController.getDevelopableApps()
                .then((devApps: App[]) => {
                    state.devApps = devApps;
                    console.log("Retrieved developable apps.");
                })
                .catch((error: Error) => {
                    console.log(`viewDevApps failed with the error ${error}`);
                });
        },
        viewAccApps: (state) => {
            storeController.getAccessibleApps()
                .then((accApps: App[]) => {
                    state.accApps = accApps;
                    console.log("Retrieved accessible apps.");
                })
                .catch((error: Error) => {
                    console.log(`viewAccApps failed with the error ${error}`);
                });
        },
        createApp: (state, action: PayloadAction<string>) => {
            storeController.createApp(action.payload)
                .then(() => {
                    console.log("Created app.");
                })
                .catch((error: Error) => {
                    console.log(`createApp failed with the error ${error}`);
                })
        },
        editApp: (state, action: PayloadAction<App>) => {
            storeController.editApp(action.payload) 
                .then(() => {
                    console.log("Edited app.")
                })
                .catch((error: Error) => {
                    console.log(`editApp failed with the error ${error}`);
                })
        },
        deleteApp: (state) => {
            if(state.currentAppToDelete) {
                storeController.deleteApp(state.currentAppToDelete)
                    .then(() => {
                        console.log("Deleted app.");
                    })
                    .catch((error: Error) => {
                        console.log(`deleteApp failed with the error ${error}`);
                    })
            }
        },

        /* Datasource related reducers. */
        viewDatasources: (state) => {
            if(state.currentApp) {
                storeController.getAppDatasources(state.currentApp) 
                    .then((datasources: Datasource[]) => {
                        state.datasources = datasources;
                        console.log("Retrieved datasources.");
                    })
                    .catch((error: Error) => {
                        console.log(`viewDatasources failed with the error ${error}`);
                    })
            }
        },
        createDatasource: (state, action: PayloadAction<{ datasourceName: string, spreadsheetUrl: string, sheetName: string }>) => {
            if(state.currentApp) {
                storeController.createDatasource(state.currentApp, action.payload.datasourceName, action.payload.spreadsheetUrl, action.payload.sheetName)
                    .then(() => {
                        console.log("Created datasource.");
                    })
                    .catch((error: Error) => {
                        console.log(`createDatasource failed with the error ${error}`);
                    })
            }
        },
        editDatasource: (state, action: PayloadAction<Datasource>) => {
            if(state.currentDatasourceToEdit) {
                storeController.editDatasource(action.payload)
                    .then(() => {
                        console.log("Edited datasource.");
                    })
                    .catch((error: Error) => {
                        console.log(`editDatasource failed with the error ${error}`);
                    })
            }
        },
        deleteDatasource: (state) => {
            if(state.currentDatasourceToDelete) {
                storeController.deleteDatasource(state.currentDatasourceToDelete)
                    .then(() => {
                        console.log("Deleted datasource.");
                    })
                    .catch((error: Error) => {
                        console.log(`deleteDatasource failed with the error ${error}`);
                    })
            }
        },

        /* Datasource column related reducers. */
        viewDatasourceColumns: (state) => {
            if(state.currentDatasource) {
                storeController.getDatasourceColumns(state.currentDatasource) 
                    .then((datasourceColumns: Column[]) => {
                        state.datasourceColumns = datasourceColumns;
                        console.log("Retrieved datasource columns.");
                    })
                    .catch((error: Error) => {
                        console.log(`viewDatasourceColumns failed with the error ${error}`);
                    })
            }
        },
        editDatasourceColumns: (state, action: PayloadAction<Column[]>) => {
            if(state.currentDatasource) {
                storeController.editDatasourceColumns(state.currentDatasource, action.payload) 
                    .then(() => {
                        console.log("Edited datasource columns.");
                    })
                    .catch((error: Error) => {
                        console.log(`editDatasourceColumns failed with the error ${error}`);
                    })
            }
        },

        /* Tableview related reducers. */
        viewTableviews: (state) => {
            if(state.currentApp) {
                storeController.getAppTableviews(state.currentApp)       
                    .then((tableviews: Tableview[]) => {
                        state.tableviews = tableviews;
                        console.log("Retrieved tableviews.")
                    })
                    .catch((error: Error) => {
                        console.log(`viewTableviews failed with the error ${error}`);
                    })
            }
        },
        createTableview: (state, action: PayloadAction<{ tableviewName: string, datasource: Datasource }>) => {
            if(state.currentApp) {
                storeController.createTableview(state.currentApp, action.payload.tableviewName, action.payload.datasource)
                    .then(() => {
                        console.log("Created tableview.");
                    })
                    .catch((error: Error) => {
                        console.log(`createTableview failed with the error ${error}`);
                    })
            }
        },
        editTableview: (state, action: PayloadAction<Tableview>) => {
            if(state.currentTableviewToEdit) {
                storeController.editTableview(action.payload) 
                    .then(() => {
                        console.log("Edited tableview.");
                    })
                    .catch((error: Error) => {
                        console.log(`editTableview failed with the error ${error}`);
                    })
            }
        },  
        deleteTableview: (state, action: PayloadAction<Tableview>) => {
            if(state.currentTableviewToDelete) {
                storeController.deleteTableview(action.payload)
                    .then(() => {
                        console.log("Deleted tableview.");
                    })
                    .catch((error: Error) => {
                        console.log(`deleteTableview failed with the error ${error}`);
                    })
            }
        },

        /* Tableview column related reducers. */
        viewTableviewColumns: (state) => {
            if(state.currentTableview) {
                storeController.getTableviewColumns(state.currentTableview) 
                    .then(([tableviewColumns, filterColumn, userFilterColumn]) => {
                        state.tableviewColumns = tableviewColumns;
                        state.filterColumn = filterColumn;
                        state.userFilterColumn = userFilterColumn;
                        console.log("Retrieved tableview columns.")
                    })
                    .catch((error: Error) => {
                        console.log(`viewTableviewColumns failed with the error ${error}`);
                    })
                }
        },
        editTableviewColumns: (state, action: PayloadAction<{ tableviewColumns: Column[], filterColumn: boolean[], userFilterColumn: string[] }>) => {
            if(state.currentTableview) {
                storeController.editTableviewColumns(state.currentTableview, action.payload.tableviewColumns, action.payload.filterColumn, action.payload.userFilterColumn)
                    .then(() => {
                        console.log("Edited tableview columns.");
                    })
                    .catch((error: Error) => {
                        console.log(`editTableviewColumns failed with the error ${error}`);
                    })
            }
        },

        /* Tableview role related reducers. */
        viewTableviewRoles: (state) => {
            if(state.currentTableview) {
                storeController.getTableviewRoles(state.currentTableview)
                    .then((tableviewRoles: Role[]) => {
                        state.tableviewRoles = tableviewRoles;
                        console.log("Retrieved tableview roles.")
                    })
                    .catch((error: Error) => {
                        console.log(`viewTableviewRoles failed with the error ${error}`);
                    })
            }
        },
        editTableviewRoles: (state, action: PayloadAction<Role[]>) => {
            if(state.currentTableview) {
                storeController.editTableviewRoles(state.currentTableview, action.payload) 
                    .then(() => {
                        console.log("Edited tableview roles.")
                    })
                    .catch((error: Error) => {
                        console.log(`editTableviewRoles failed with the error ${error}`);
                    })
            }
        },

        /* Detailview related reducers. */
        viewDetailviews: (state) => {
            if(state.currentApp) {
                storeController.getAppDetailviews(state.currentApp)       
                    .then((detailviews: Detailview[]) => {
                        state.detailviews = detailviews;
                        console.log("Retrieved detailviews.")
                    })
                    .catch((error: Error) => {
                        console.log(`viewDetailviews failed with the error ${error}`);
                    })
            }
        },
        createDetailview: (state, action: PayloadAction<{ detailviewName: string, datasource: Datasource }>) => {
            if(state.currentApp) {
                storeController.createDetailview(state.currentApp, action.payload.detailviewName, action.payload.datasource)
                    .then(() => {
                        console.log("Created detailview.");
                    })
                    .catch((error: Error) => {
                        console.log(`createDetailview failed with the error ${error}`);
                    })
            }
        },
        editDetailview: (state, action: PayloadAction<Detailview>) => {
            if(state.currentDetailviewToEdit) {
                storeController.editDetailview(action.payload) 
                    .then(() => {
                        console.log("Edited detailview.");
                    })
                    .catch((error: Error) => {
                        console.log(`editDetailview failed with the error ${error}`);
                    })
            }
        },
        deleteDetailview: (state, action: PayloadAction<Detailview>) => {
            if(state.currentDetailviewToDelete) {
                storeController.deleteDetailview(action.payload)
                    .then(() => {
                        console.log("Deleted detailview.");
                    })
                    .catch((error: Error) => {
                        console.log(`deleteDetailview failed with the error ${error}`);
                    })
            }
        },

        /* Detailview column related reducers. */
        viewDetailviewColumns: (state) => {
            if(state.currentDetailview) {
                storeController.getDetailviewColumns(state.currentDetailview) 
                    .then(([detailviewColumns, editFilterColumn]) => {
                        state.detailviewColumns = detailviewColumns;
                        state.editFilterColumn = editFilterColumn;
                        console.log("Retrieved detailview columns.")
                    })
                    .catch((error: Error) => {
                        console.log(`viewDetailviewColumns failed with the error ${error}`);
                    })
                }
        },
        editDetailviewColumns: (state, action: PayloadAction<{ detailviewColumns: Column[], editFilterColumn: boolean[] }>) => {
            if(state.currentDetailview) {
                storeController.editDetailviewColumns(state.currentDetailview, action.payload.detailviewColumns, action.payload.editFilterColumn)
                    .then(() => {
                        console.log("Edited detailview columns.");
                    })
                    .catch((error: Error) => {
                        console.log(`editDetailviewColumns failed with the error ${error}`);
                    })
            }
        },

        /* Detailview role related reducers. */
        viewDetailviewRoles: (state) => {
            if(state.currentDetailview) {
                storeController.getDetailviewRoles(state.currentDetailview)
                    .then((detailviewRoles: Role[]) => {
                        state.detailviewRoles = detailviewRoles;
                        console.log("Retrieved detailview roles.")
                    })
                    .catch((error: Error) => {
                        console.log(`viewDetailviewRoles failed with the error ${error}`);
                    })
            }
        },
        editDetailviewRoles: (state, action: PayloadAction<Role[]>) => {
            if(state.currentDetailview) {
                storeController.editDetailviewRoles(state.currentDetailview, action.payload) 
                    .then(() => {
                        console.log("Edited detailview roles.");
                    })
                    .catch((error: Error) => {
                        console.log(`editDetailviewRoles failed with the error ${error}`);
                    })
            }
        },
        
        /* Set current resource reducers. */
        setCurrentApp: (state, action: PayloadAction<App>) => {
            state.currentApp = action.payload;
        },
        setCurrentDatasource: (state, action: PayloadAction<Datasource>) => {
            state.currentDatasource = action.payload;
        },
        setCurrentTableview: (state, action: PayloadAction<Tableview>) => {
            state.currentTableview = action.payload;
        },
        setCurrentDetailview: (state, action: PayloadAction<Detailview>) => {
            state.currentDetailview = action.payload;
        },
        setCurrentModalType: (state, action: PayloadAction<ModalType | null>) => {
            state.currentModalType = action.payload;
        },

        /* Mark resource edit reducers. */
        markDatasourceToEdit: (state, action: PayloadAction<Datasource>) => {
            state.currentDatasourceToEdit = action.payload;
        },
        markTableviewToEdit: (state, action: PayloadAction<Tableview>) => {
            state.currentTableviewToEdit = action.payload;
        },
        markDetailviewToEdit: (state, action: PayloadAction<Detailview>) => {
            state.currentDetailviewToEdit = action.payload;
        },

        /* Mark resource delete reducers. */
        markAppToDelete: (state, action: PayloadAction<App>) => {
            state.currentAppToDelete = action.payload;
        },
        markDatasourceToDelete: (state, action: PayloadAction<Datasource>) => {
            state.currentDatasourceToDelete = action.payload;
        },
        markTableviewToDelete: (state, action: PayloadAction<Tableview>) => {
            state.currentTableviewToDelete = action.payload;
        },
        markDetailviewToDelete: (state, action: PayloadAction<Detailview>) => {
            state.currentDetailviewToDelete = action.payload;
        },

        /* State clearing reducers. */
        finishCreation: (state) => {
            state.currentModalType = null;

            console.log("Finished/cancelled creation of resource.")
        },
        finishEdit: (state) => {    
            state.datasourceColumns = [];

            state.tableviewColumns = [];
            state.filterColumn = [];
            state.userFilterColumn = [];

            state.detailviewColumns = [];
            state.editFilterColumn = [];
            
            state.currentDatasourceToEdit = null;
            state.currentTableviewToEdit = null;
            state.currentDetailviewToEdit = null;
            state.currentModalType = null;

            console.log("Finished/cancelled edit of resource.")
        },
        finishDeletion: (state) => {
            state.currentAppToDelete = null;
            state.currentDatasourceToDelete = null;
            state.currentTableviewToDelete = null;
            state.currentDetailviewToDelete = null;
            state.currentModalType = null;

            console.log("Finished/cancelled deletion of resource.")
        },
        resetAll: (state) => {
            state.devApps = [],
            state.accApps = [],

            state.datasources = [],
            state.datasourceColumns = [],

            state.tableviews = [],
            state.tableviewColumns = [],
            state.filterColumn = [],
            state.userFilterColumn = [],
            state.tableviewRoles = [],

            state.detailviews = [],
            state.detailviewColumns = [],
            state.editFilterColumn = [],
            state.detailviewRoles = [],

            state.currentApp = null,
            state.currentDatasource = null,
            state.currentTableview = null,
            state.currentDetailview = null,
            state.currentModalType = null,

            state.currentDatasourceToEdit = null,
            state.currentTableviewToEdit = null,
            state.currentDetailviewToEdit = null,

            state.currentAppToDelete = null,
            state.currentDatasourceToDelete = null,
            state.currentTableviewToDelete = null,
            state.currentDetailviewToDelete = null

            console.log("Complete reset of store state.")
        },
    }
})

export interface IWebAppState {
    // An array of Views that have been previously loaded by the user
    views: View[],

    // The current view denotes the view that changes (add, edit, delete record) will apply to, since the user can only be on
    // one view at a time.
    currentView: View | null,
    
    // The current modal type that is open on the screen (Add record modal, edit record modal, delete record modal)
    currentModalType: ModalType | null,

    // The current Record being edited/deleted. This will be set whenever an end user opens up a record to view it,
    // or clicks on the Delete Record button.
    currentRecord: Record | null
}

const webAppState: IWebAppState = {
    views: [],
    currentView: null,
    currentModalType: null,
    currentRecord: null
}

const webAppReducer = createSlice({
    name: 'webAppReducer',
    initialState: webAppState,
    reducers: {
        // Loads a view and sets it as the current (visible) view
        loadView: (state, action: {payload: View, type: string}) => {
            // TODO

            // Make the API call to retrieve the view from the sheets database

            // On successful response, update the current view to the responded data
            // state.currentView = res.data
        },
        setCurrentView: (state, action: {payload: View}) => {
            state.currentView = action.payload;
        },
        // Called by the AddRecordModal when changes are submitted
        addRecord: (state, action: {payload: Record, type: string}) => {
            if (!state.currentView) return;

            storeController.addRecord(state.currentView.id, action.payload)
            .then(() => {
                console.log("Added Record");
            })
            .catch((error: Error) => {
                console.log(error);
            })
        },
        // Called by the DeleteRecordModal when changes are submitted
        deleteRecord: (state) => {
            if (!state.currentView || !state.currentRecord) return;

            storeController.deleteRecord(state.currentView.id, state.currentRecord.id)
            .then(() => {
                console.log("Deleted Record");
            })
            .catch((error: Error) => {
                console.log(error);
            })
        },
        // Called by the EditRecordModal when changes are submitted
        editRecord: (state, action: {payload: Record}) => {
            if (!state.currentView || !state.currentRecord) return;

            storeController.editRecord(state.currentView.id, state.currentRecord.id, action.payload)
            .then(() => {
                console.log("Edited Record");
            })
            .catch((error: Error) => {
                console.log(error);
            })
        },
        // Displays the AddRecord Modal
        showAddRecordModal: state => {
            state.currentModalType = ModalType.AddRecordModal;
        },
        // Displays the EditRecord Modal
        showEditRecordModal: (state, action: {payload: Record})  => {
            state.currentModalType = ModalType.EditRecordModal;

            state.currentRecord = action.payload;
        },
        // Displays the DeleteRecord Modal
        showDeleteRecordModal: (state, action: {payload: Record}) => {
            state.currentModalType = ModalType.DeleteRecordModal;

            state.currentRecord = action.payload;
        },
        // Hides the current Modal
        hideWebAppModal: state => {
            state.currentModalType = null
        }
    }
})

// TODO: EXPORT ALL OF THE REDUCER ACTIONS SO THEY ARE ACCESSIBLE IN DISPATCH CALLS
export const { viewDevApps, viewAccApps, createApp, editApp, deleteApp,
               viewDatasources, createDatasource, editDatasource, deleteDatasource, 
               viewDatasourceColumns, editDatasourceColumns, 
               viewTableviews, createTableview, editTableview, deleteTableview,
               viewTableviewColumns, editTableviewColumns, 
               viewTableviewRoles, editTableviewRoles,
               viewDetailviews, createDetailview, editDetailview, deleteDetailview,
               viewDetailviewColumns, editDetailviewColumns, 
               viewDetailviewRoles, editDetailviewRoles, 
               setCurrentApp, setCurrentDatasource, setCurrentTableview, setCurrentDetailview, setCurrentModalType,
               markDatasourceToEdit, markTableviewToEdit, markDetailviewToEdit, 
               markAppToDelete, markDatasourceToDelete, markTableviewToDelete, markDetailviewToDelete, 
               finishCreation, finishEdit, finishDeletion, resetAll
            } = S2AReducer.actions

export const { setCurrentView, addRecord, editRecord, deleteRecord, showAddRecordModal, showEditRecordModal, showDeleteRecordModal, hideWebAppModal } = webAppReducer.actions;

// Interface for pulling the reducer state. Prevents TypeScript type errors
export interface StoreState {
    S2AReducer: IS2AState, 
    webAppReducer: IWebAppState
}

const store = configureStore({
    reducer: {
        S2AReducer: S2AReducer.reducer,
        webAppReducer: webAppReducer.reducer
    }
})  

export default store