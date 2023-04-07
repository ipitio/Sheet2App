export interface App {
	id: number;
	name: string;
    creatorEmail: string;
	roleMemUrl: string;
	isPublished: boolean;
}

export interface Datasource {
	id: number;
	name: string;
	spreadsheetUrl: string;
	sheetName: string;
}

export interface Column {
	id: number;
	name: string;
	initialValue: string;
	isLabel: boolean;
	isRef: boolean;
	type: string;
	
	isFilter: boolean;
	isUserFilter: boolean;  
	isEditFilter: boolean;

    viewable: boolean | null;
    editable: boolean | null;
}

export interface Record {
	id: number;
	index: number;
	data: any[];
}

export interface Tableview {
	id: number;
	name: string;

    canView: boolean;
    canAdd: boolean;
    canDelete: boolean;
	
	datasource: Datasource;
	
	roles: Role[];
}

export interface DetailView {
    id: number;
	name: string;

    canView: boolean;
    canEdit: boolean;
	
	datasource: Datasource;
	
	roles: Role[];
}

export interface Role {
	name: string;
}

export enum ModalType {
    CreateAppModal,
    DeleteAppModal,
    CreateDatasourceModal,
    CreateTableviewModal,
    CreateDetailviewModal,
    AddRecordModal,
    EditRecordModal,
    DeleteRecordModal
}




