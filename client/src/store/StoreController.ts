import Cookies from "js-cookie";
import { refreshAccess } from "../auth/AuthController";
import { App, Datasource, Column, Record, Tableview, Detailview, Role } from './StoreTypes'
import { Dictionary } from "@reduxjs/toolkit";

/* Define constants for constructing a URL to reach Django server. */
const DJANGO_HOST = process.env.DJANGO_HOST;
const DJANGO_PORT = process.env.DJANGO_PORT;
const DJANGO_PROTOCOL = process.env.DJANGO_PROTOCOL;
const DJANGO_URL = `${DJANGO_PROTOCOL}://${DJANGO_HOST}:${DJANGO_PORT}`;

/*
    Helper functions for requests.
*/

/**
 * Constructs a request form used in all the defined REST API requests. 
 * @param method - POST/PUT/DELETE  (generally not using GET).
 * @param data - Additional payload, if any, to include with the request.
 * @return {Promise<RequestInit>} - A promise that resolves to the request form on success, rejects on failure.
 */
async function getRequestForm(method: string, data: {[key: string]: any}): Promise<RequestInit> {
    try {
        /* Get a fresh access token if expired. */
        await refreshAccess();

        /* Fetch information from cookies. */
        const [email, accessToken] = [Cookies.get("email"), Cookies.get("accessToken")];
        if(!email || !accessToken)
            return Promise.reject("Missing email or access token.")

        /* Build the request body. */
        const bodyData = {...data, email};

        /* Specify access token in authorization header and email in request body. */
        const reqForm: RequestInit = {
            method: method,
            mode: "cors",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(bodyData)
        }
        return reqForm;
    }
    catch(err) {
        return Promise.reject(`getRequestForm failed with the error: ${err}`)
    }
}

/*
    Functions for API requests.
*/

/**
 * Requests an array of all apps that the user has permission to develop. 
 * @return {Promise<App[]>} - A promise that resolves to the array of apps on success, rejects on failure.
 */
async function getDevelopableApps(): Promise<App[]> {
    try {
        /* Build request form. */
        const reqForm = await getRequestForm("POST", {});

        /* Send request and return promise resolving to array of developable apps if successful. */
        const res = await fetch(`${DJANGO_URL}/getDevelopableApps`, reqForm);
        if(!res.ok)
            return Promise.reject(`getDevelopableApps request failed with status: ${res.status}`);
            
        const data = await res.json();
        const apps: App[] = data.apps;
        return apps;
    }
    catch(err) {
        return Promise.reject(`getDevelopableApps failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all apps that the user has permission to access.
 * @return {Promise<App[]>} - A promise that resolves to the array of apps on success, rejects on failure.
 */
async function getAccessibleApps(): Promise<App[]> {
    try {
        const reqForm = await getRequestForm("POST", {});

        /* Send request and return promise resolving to array of accessible apps if successful. */
        const res = await fetch(`${DJANGO_URL}/getAccessibleApps`, reqForm);
        if(!res.ok) 
            return Promise.reject(`getAccessibleApps request failed with status: ${res.status}`);
        
        const data = await res.json();
        const apps: App[] = data.apps;
        return apps;
    }
    catch(err) {
        return Promise.reject(`getAccessibleApps failed with the error: ${err}`);
    }
}

/**
 * Requests to create a new app where the user is the creator.
 * @param {string} appName - The name of the application.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function createApp(appName: string): Promise<void> {
    try {
        const reqForm = await getRequestForm("POST", {"appName": appName});

        /* Send request and return promise resolving if creation successful. */
        const res = await fetch(`${DJANGO_URL}/createApp`, reqForm);
        if(!res.ok)
            return Promise.reject(`createApp request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`createApp failed with the error: ${err}`);
    }
}

/**
 * Requests to delete an application. 
 * @param {App} app - The application to delete.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function deleteApp(app: App): Promise<void> {
    try {
        const reqForm = await getRequestForm("DELETE", {"app": app});

        /* Send request and return promise resolving if deletion successful. */
        const res = await fetch(`${DJANGO_URL}/deleteApp`, reqForm);
        if(!res.ok)
            return Promise.reject(`deleteApp request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`deleteApp failed with the error: ${err}`);
    }
}

/**
 * Requests to edit an application. 
 * @param {App} app - The application to edit, with the updated information.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editApp(app: App): Promise <void> {  
    try {
        const reqForm = await getRequestForm("PUT", {"app": app});

        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editApp`, reqForm);
        if(!res.ok)
            return Promise.reject(`editApp request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editApp failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all datasources for a particular app.
 * @param {App} app - The application to get the datasources of.
 * @return {Promise<void>} - A promise that resolves to the array of datasources on success, rejects on failure.
 */
async function getAppDatasources(app: App): Promise<Datasource[]> {
    try {
        const reqForm = await getRequestForm("POST", {"app": app});

        /* Send request and return promise resolving to array of datasources if successful. */
        const res = await fetch(`${DJANGO_URL}/getAppDatasources`, reqForm);
        if(!res.ok)
            return Promise.reject(`getAppDatasources request failed with status: ${res.status}`);
        
        const data = await res.json();
        const datasources: Datasource[] = data.datasources;
        return datasources;
    }
    catch(err) {
        return Promise.reject(`getAppDatasources failed with the error: ${err}`);
    }
}

/**
 * Requests to create a datasource for a particular app.
 * @param {App} app - The application to create the datasource for.
 * @param {string} datasourceName - The name the datasource will have.
 * @param {string} spreadsheetUrl - The URL of the spreadsheet the datasource will be backed by.
 * @param {string} sheetName - The name of the sheet within the spreadsheet the datasource will be associated with.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure. 
 */
async function createDatasource(app: App, datasourceName: string, spreadsheetUrl: string, sheetName: string): Promise<void> {
    try {
        const reqForm = await getRequestForm("POST", {"app": app, "datasourceName": datasourceName, "spreadsheetUrl": spreadsheetUrl, "sheetName": sheetName});

        /* Send request and return promise resolving if creation successful. */
        const res = await fetch(`${DJANGO_URL}/createDatasource`, reqForm);
        if(!res.ok)
            return Promise.reject(`createDatasource request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`createDatasource failed with the error: ${err}`);
    }
}

/**
 * Requests to edit a datasource.
 * @param {Datasource} datasource - The datasource to edit, with the updated information.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editDatasource(datasource: Datasource): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"datasource": datasource});
        
        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editDatasource`, reqForm); 
        if(!res.ok)
            return Promise.reject(`editDatasource request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editDatasource failed with the error: ${err}`);
    }
}

/**
 * Requests to delete a datasource.
 * @param {Datasource} datasource - The datasource to delete.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function deleteDatasource(datasource: Datasource): Promise<void> {
    try {
        const reqForm = await getRequestForm("DELETE", {"datasource": datasource});
        
        /* Send request and return promise resolving if deletion successful. */
        const res = await fetch(`${DJANGO_URL}/deleteDatasource`, reqForm);
        if(!res.ok)
            return Promise.reject(`deleteDatasource request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`deleteDatasource failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all datasource columns for a particular datasource. 
 * @param {Datasource} datasource - The datasource to obtain the columns of. 
 * @return {Promise<Column[]>} - A promise that resolves to the array of datasource columns on success, rejects on failure.
 */
async function getDatasourceColumns(datasource: Datasource): Promise<Column[]> {
    try {
        const reqForm = await getRequestForm("POST", {"datasource": datasource});
        
        /* Send request and return promise resolving to an array of datasource columns if successful. */
        const res = await fetch(`${DJANGO_URL}/getDatasourceColumns`, reqForm);
        if(!res.ok)
            return Promise.reject(`getDatasourceColumns request failed with status: ${res.status}`);
        
        const data = await res.json();
        const datasourceColumns: Column[] = data.datasourceColumns;
        return datasourceColumns;
    }
    catch(err) {
        return Promise.reject(`getDatasourceColumns failed with the error: ${err}`);
    }
}

/**
 * Requests to edit datasource columns.
 * @param {Datasource} datasource - The datasource whose columns to edit.
 * @param {Column[]} datasourceColumns - The datasource columns to edit, with the updated information.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editDatasourceColumns(datasource: Datasource, datasourceColumns: Column[]): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"datasource": datasource, "datasourceColumns": datasourceColumns});
        
        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editDatasourceColumns`, reqForm);
        if(!res.ok)
            return Promise.reject(`editDatasourceColumns request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editDatasourceColumns failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all tableviews for a particular app.
 * @param {App} app - The application to get the tableviews of.
 * @return {Promise<Tableview[]>} - A promise that resolves to the array of tableviews on success, rejects on failure.
 */
async function getAppTableviews(app: App): Promise<Tableview[]> {
    try {
        const reqForm = await getRequestForm("POST", {"app": app});
        
        /* Send request and return promise resolving to the array of tableviews if successful. */
        const res = await fetch(`${DJANGO_URL}/getAppTableviews`, reqForm);
        if(!res.ok)
            return Promise.reject(`getAppTableviews request failed with status: ${res.status}`);
        
        const data = await res.json();
        const tableviews: Tableview[] = data.tableviews;
        return tableviews;
    }
    catch(err) {
        return Promise.reject(`getAppTableviews failed with the error: ${err}`);
    }
}

/**
 * Requests to create a tableview for a particular app with a particular datasource.
 * @param {App} app - The application to create the tableview for.
 * @param {string} tableviewName - The name the tableview will have.
 * @param {Datasource} datasource - The datasource the tableview will be created with.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function createTableview(app: App, tableviewName: string, datasource: Datasource): Promise<void> {
    try {
        const reqForm = await getRequestForm("POST", {"app": app, "tableviewName": tableviewName, "datasource": datasource});

        /* Send request and return promise resolving if creation successful. */
        const res = await fetch(`${DJANGO_URL}/createTableview`, reqForm);
        if(!res.ok)
            return Promise.reject(`createTableview request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`createTableview failed with the error: ${err}`);
    }
}

/**
 * Requests to edit a tableview.
 * @param {Tableview} tableview - The tableview to edit, with the updated information.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editTableview(tableview: Tableview): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"tableview": tableview});

        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editTableview`, reqForm);
        if(!res.ok)
            return Promise.reject(`editTableview request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editTableview failed with the error: ${err}`);
    }
}

/**
 * Requests to delete a tableview.
 * @param {Tableview} tableview - The tableview to delete.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function deleteTableview(tableview: Tableview): Promise<void> {
    try {
        const reqForm = await getRequestForm("DELETE", {"tableview": tableview});

        /* Send request and return promise resolving if deletion successful. */
        const res = await fetch(`${DJANGO_URL}/deleteTableview`, reqForm);
        if(!res.ok)
            return Promise.reject(`deleteTableview request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`deleteTableview failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all tableview columns for a particular tableview.
 * @param {Tableview} tableview - The tableview to obtain the columns of.
 * @return {[Promise<Column[]>, boolean[] | null, string[] | null]} - A promise that resolves to the array of tableview columns and filter columns on success, rejects on failure.
 */
async function getTableviewColumns(tableview: Tableview): Promise<[Column[], boolean[] | null, string[] | null]> {
    try {
        const reqForm = await getRequestForm("POST", {"tableview": tableview});
        
        /* Send request and return promise resolving to an array of tableview columns if successful. */
        const res = await fetch(`${DJANGO_URL}/getTableviewColumns`, reqForm);
        if(!res.ok)
            return Promise.reject(`getTableviewColumns request failed with status: ${res.status}`);
        
        const data = await res.json();
        const tableviewColumns: Column[] = data.tableviewColumns;
        const filterColumn: boolean[] | null = data.filterColumn;
        const userFilterColumn: string[] | null = data.userFilterColumn;
        
        return [tableviewColumns, filterColumn, userFilterColumn];
    }
    catch(err) {
        return Promise.reject(`getTableviewColumns failed with the error: ${err}`);
    }
}


/**
 * Requests to edit tableview columns.
 * @param {Tableview} tableview - The tableview whose columns to edit.
 * @param {Column[]} tableviewColumns - The tableview columns to edit, with the updated information.
 * @param {boolean[] | null} filterColumn - The array of boolean values corresponding to each record indicating if the record should be shown in the view. If null, no filter.
 * @param {string[] | null} userFilterColumn- The array of string values corresponding to each record indicating if the view should show this user the record. If null, no filter.
 * @return {Promise <void>} - A promise that resolves on success, rejects on failure.
 */
async function editTableviewColumns(tableview: Tableview, tableviewColumns: Column[], filterColumn: boolean[] | null, userFilterColumn: string[] | null): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"tableview": tableview, "tableviewColumns": tableviewColumns, "filterColumn": filterColumn, "userFilterColumn": userFilterColumn});
        
        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editTableviewColumns`, reqForm);
        if(!res.ok)
            return Promise.reject(`editTableviewColumns request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editTableviewColumns failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all tableview roles for a particular tableview.
 * @param {Tableview} tableview - The tableview to obtain the roles of.
 * @return {Promise<Role[]>} - A promise that resolves to the array of tableview roles on success, rejects on failure.
 */
async function getTableviewRoles(tableview: Tableview): Promise<Role[]> {
    try {
        const reqForm = await getRequestForm("POST", {"tableview": tableview});
        
        /* Send request and return promise resolving to an array of tableview roles if successful. */
        const res = await fetch(`${DJANGO_URL}/getTableviewRoles`, reqForm);
        if(!res.ok)
            return Promise.reject(`getTableviewRoles request failed with status: ${res.status}`);
        
        const data = await res.json();
        const tableviewRoles: Role[] = data.tableviewRoles;
        return tableviewRoles;
    }
    catch(err) {
        return Promise.reject(`getTableviewRoles failed with the error: ${err}`);
    }
}

/**
 * Requests to edit tableview roles.
 * @param {Tableview} tableview - The tableview whose roles to edit.
 * @param {Role[]} tableviewRoles - The array of roles that should be given permission for the tableview.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editTableviewRoles(tableview: Tableview, tableviewRoles: Role[]): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"tableview": tableview, "tableviewRoles": tableviewRoles});
        
        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editTableviewRoles`, reqForm);
        if(!res.ok)
            return Promise.reject(`editTableviewRoles request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editTableviewRoles failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all detailviews for a particular app.
 * @param {App} app - The application to get the detailviews of.
 * @return {Promise<Detailview[]>} - A promise that resolves to the array of detailviews on success, rejects on failure.
 */
async function getAppDetailviews(app: App): Promise<Detailview[]> {
    try {
        const reqForm = await getRequestForm("POST", {"app": app});
        
        /* Send request and return promise resolving to the array of detailviews if successful. */
        const res = await fetch(`${DJANGO_URL}/getAppDetailviews`, reqForm);
        if(!res.ok)
            return Promise.reject(`getAppDetailviews equest failed with status: ${res.status}`);
        
        const data = await res.json();
        const detailviews: Detailview[] = data.detailviews;
        return detailviews;
    }
    catch(err) {
        return Promise.reject(`getAppDetailviews failed with the error: ${err}`);
    }
}

/**
 * Requests to create a detailview for a particular app with a particular datasource.
 * @param {App} app - The application to create the detailview for.
 * @param {string} detailviewName - The name the detailview will have.
 * @param {Datasource} datasource - The datasource the detailview will be created with.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function createDetailview(app: App, detailviewName: string, datasource: Datasource): Promise<void> {
    try {
        const reqForm = await getRequestForm("POST", {"app": app, "detailviewName": detailviewName, "datasource": datasource});

        /* Send request and return promise resolving if creation successful. */
        const res = await fetch(`${DJANGO_URL}/createDetailview`, reqForm);
        if(!res.ok)
            return Promise.reject(`createDetailview request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`createDetailview failed with the error: ${err}`);
    }
}

/**
 * Requests to edit a detailview.
 * @param {Detailview} detailview - The detailview to edit, with the updated information.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editDetailview(detailview: Detailview): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"detailview": detailview});

        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editDetailview`, reqForm);
        if(!res.ok)
            return Promise.reject(`editDetailview request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editDetailview failed with the error: ${err}`);
    }
}

/**
 * Requests to delete a detailview.
 * @param {Detailview} detailview- The detailview to delete.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function deleteDetailview(detailview: Detailview): Promise<void> {
    try {
        const reqForm = await getRequestForm("DELETE", {"detailview": detailview});

        /* Send request and return promise resolving if deletion successful. */
        const res = await fetch(`${DJANGO_URL}/deleteDetailview`, reqForm);
        if(!res.ok)
            return Promise.reject(`deleteDetailview request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`deleteDetailview failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all detailview columns for a particular detailview.
 * @param {Detailview} detailview - The detailview to obtain the columns of.
 * @return {Promise<Column[]> | null} - A promise that resolves to the array of detailview columns and filter column on success, rejects on failure.
 */
async function getDetailviewColumns(detailview: Detailview): Promise<[Column[], boolean[] | null]> {
    try {
        const reqForm = await getRequestForm("POST", {"detailview": detailview});
        
        /* Send request and return promise resolving to an array of detailview columns if successful. */
        const res = await fetch(`${DJANGO_URL}/getDetailviewColumns`, reqForm);
        if(!res.ok)
            return Promise.reject(`getDetailviewColumns request failed with status: ${res.status}`);
        
        const data = await res.json();
        const detailviewColumns: Column[]  = data.detailviewColumns;
        const editFilterColumn: boolean[] | null = data.editFilterColumn;
        
        return [detailviewColumns, editFilterColumn];
    }
    catch(err) {
        return Promise.reject(`getDetailviewColumns failed with the error: ${err}`);
    }
}

/**
 * Requests to edit detailview columns.
 * @param {Detailview} detailview- The detailview whose columns to edit.
 * @param {Column[]} detailviewColumns - The detailview columns to edit, with the updated information.
 * @param {boolean[] | null} editFilterColumn - THe array of boolean values corresponding to each record indicating if the view should allow this user to edit the record. If null, no filter.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editDetailviewColumns(detailview: Detailview, detailviewColumns: Column[], editFilterColumn: boolean[]): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"detailview": detailview, "detailviewColumns": detailviewColumns, "editFilterColumn": editFilterColumn});
        
        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editDetailviewColumns`, reqForm);
        if(!res.ok)
            return Promise.reject(`editDetailviewColumns request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editDetailviewColumns failed with the error: ${err}`);
    }
}

/**
 * Requests an array of all detailview roles for a particular detailview
 * @param {Detailview} detailview - The detailview to obtain the roles of.
 * @return {Promise<Role[]>} - A promise that resolves to the array of detailview roles on success, rejects on failure.
 */
async function getDetailviewRoles(detailview: Detailview): Promise<Role[]> {
    try {
        const reqForm = await getRequestForm("POST", {"detailview": detailview});
        
        /* Send request and return promise resolving to an array of detailview roles if successful. */
        const res = await fetch(`${DJANGO_URL}/getDetailviewRoles`, reqForm);
        if(!res.ok)
            return Promise.reject(`getDetailviewRoles request failed with status: ${res.status}`);
        
        const data = await res.json();
        const detailviewRoles: Role[] = data.detailviewRoles;
        return detailviewRoles;
    }
    catch(err) {
        return Promise.reject(`getDetailviewRoles failed with the error: ${err}`);
    }
}

/**
 * Requests to edit detailview roles.
 * @param {Detailview} detailview - The detailview whose roles to edit.
 * @param {Role[]} detailviewRoles - The array of roles that should be given permission for the detailview.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function editDetailviewRoles(detailview: Detailview, detailviewRoles: Role[]): Promise<void> {
    try {
        const reqForm = await getRequestForm("PUT", {"detailview": detailview, "detailviewRoles": detailviewRoles});
        
        /* Send request and return promise resolving if edit successful. */
        const res = await fetch(`${DJANGO_URL}/editDetailviewRoles`, reqForm);
        if(!res.ok)
            return Promise.reject(`editTableviewRoles request failed with status: ${res.status}`);
        
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(`editTableviewRoles failed with the error: ${err}`);
    }
}

// -> END for S2A.
// NOTE: Some naming logistics... to prevent duplicate method names, we use "load" for the web apps

/**
 * Requests an object containing all Tableviews and Detailviews associated with a web app
 * @param {App} app - The application to get the detailviews of.
 */
async function loadApp(app: App): Promise<Tableview[]> {
    try {
        const reqForm = await getRequestForm("GET", {"app": app});
        
        /* Send request and return promise resolving to the array of detailviews if successful. */
        const res = await fetch(`${DJANGO_URL}/loadApp`, reqForm);
        if(!res.ok)
            return Promise.reject(`loadApp request failed with status: ${res.status}`);
        
        const data = await res.json();
        const tableviews: Tableview[] = data.tableviews;

        return tableviews;
    }
    catch(err) {
        return Promise.reject(`getAppDetailviews failed with the error: ${err}`);
    }   
}

/**
 * Load a specific tableview in the web app
 * @returns a single detail view that the user has access to
 */
async function loadTableview(datasource: Datasource): Promise<Detailview> {
    try {
        const reqForm = await getRequestForm("GET", {"datasource": datasource});
        
        /* Send request and return promise resolving to the array of detailviews if successful. */
        const res = await fetch(`${DJANGO_URL}/loadTableview`, reqForm);
        if(!res.ok)
            return Promise.reject(`loadTableview request failed with status: ${res.status}`);
        
        const data = await res.json();
        const view = data.detailview;

        return view;
    }
    catch(err) {
        return Promise.reject(`loadTableView failed with the error: ${err}`);
    }
}

/**
 * Adds a record to the specified datasource
 * @returns the new data and columns after adding a record to the datasource
 */
async function addRecord(datasource: Datasource, record: Dictionary<string>): Promise<{columns: Column[], columnData: any[][]}> {
    try {
        const reqForm = await getRequestForm("POST", {"datasource": datasource, "record": record});
        
        /* Send request and return promise resolving to the array of detailviews if successful. */
        const res = await fetch(`${DJANGO_URL}/addRecord`, reqForm);
        if(!res.ok)
            return Promise.reject(`addRecord request failed with status: ${res.status}`);
        
        const data = await res.json();
        const columns: Column[] = data.columns;
        const columnData: any[][] = data.columnData;

        return {
            columns: columns,
            columnData: columnData
        };
    }
    catch(err) {
        return Promise.reject(`loadTableView failed with the error: ${err}`);
    }
}

/**
 * Adds a record to the specified datasource
 * @returns the new data and columns after adding a record to the datasource
 */
async function editRecord(datasource: Datasource, recordID: number, record: Dictionary<string>): Promise<{columns: Column[], columnData: any[][]}> {
    try {
        const reqForm = await getRequestForm("PUT", {"datasource": datasource, "recordID": recordID, "record": record});
        
        /* Send request and return promise resolving to the array of detailviews if successful. */
        const res = await fetch(`${DJANGO_URL}/editRecord`, reqForm);
        if(!res.ok)
            return Promise.reject(`editRecord request failed with status: ${res.status}`);
        
        const data = await res.json();
        const columns: Column[] = data.columns;
        const columnData: any[][] = data.columnData;

        return {
            columns: columns,
            columnData: columnData
        };
    }
    catch(err) {
        return Promise.reject(`loadTableView failed with the error: ${err}`);
    }
}

/**
 * Load a specific datasource in the web app
 * @returns the data and columns associated with the specified datasource
 */
async function deleteRecord(datasource: Datasource, recordID: number) {
    try {
        const reqForm = await getRequestForm("DELETE", {"datasource": datasource, "recordID": recordID});
        
        /* Send request and return promise resolving to the array of detailviews if successful. */
        const res = await fetch(`${DJANGO_URL}/deleteRecord`, reqForm);
        if(!res.ok)
            return Promise.reject(`deleteRecord request failed with status: ${res.status}`);
        
        const data = await res.json();
    }
    catch(err) {
        return Promise.reject(`loadTableView failed with the error: ${err}`);
    }
}

export default {getDevelopableApps, getAccessibleApps, createApp, deleteApp, editApp, 
                getAppDatasources, createDatasource, editDatasource, deleteDatasource,
                getDatasourceColumns, editDatasourceColumns, 
                getAppTableviews, createTableview, editTableview, deleteTableview, 
                getTableviewColumns, editTableviewColumns, 
                getTableviewRoles, editTableviewRoles,  
                getAppDetailviews, createDetailview, editDetailview, deleteDetailview, 
                getDetailviewColumns,editDetailviewColumns, 
                getDetailviewRoles, editDetailviewRoles, 
            
                loadApp, loadTableview, addRecord, editRecord, deleteRecord,
            };
