export interface App {
    id: number;
    name: string;
    roleMemUrl: string;
    isPublished: boolean;
}

export interface Datasource {
    id: number;
    spreadsheetID: string;
    sheetID: number;
    name: string;
    columns: Column[];
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

    // The ID of the View for CRUD requests
    id: number
}

export interface Record {
    // The index of the record
    index: number,

    // The data of this record
    data: any[],

    // The ID of the Record for CRUD requests
    id: number
}

export interface Column {
    // The name of the column 
    name: string,

    // The initial value of the column when a new record is created
    initialValue: any,

    // A boolean indicating whether this column in the spreadsheet is a label
    label: boolean,

    // A boolean indicating whether this column is a reference to another table or spreadsheet
    reference: boolean,

    // The data types supported within this column
    type: ColumnType | string,

    // The ID of the column for CRUD requests
    id: number,

    include: boolean,
    isFilter: boolean,
    isUserFilter: boolean,
    isEditFilter:boolean
}

export enum ColumnType {
    Boolean,
    Number,
    Text,
    URL
}

export enum ModalType {
    CreateAppModal,
    DeleteAppModal,
    EditAppCreateDatasourcesModal,
    EditAppEditDatasourcesModal,
    EditAppTableViewModal,
    AddRecordModal,
    EditRecordModal,
    DeleteRecordModal
}