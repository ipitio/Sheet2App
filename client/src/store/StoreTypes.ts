export interface App {
    id: number;
    name: string;
    roleMemURL: string;
    isPublished: boolean;
}

export interface DataSource {
    spreadsheetID: number;
    spreadsheetIdx: number;
}

export interface Role {
    roleName: string,
    accessibleViews: View[]
}

export interface View {
    // The name of the View
    name: string

    // The URL of the spreadsheet to request info from
    spreadsheetURL: string,

    // The index of the necessary sheet within the spreadsheet
    sheetIndex: number,

    // An array of columns that will actually be used in the Table view.
    columns: string[],
}

export enum Modal {
    AddRecordModal,
    EditRecordModal,
    DeleteRecordModal
}