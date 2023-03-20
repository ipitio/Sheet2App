export interface App {
    id: number;
    name: string;
    roleMemUrl: string;
    isPublished: boolean;
}

export interface Datasource {
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

    // The table this View is from
    dataSource: Datasource

    // An array of columns that are visible in the View
    columns: string[],
}

export interface Record {
    // The table this record is in
    dataSource: Datasource

    // The index of the record
    index: number,

    // The data of this record
    data: any[]
}

export enum Modal {
    AddRecordModal,
    EditRecordModal,
    DeleteRecordModal
}