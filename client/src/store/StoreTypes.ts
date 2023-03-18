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

    // The table this View is from
    dataSource: DataSource

    // An array of columns that will actually be used in the Table view.
    columns: string[],
}

export interface Record {
    // The table this record is in
    dataSource: DataSource

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