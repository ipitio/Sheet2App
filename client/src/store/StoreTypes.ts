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