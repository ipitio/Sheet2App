import Cookies from "js-cookie";
import { refreshAccess } from "../auth/AuthController";
import { App, Column, ColumnType, Datasource, Record, Role, View } from "./StoreTypes";

//
// Application-related functions.
//

/**
 * Requests an array of all apps that the user has permission to develop. 
 * @return {Promise<App[]>} - A promise that resolves to the array of apps on success, rejects on failure.
 */
async function getDevelopableApps(): Promise<App[]> {
    await refreshAccess();

    /* Fetch information from cookies. */
    const email = Cookies.get("email");
    const accessToken = Cookies.get("accessToken");

    if(!email || !accessToken)
        return Promise.reject("Missing email or access token.")

    /* Specify user email in request body. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({"email": email})
    }
    
    /* Send request and return promise resolving to array of developable apps. */
    try {
        const res = await fetch("http://localhost:8000/getDevelopableApps", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed");
            
        const data = await res.json();
        const dApps: App[] = data.apps;
        return dApps;
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Requests an array of all apps that the user has permission to access.
 * @return {Promise<App[]>} - A promise that resolves to the array of apps on success, rejects on failure.
 */
async function getUsableApps(): Promise<App[]> {
    await refreshAccess();

    /* Fetch information from cookies. */
    const email = Cookies.get("email");
    const accessToken = Cookies.get("accessToken");

    if(!email || !accessToken)
        return Promise.reject("Missing email or access token.")

    /* Specify user email in request body. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({"email": email})
    }

    /* Send request and return promise resolving to array of useable apps. */
    try {
        const res = await fetch("https://localhost:8000/getUsableApps", reqForm);
        if(!res.ok) 
            return Promise.reject("Request failed.");
        
        const data = await res.json();
        const uApps: App[] = data.apps;
        return uApps;
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Requests to create a new app where the user is the creator.
 * @param {string} appName - The name of the application.
 * @param {string} roleMemUrl - The URL to the spreadsheet that contains the roles for users within the app.
 * @param {Datasource[]} datasources - An array of data sources the app is backed by.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function createApp(appName: string, roleMemUrl: string, datasources: Datasource[]): Promise<void> {
    /* Fetch information from cookies. */
    const email = Cookies.get("email");
    if(!email)
        return Promise.reject("Missing email.")

    /* Specify app metadata in request body. */
    const reqForm: RequestInit= {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({"email": email, "name": appName, "roleMemUrl": roleMemUrl, "datasources": datasources})
    }

    /* Send request and return promise resolving if creation successful. */
    try {
        const res = await fetch("https://localhost:8000/createApp", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Requests to change the name of an existing application. 
 * @param {number} appID - The id of the application.
 * @param {string} appName - The name of the application.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editAppName(appID: number, appName: string): Promise<void> { 
    /* Specify new app name in request body. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({"appID": appID, "appName": appName})
    }

    /* Send request and return promise resolving if app name change successful. */
    try {
        const res = await fetch("https://localhost:8000/editAppName", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Requests to create a new app where the user is the creator.
 * @param {number} appID - The id of the application.
 * @param {string} roleMemUrl - The URL to the spreadsheet that contains the roles for users within the app.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editAppRoleMemUrl(appID: number, roleMemUrl: string): Promise<void> {
    /* Specify new app roleMemUrl in request body. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({"appID": appID, "roleMemUrl": roleMemUrl})
    }

    /* Send request and return promise resolving if app roleMemUrl change successful. */
    try {
        const res = await fetch("https://localhost:8000/editAppRoleMemUrl", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Requests to publish an application. 
 * @param {number} appID - The id of the application.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function publishApp(appID: number): Promise<void> {
    /* Specify which app to publish in request body. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({"appID": appID})
    }

    /* Send request and return promise resolving if publishing successful. */
    try {
        const res = await fetch("https://localhost:8000/publishApp", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Requests to delete an application. 
 * @param {number} appID - The id of the application.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function deleteApp(appID: number): Promise<void> {
    /* Specify which app to delete in request body. */
    const reqForm: RequestInit = {
        method: "DELETE",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({"appID": appID})
    }

    /* Send request and return promise resolving if publishing successful. */
    try {
        const res = await fetch("https://localhost:8000/deleteApp", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Requests an array of all data sources for a particular app.
 * @param {number} appID - The id of the application.
 * @return {Promise<void>} - A promise that resolves the array of data sources on success, rejects on failure.
 */
async function getAppDataSources(appID: number): Promise<Datasource[]> {
    /* Specify which app's data sources to get. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({"appID": appID})
    }

    try {
        const res = await fetch("https://localhost:8000/getAppDataSources", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        const data = await res.json();
        const uApps: Datasource[] = data.apps;
        return uApps;
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Creates a datasource for the application
 * @param appID The web app to associate this datasource with
 * @param spreadsheetID The ID of the spreadsheet in Google Sheets
 * @param sheetIdx The index of the sheet in Google Sheets
 * @param datasourceName The name of the datasource for reference within S2A
 * @returns the newly created Datasource, if the request is valid
 */
async function createDatasource(appID: number, spreadsheetID: string, sheetIdx: number, datasourceName: string): Promise<void> {
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "appID": appID,
            "spreadsheetID": spreadsheetID,
            "sheetIdx": sheetIdx,
            "datasourceName": datasourceName
        })
    }

    try {
        const res = await fetch("https://localhost:8000/createDatasource", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Edits a Datasource for a web application. Allows changes to the spreadsheet ID, sheet index, or name.
 * @param datasourceKey The primary key of the datasource within the SQL database
 * @param spreadsheetID The NEW spreadsheetID of the Datasource
 * @param sheetIdx The NEW sheetIdx of the Datasource
 * @param datasourceName The NEW datasourceName of the Datasource
 * @returns 
 */
async function editDatasource(datasourceKey: number, spreadsheetID: string, sheetIdx: number, datasourceName: string, columns: Column[]): Promise<void> {
    const reqForm: RequestInit = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "datasourceKey": datasourceKey,
            "spreadsheetID": spreadsheetID,
            "sheetIdx": sheetIdx,
            "datasourceName": datasourceName,
            "columns": columns
        })
    }

    try {
        const res = await fetch("https://localhost:8000/editDatasource", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Edits the attributes of a single column within a specified datasource
 * @param datasourceKey The primary key of the datasource that contains the column to be edited
 * @param columnKey The primary key of the column in the SQL database
 * @param column The NEW column to update the columnKey values to
 */
async function editColumn(datasourceKey: number, columnKey: number, column: Column): Promise<void> {
    const reqForm: RequestInit = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "datasourceKey": datasourceKey,
            "columnKey": columnKey,
            "column": column
        })
    }

    try {
        const res = await fetch("https://localhost:8000/editColumn", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Deletes a Datasource from the SQL database
 * @param datasourceKey The primary key of the Datasource to delete
 */
async function deleteDatasource(datasourceKey: number): Promise<void> {
    const reqForm: RequestInit = {
        method: "DELETE",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "datasourceKey": datasourceKey
        })
    }

    try {
        const res = await fetch("https://localhost:8000/deleteDatasource", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Retrieves all views associated with the App. The returned view will have the available permissions associated with the users role. 
 * @param appID The application to retrieve the views for
 * @param role The Role of the end user requesting the views. Used for permissions
 */
async function getViewsByAppID(appID: number, role: Role) {
    const reqForm: RequestInit = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "appID": appID,
            "role": role
        })
    }

    try {
        const res = await fetch("https://localhost:8000/getViewsByAppID", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        const data = await res.json();

        return data.views;
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Adds a record to a View. By default, this will append the new record to the last row of the spreadsheet.
 * @param view The View to add the record to
 * @param recordToAdd The new record to add to the view
 */
async function addRecord(viewID: number, recordToAdd: Record) {
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "viewID": viewID,
            "recordToAdd": recordToAdd
        })
    }

    try {
        const res = await fetch("https://localhost:8000/addRecord", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        /**
         * Expects a response containing the new view with the record added to it.
         */
        const data = await res.json();

        return data.view;
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Edits a record in the Google Sheets database
 * @param viewID The ID of the View to add the record to
 * @param recordID The ID of the record to edit
 * @param editedRecord The new record values 
 * @returns The updated View with the edited record
 */
async function editRecord(viewID: number, recordID: number, editedRecord: Record) {
    const reqForm: RequestInit = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "viewID": viewID,
            "recordID": recordID,
            "editedRecord": editedRecord
        })
    }

    try {
        const res = await fetch("https://localhost:8000/editRecord", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        /**
         * Expects a response containing the new view with the record added to it.
         */
        const data = await res.json();

        return data.view;
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Deletes a record associated with a View
 * @param viewID The View associated with the record
 * @param recordID The ID of the record to delete
 * @returns Returns the new View with the record deleted from it, if the request is successful
 */
async function deleteRecord(viewID: number, recordID: number) {
    const reqForm: RequestInit = {
        method: "DELETE",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "viewID": viewID,
            "recordID": recordID
        })
    }

    try {
        const res = await fetch("https://localhost:8000/deleteRecord", reqForm);
        if(!res.ok)
            return Promise.reject("Request failed.");
        
        /**
         * Expects a response containing the new view with the record added to it.
         */
        const data = await res.json();

        return data.view;
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export default {getDevelopableApps, getUsableApps, createApp, editAppName, editAppRoleMemUrl, publishApp, deleteApp, getAppDataSources, createDatasource, editDatasource, editColumn, deleteDatasource, getViewsByAppID, addRecord, editRecord, deleteRecord};
