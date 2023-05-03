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
	type: string;
	ref: Datasource | null;

	isKey: boolean;
	isLabel: boolean;
	isRef: boolean;
	
	isFilter: boolean;
	isUserFilter: boolean;  
	isEditFilter: boolean;

    viewable: boolean | null;
    editable: boolean | null;

	column_index: number | null;
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
	PublishAppModal,
	UnpublishAppModal,

    CreateDatasourceModal,
	EditDatasourceModal,
	DeleteDatasourceModal,

	EditDatasourceLabelColumnModal,

    CreateTableviewModal,
	EditTableviewModal,
	DeleteTableviewModal,
	
    CreateDetailviewModal,
	EditDetailviewModal,
	DeleteDetailviewModal,

	/* User App */
    AddRecordModal,
    EditRecordModal,
    DeleteRecordModal
}




