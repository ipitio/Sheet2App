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