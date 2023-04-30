import { configureStore, combineReducers, createSlice, Reducer, Action, Store } from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { App, Datasource, Column, Record, Tableview, Detailview, Role, ModalType, View } from './StoreTypes'

import storeController, { addRecord, createApp, createDatasource, createDetailview, createTableview, deleteApp, deleteDatasource, deleteDetailview, deleteRecord, deleteTableview, editApp, editDatasource, editDatasourceColumns, editDetailview, editDetailviewColumns, editDetailviewRoles, editTableview, editTableviewColumns, editTableviewRoles, loadApp, loadDetailview, loadTableview, publishApp, viewAccApps, viewAppRoles, viewDatasourceColumns, viewDatasources, viewDetailviewColumns, viewDetailviewRoles, viewDetailviews, viewTableviewColumns, viewTableviewRoles, viewTableviews } from './StoreController'

// Import async thunks for API calls
import { viewDevApps } from './StoreController'
import { useDispatch } from 'react-redux';

export interface IS2AState {
    /* An array of developable apps for the current user. Set when navigating onto developable apps screen. */
    devApps: App[],

    /* An array of accessible apps for the current user. Set when navigating onto accessible apps screen. */
    accApps: App[],

    searchedDevApps: App[],
    searchedAccApps: App[],

    /* An array of roles belonging to the current app. Set when navigating onto edit tableview/detailview roles screen. */
    roles: Role[],

    /* An array of datasources belonging to the current app. Set when navigating onto edit datasources screen. */
    datasources: Datasource[],

    /* An array of datasource columns belonging to the current datasource. Set when navigating onto edit datasource columns screen. */
    datasourceColumns: Column[],

    /* An array of tableviews belonging to the current app. Set when navigating on edit tableviews screen. */
    tableviews: Tableview[],

    /* An array of tableview columns belonging to the current tableview. Set when navigating onto edit tableview columns screen. */
    tableviewColumns: Column[],

    /* An array of boolean values representing the filter column belonging to a tableview. */
    filterColumn: boolean[] | null,

    /* An array of string values representing the user filter column belonging to a tableview. */
    userFilterColumn: string[] | null,

    /* An array of tableview roles belonging to the current tableview. Set when navigating onto edit tableview roles screen. */
    tableviewRoles: Role[],

    /* An array of detailviews belonging to the current app. Set when navigating on edit detailviews screen. */
    detailviews: Detailview[],

    /* An array of detailview columns belonging to the current detailview. Set when navigating onto edit detailview columns screen. */
    detailviewColumns: Column[],

    /* An array of boolean values representing the edit filter column belonging to a detailview. */
    editFilterColumn: boolean[] | null,

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

    /* The app marked for publish on confirmation. */
    currentAppToPublish: App | null,

    /* The app marked for unpublish on confirmation. */
    currentAppToUnpublish: App | null,

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

    showSuccessAlert: boolean,
    showErrorAlert: boolean
}

const S2AState: IS2AState = {
    devApps: [],
    accApps: [],

    searchedDevApps: [],
    searchedAccApps: [],

    roles: [],

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

    currentAppToPublish: null,
    currentAppToUnpublish: null,
    
    currentDatasourceToEdit: null,
    currentTableviewToEdit: null,
    currentDetailviewToEdit: null,

    currentAppToDelete: null,
    currentDatasourceToDelete: null,
    currentTableviewToDelete: null,
    currentDetailviewToDelete: null,

    showSuccessAlert: false,
    showErrorAlert: false
}

export const S2AReducer = createSlice({
    name: 'S2A',
    initialState: S2AState,
    reducers: {
        hideSuccessAlert: (state) => {
            state.showSuccessAlert = false;
        },
        hideErrorAlert: (state) => {
            state.showErrorAlert = false;
        },
        searchDevApps: (state, action: PayloadAction<string>) => {
            state.searchedDevApps = state.devApps.filter(app => app.name.includes(action.payload));
        },
        searchAccApps: (state, action: PayloadAction<string>) => {
            state.searchedAccApps = state.accApps.filter(app => app.name.includes(action.payload));
        },
        clearSearch: (state) => {
            state.searchedAccApps = [];
            state.searchedDevApps = [];
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

        /* Mark resource publish reducers. */
        markAppToPublish: (state, action: PayloadAction<App>) => {
            state.currentAppToPublish = action.payload;
        },
        markAppToUnpublish: (state, action: PayloadAction<App>) => {
            state.currentAppToUnpublish = action.payload;
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

            console.log("Finished/cancelled creation of resource.");
        },
        finishPublish: (state) => {
            state.currentModalType = null;
            state.currentAppToPublish = null;

            console.log("Finished publishment of resource.");
        },
        finishUnpublish: (state) => {
            state.currentModalType = null;
            state.currentAppToUnpublish = null;

            console.log("Finished unpublishment of resource.");
        },
        finishEdit: (state) => {    
            state.datasourceColumns = [];

            state.tableviewColumns = [];
            state.filterColumn = [];
            state.userFilterColumn = [];
            state.tableviewRoles = [];

            state.detailviewColumns = [];
            state.editFilterColumn = [];
            state.detailviewRoles = [];

            state.currentDatasource = null;
            state.currentTableview = null;
            state.currentDetailview = null;
            state.currentModalType = null;
            
            state.currentDatasourceToEdit = null;
            state.currentTableviewToEdit = null;
            state.currentDetailviewToEdit = null;

            console.log("Finished/cancelled edit of resource.");
        },
        finishDeletion: (state) => {
            state.currentModalType = null;

            state.currentAppToDelete = null;
            state.currentDatasourceToDelete = null;
            state.currentTableviewToDelete = null;
            state.currentDetailviewToDelete = null;

            console.log("Finished/cancelled deletion of resource.");
        },
        resetAll: (state) => {
            state.devApps = [],
            state.accApps = [],

            state.searchedDevApps = [],
            state.searchedAccApps = [],

            state.showSuccessAlert = false,
            state.showErrorAlert = false,

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

            console.log("Complete reset of store state.");
        },
    }, 
    extraReducers(builder) {
        builder.addCase(viewDevApps.fulfilled, (state, action) => {
            state.devApps = action.payload;
            console.log("Retrieved developable apps.");
        });
        builder.addCase(viewDevApps.rejected, (state, action) => {
            console.log(`viewDevApps failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewAccApps.fulfilled, (state, action) => {
            state.accApps = action.payload;
            console.log("Retrieved accessible apps.");
        });
        builder.addCase(viewAccApps.rejected, (state, action) => {
            console.log(`viewAccApps failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewAppRoles.fulfilled, (state, action) => {
            state.roles = action.payload;
            console.log("Retrieved app roles.");
        });
        builder.addCase(viewAppRoles.rejected, (state, action) => {
            console.log(`viewAppRoles failed with the error ${action.error?.message}`);
        });

        builder.addCase(createApp.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Created app.");
        });
        builder.addCase(createApp.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`createApp failed with the error ${action.error?.message}`);
        });

        builder.addCase(editApp.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Edited app.");
        });
        builder.addCase(editApp.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`editApp failed with the error ${action.error?.message}`);
        });

        builder.addCase(deleteApp.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Deleted app.");
        });
        builder.addCase(deleteApp.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`deleteApp failed with the error ${action.error?.message}`);
        });

        /** Modify datasources */
        builder.addCase(viewDatasources.fulfilled, (state, action) => {
            state.datasources = action.payload;
            console.log("Retrieved datasources.");
        });
        builder.addCase(viewDatasources.rejected, (state, action) => {
            console.log(`viewDatasources failed with the error ${action.error?.message}`);
        });

        builder.addCase(createDatasource.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Created Datasource");
        });
        builder.addCase(createDatasource.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`createDatasource failed with the error ${action.error?.message}`);
        });

        builder.addCase(editDatasource.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Edited datasource.");
        });
        builder.addCase(editDatasource.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`editDatasource failed with the error ${action.error?.message}`);
        });

        builder.addCase(deleteDatasource.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Deleted datasource.");
        });
        builder.addCase(deleteDatasource.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`deleteDatasource failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewDatasourceColumns.fulfilled, (state, action) => {
            state.datasourceColumns = action.payload;
            console.log("Retrieved datasource columns.");
        });
        builder.addCase(viewDatasourceColumns.rejected, (state, action) => {
            console.log(`viewDatasourceColumns failed with the error ${action.error?.message}`);
        });

        builder.addCase(editDatasourceColumns.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Edited datasource columns.");
        });
        builder.addCase(editDatasourceColumns.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`editDatasourceColumns failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewTableviews.fulfilled, (state, action) => {
            state.tableviews = action.payload;
            console.log("Retrieved tableviews.")        
        });
        builder.addCase(viewTableviews.rejected, (state, action) => {
            console.log(`viewTableviews failed with the error ${action.error?.message}`);
        });

        /** Modify views */
        builder.addCase(createTableview.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Created tableview.");
        });
        builder.addCase(createTableview.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`createTableview failed with the error ${action.error?.message}`);
        });

        builder.addCase(editTableview.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Edited tableview.");
        });   
        builder.addCase(editTableview.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`editTableview failed with the error  ${action.error?.message}`);
        });

        builder.addCase(deleteTableview.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
            console.log("Deleted tableview.");
        });   
        builder.addCase(deleteTableview.rejected, (state, action) => {
            state.showErrorAlert = true;
            console.log(`deleteTableview failed with the error ${action.error?.message}`);
        });

        builder.addCase(createDetailview.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(createDetailview.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(editDetailview.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });   
        builder.addCase(editDetailview.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(deleteDetailview.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });   
        builder.addCase(deleteDetailview.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(viewTableviewColumns.fulfilled, (state, action) => {
            const {tableviewColumns, filterColumn, userFilterColumn} = action.payload;

            state.tableviewColumns = tableviewColumns;
            state.filterColumn = filterColumn;
            state.userFilterColumn = userFilterColumn;
            console.log("Retrieved tableview columns.")
        });
        builder.addCase(viewTableviewColumns.rejected, (state, action) => {
            console.log(`viewTableviewColumns failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewTableviewRoles.fulfilled, (state, action) => {
            state.tableviewRoles = action.payload;
            console.log("Retrieved tableview roles.")
        });
        builder.addCase(viewTableviewRoles.rejected, (state, action) => {
            console.log(`viewTableviewRoles failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewDetailviews.fulfilled, (state, action) => {
            state.detailviews = action.payload;
            console.log("Retrieved detailviews.")
        });
        builder.addCase(viewDetailviews.rejected, (state, action) => {
            console.log(`viewDetailviews failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewDetailviewColumns.fulfilled, (state, action) => {
            const {detailviewColumns, editFilterColumn} = action.payload;

            state.detailviewColumns = detailviewColumns;
            state.editFilterColumn = editFilterColumn;
            console.log("Retrieved detailview columns.")
        });
        builder.addCase(viewDetailviewColumns.rejected, (state, action) => {
            console.log(`viewDetailviewColumns failed with the error ${action.error?.message}`);
        });

        builder.addCase(viewDetailviewRoles.fulfilled, (state, action) => {
            state.detailviewRoles = action.payload;
            console.log("Retrieved detailview roles.");
        });
        builder.addCase(viewDetailviewRoles.rejected, (state, action) => {
            console.log(`viewDetailviewRoles failed with the error ${action.error?.message}`);
        });

        builder.addCase(editDetailviewColumns.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(editDetailviewColumns.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(editTableviewColumns.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(editTableviewColumns.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(editDetailviewRoles.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(editDetailviewRoles.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(editTableviewRoles.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(editTableviewRoles.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(publishApp.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(publishApp.rejected, (state, action) => {
            state.showErrorAlert = true;
        });


        /** User App additional reducers */
        
    }
  }
)

export interface IWebAppState {
    app: App | null,

    // An array of Views that have been previously loaded by the user
    tableviews: Tableview[],

    currentDatasource: Datasource | null,
    currentTableview: Tableview | null,
    currentDetailview: Detailview | null,
    
    // The current modal type that is open on the screen (Add record modal, edit record modal, delete record modal)
    currentModalType: ModalType | null,

    currentRecordIndex: number | null,

    records: any[][],
    columns: Column[],
    columnData: any[][],
    currentRecordData: any[],

    firstRecordColumns: Column[],

    // The current Record being edited/deleted. This will be set whenever an end user opens up a record to view it,
    // or clicks on the Delete Record button.
    currentRecord: Record | null,

    showSuccessAlert: boolean,
    showErrorAlert: boolean
}

const webAppState: IWebAppState = {
    app: null,
    tableviews: [],
    currentDatasource: null,
    currentTableview: null,
    currentDetailview: null,
    currentModalType: null,
    currentRecord: null,

    currentRecordIndex: null,

    records: [],
    columns: [],
    columnData: [],
    currentRecordData: [],

    /** Store the indexes of the columns contained by the first record in the current table */
    firstRecordColumns: [],

    showSuccessAlert: false,
    showErrorAlert: false,
}

const webAppReducer = createSlice({
    name: 'webApp',
    initialState: webAppState,
    reducers: {
        openApp: (state, action: PayloadAction<App>) => {
            state.app = action.payload;
        },
        returnToS2A: (state) => {
            state.app = null;
        },

        setRecords: (state, action: PayloadAction<any[][]>) => {
            state.records = action.payload;
        },
        webAppSetCurrentTableview: (state, action: PayloadAction<Tableview>) => {
            state.currentTableview = action.payload;
        },
        webAppSetCurrentDatasource: (state, action: PayloadAction<Datasource>) => {
            state.currentDatasource = action.payload;
        },
        setCurrentRecordIndex: (state, action: PayloadAction<number>) => {
            state.currentRecordIndex = action.payload;
        },

        setFirstRecordColumns: (state, action: PayloadAction<any[]>) => {
            state.firstRecordColumns = action.payload;
        },
        editRecord: (state, action: {payload: Record}) => {
            if (!state.currentDatasource || !state.currentRecord) return;

            storeController.editRecord(state.currentDatasource, state.currentRecord.id, action.payload)
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
        showDeleteRecordModal: (state) => {
            state.currentModalType = ModalType.DeleteRecordModal;
        },
        // Hides the current Modal
        hideWebAppModal: state => {
            state.currentModalType = null
        },

        hideWebAppSuccessAlert: state => {
            state.showSuccessAlert = false;
        },
        hideWebAppErrorAlert: state => {
            state.showErrorAlert = false;
        },

        goToUserAppHome: state => {
            state.currentDatasource = null;
            state.currentTableview = null;
            state.currentDetailview = null;
            state.currentModalType = null;
            state.currentRecord = null;
        
            state.showSuccessAlert = false;
            state.showErrorAlert = false;
        }
    }, 
    extraReducers(builder) {
        builder.addCase(loadApp.fulfilled, (state, action) => {
            state.tableviews = action.payload;
        });
        builder.addCase(loadApp.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(loadTableview.fulfilled, (state, action) => {
            const {columns, columnData, detailview, editableColumns} = action.payload;

            state.columns = columns;
            state.columnData = columnData;
            state.currentDetailview = detailview;

            const newRecords = [];
            const columnKeys = Object.keys(columnData) as unknown as number[];
            const firstRecordColumns = [];

            for (let i = 1; i < columnData[columnKeys[0]].length; i++) {
                let currRecord = [];
                for (let j = 0; j < columnKeys.length; j++) {
                    if (i == 1 && editableColumns[j].editable) {
                        /** Store the data for the first detail view */
                        firstRecordColumns.push(columns[j]);
                    }
                    currRecord.push(columnData[columnKeys[j]][i]);
                }
                newRecords.push(currRecord);
            }

            state.records = newRecords;
            state.firstRecordColumns = firstRecordColumns;
        });
        builder.addCase(loadTableview.rejected, (state, action) => {
            state.showErrorAlert = true;
        });


        builder.addCase(loadDetailview.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(loadDetailview.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(addRecord.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(addRecord.rejected, (state, action) => {
            state.showErrorAlert = true;
        });

        builder.addCase(deleteRecord.fulfilled, (state, action) => {
            state.showSuccessAlert = true;
        });
        builder.addCase(deleteRecord.rejected, (state, action) => {
            state.showErrorAlert = true;
        });
    }
})

// TODO: EXPORT ALL OF THE REDUCER ACTIONS SO THEY ARE ACCESSIBLE IN DISPATCH CALLS
export const { 
    hideSuccessAlert, hideErrorAlert, searchDevApps, searchAccApps, clearSearch,
    setCurrentApp, setCurrentDatasource, setCurrentTableview, setCurrentDetailview, setCurrentModalType,
    markDatasourceToEdit, markTableviewToEdit, markDetailviewToEdit, markAppToPublish, markAppToUnpublish,
    markAppToDelete, markDatasourceToDelete, markTableviewToDelete, markDetailviewToDelete, 
    finishCreation, finishEdit, finishDeletion, finishPublish, finishUnpublish, resetAll
 } = S2AReducer.actions

export const { openApp, returnToS2A, editRecord, setCurrentRecordIndex, setFirstRecordColumns, setRecords,
    showAddRecordModal, showEditRecordModal, showDeleteRecordModal, webAppSetCurrentTableview, webAppSetCurrentDatasource,
    hideWebAppModal, hideWebAppErrorAlert, hideWebAppSuccessAlert, goToUserAppHome } = webAppReducer.actions;

// Interface for pulling the reducer state. Prevents TypeScript type errors
export interface StoreState {
    S2AReducer: IS2AState, 
    webAppReducer: IWebAppState
}

/* Combine reducers into single object. */
const rootReducer: Reducer<StoreState, Action<any>> = combineReducers({
    S2AReducer: S2AReducer.reducer,
    webAppReducer: webAppReducer.reducer
});

/* Setup configuration such that redux knows how to persist state in local storage. */
const persistConfig = {
    key: 'store',
    storage,
};

/* Have redux generate new reducer functions that takes care of persistence. */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Create store object with new reducer. */
const store = configureStore({
    reducer: persistedReducer
});

/* Create persistor object that will be introduced into the DOM along with the store. */
const persistor = persistStore(store);

export {store, persistor}