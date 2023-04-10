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

export interface View {
    id: number;
	name: string;

    canView: boolean;
	
	datasource: Datasource;
	
	roles: Role[];
}

export interface Tableview extends View {
    canAdd: boolean;
    canDelete: boolean;
}

export interface Detailview extends View {
    canEdit: boolean;
}

export interface Role {
	name: string;
}

export enum ModalType {
	/* S2A */
    CreateAppModal,
    DeleteAppModal,
    CreateDatasourceModal,
    CreateTableviewModal,
    CreateDetailviewModal,

	/* User App */
    AddRecordModal,
    EditRecordModal,
    DeleteRecordModal
}




