import { configureStore, createSlice } from '@reduxjs/toolkit'

import { Datasource, App, View, Role, Modal } from './StoreTypes'

interface IS2AState {
    // A list of data sources that have been retrieved from the database for the current user's app
    datasources: Datasource[],

    // A list of all apps owned by the user
    apps: App[],

    // The current application that the user is editing. Since the owner can only edit one application at a time on a web page, all changes requested
    // affect currentApp itself
    currentApp: App | null,

    // The current view that is being edited
    currentView: View | null,

    // The current role that is being edited
    currentRole: Role | null
}

const s2aState: IS2AState = {
    datasources: [],
    apps: [],
    currentApp: null,
    currentView: null,
    currentRole: null
}

const s2aReducer = createSlice({
    name: 's2aReducer',
    initialState: s2aState,
    reducers: {
        createApplication: state => {
            // TODO
        },
        renameApplication: state => {
            // TODO
        },
        addDataSource: state => {
            // TODO
        },
        deleteDatasource: state => {
            // TODO
        },
        editDatasource: state => {
            // TODO
        },
        publishApp: state => {
            // TODO
        },
        viewDatasources: state => {
            // TODO
        },
        viewApps: state => {
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
        }
    }
})

interface IWebAppState {
    // An array of Views that have been previously loaded by the user
    views: View[],

    // The current view denotes the view that changes (add, edit, delete record) will apply to, since the user can only be on
    // one view at a time.
    currentView: View | null,
    
    // The current modal that is open on the screen (Add record modal, edit record modal, delete record modal)
    currentModal: Modal | null
}

const webAppState: IWebAppState = {
    views: [],
    currentView: null,
    currentModal: null
}

const webAppReducer = createSlice({
    name: 'webAppReducer',
    initialState: webAppState,
    reducers: {
        // Loads a view and sets it as the current (visible) view
        loadView: (state, action: {payload: View, type: string}) => {
            state.currentView = action.payload;
        },
        // Called by the AddRecordModal when changes are submitted
        addRecord: state => {
            // TODO
        },
        // Called by the DeleteRecordModal when changes are submitted
        deleteRecord: state => {
            // TODO
        },
        // Called by the EditRecordModal when changes are submitted
        editRecord: state => {
            // TODO
        },
        // Displays the AddRecord Modal
        showAddRecordModal: state => {
            // TODO
        },
        // Displays the EditRecord Modal
        showEditRecordModal: state => {
            // TODO
        },
        // Displays the DeleteRecord Modal
        showDeleteRecordModal: state => {
            // TODO
        }
    }
})

// TODO: EXPORT ALL OF THE REDUCER ACTIONS SO THEY ARE ACCESSIBLE IN DISPATCH CALLS
// export const { createApplication, renameApplication } = s2aReducer.actions

const store = configureStore({
    reducer: {
        s2aReducer: s2aReducer.reducer,
        webAppReducer: webAppReducer.reducer
    }
})  

export default store