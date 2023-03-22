import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { App, Datasource, Role, View, Record, Column, ColumnType, ModalType } from './StoreTypes'

import storeController from './StoreController'

export interface IS2AState {
    // A list of all apps owned by the user
    devApps: App[],

    // A list of all apps accessible to the user
    accApps: App[],

    // A list of data sources that have been retrieved from the database for the current user's app
    datasources: Datasource[],

    // The current application that the user is editing. Since the owner can only edit one application at a time on a web page, all changes requested
    // affect currentApp itself
    currentApp: App | null,

    // The current view that is being edited
    currentView: View | null,

    // The current role that is being edited
    currentRole: Role | null,

    // The current modal type that is open on the screen (Create App)
    currentModalType: ModalType | null,

    // The current datasource being edited
    currentDatasource: Datasource | null,

    // The current column being edited
    currentColumn: Column | null
}

const s2aState: IS2AState = {
    devApps: [],
    accApps: [],
    datasources: [],
    currentApp: null,
    currentView: null,
    currentRole: null,
    currentModalType: null,
    currentDatasource: null,
    currentColumn: null
}

const s2aReducer = createSlice({
    name: 's2aReducer',
    initialState: s2aState,
    reducers: {
        viewDevApps: (state) => {
            storeController.getDevelopableApps()
                .then((devApps: App[]) => {
                    state.devApps = devApps;
                })
                .catch((error: Error) => {
                    console.log(error);
                });
        },
        viewAccApps: (state) => {
            storeController.getAccessibleApps()
                .then((accApps: App[]) => {
                    state.accApps = accApps;
                })
                .catch((error: Error) => {
                    console.log(error);
                });
        },
        createApp: (state, action: PayloadAction<string>) => {
           storeController.createApp(action.payload)
                .then(() => {
                    console.log("Created App");
                })
                .catch((error: Error) => {
                    console.log(error);
                })
        },
        deleteApp: (state, action: PayloadAction<number>) => {
            storeController.deleteApp(action.payload)
                .then(() => {
                    console.log("Deleted App");
                })
                .catch((error: Error) => {
                    console.log(error);
                })
        },
        renameApplication: state => {
            // TODO
        },
        createDatasource: (state, action: {payload: {spreadsheetID: string, sheetID: number, datasourceName: string}, type: string}) => {
            if (state.currentApp) {
                storeController.createDatasource(
                    state.currentApp?.id,
                    action.payload.spreadsheetID,
                    action.payload.sheetID,
                    action.payload.datasourceName
                )
            } else {
                console.log("No active app.");
            }
        },
        deleteDatasource: state => {
            // TODO
        },
        editDatasource: (state, action: {payload: {
            datasourceKey: number,
            spreadsheetID: string,
            sheetIdx: number,
            datasourceName: string,
            columns: Column[]
        }}) => {
            // TODO
            if (state.currentApp) {
                storeController.editDatasource(
                    action.payload.datasourceKey,
                    action.payload.spreadsheetID,
                    action.payload.sheetIdx,
                    action.payload.datasourceName,
                    action.payload.columns
                )
            } else {
                console.log("No active app.");
            }
        },
        publishApp: state => {
            // TODO
        },
        viewDatasources: state => {
            // TODO
        },
        setViewName: state => {
            // TODO
        },
        setViewDatasource: state => {
            // TODO
        },
        setViewType: state => {
            // TODO
        },
        setViewColumns: state => {
            // TODO
        },
        setCurrentColumn: (state, action: {payload: {column: Column}}) => {
            state.currentColumn = action.payload.column;
        },
        setCurrentDatasource: (state, action: {payload: {datasource: Datasource}}) => {
            state.currentDatasource = action.payload.datasource;
        },
        showCreateAppModal: (state) => {
            state.currentModalType = ModalType.CreateAppModal;
        },
        showEditAppCreateDatasourcesModal: (state) => {
            state.currentModalType = ModalType.EditAppCreateDatasourcesModal;
        },
        showEditAppEditDatasourcesModal: (state) => {
            state.currentModalType = ModalType.EditAppEditDatasourcesModal;
        },
        showEditAppTableViewModal: (state) => {
            state.currentModalType = ModalType.EditAppTableViewModal;
        },
        hideS2aModal: (state) => {
            state.currentModalType = null;
        }
    }
})

export interface IWebAppState {
    // An array of Views that have been previously loaded by the user
    views: View[],

    // The current view denotes the view that changes (add, edit, delete record) will apply to, since the user can only be on
    // one view at a time.
    currentView: View | null,
    
    // The current modal type that is open on the screen (Add record modal, edit record modal, delete record modal)
    currentModalType: ModalType | null
}

const webAppState: IWebAppState = {
    views: [],
    currentView: null,
    currentModalType: null
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
        // Called by the AddRecordModal when changes are submitted
        addRecord: (state, action: {payload: Record, type: string}) => {
            // TODO

            // Make the API call to add the record

            // On successful response, update the current table to the new table
            // state.currentView = res.data
        },
        // Called by the DeleteRecordModal when changes are submitted
        deleteRecord: (state, action: {payload: Record, type: string}) => {
            // TODO

            // Make the API call to delete the record
            
            // On successful response, update the current table to the new table
            // state.currentView = res.data
        },
        // Called by the EditRecordModal when changes are submitted
        editRecord: (state, action: {payload: {oldRecord: Record, newRecord: Record}, type: string}) => {
            // TODO

            // Make the API call to edit the record
            
            // On successful response, update the current table to the new table
            // state.currentView = res.data
        },
        // Displays the AddRecord Modal
        showAddRecordModal: state => {
            state.currentModalType = ModalType.AddRecordModal;
        },
        // Displays the EditRecord Modal
        showEditRecordModal: state => {
            state.currentModalType = ModalType.EditRecordModal;
        },
        // Displays the DeleteRecord Modal
        showDeleteRecordModal: state => {
            state.currentModalType = ModalType.DeleteRecordModal;
        },
        // Hides the current Modal
        hideWebAppModal: state => {
            state.currentModalType = null
        }
    }
})

// TODO: EXPORT ALL OF THE REDUCER ACTIONS SO THEY ARE ACCESSIBLE IN DISPATCH CALLS
export const { viewDevApps, viewAccApps, createApp, deleteApp, showCreateAppModal, showEditAppCreateDatasourcesModal, showEditAppEditDatasourcesModal, hideS2aModal,
createDatasource, setCurrentDatasource, editDatasource, setCurrentColumn} = s2aReducer.actions
export const { showAddRecordModal, showEditRecordModal, showDeleteRecordModal, hideWebAppModal } = webAppReducer.actions;

// Interface for pulling the reducer state. Prevents TypeScript type errors
export interface StoreState {
    s2aReducer: IS2AState, 
    webAppReducer: IWebAppState
}

const store = configureStore({
    reducer: {
        s2aReducer: s2aReducer.reducer,
        webAppReducer: webAppReducer.reducer
    }
})  

export default store