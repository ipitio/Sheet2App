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
    name: string,
    spreadsheetURL: string
}

export enum Modal {
    AddRecordModal,
    EditRecordModal,
    DeleteRecordModal
}