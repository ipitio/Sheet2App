import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewDatasources, editDatasource, finishEdit, StoreState } from '../../../../store/StoreContext';
import { Datasource, ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Modal, TextField } from '@mui/material';


function EditDatasourceModal() {
    const dispatch = useDispatch();

    /* Redux hooks into store. */
    const currentDatasourceToEdit = useSelector((state: StoreState) => state.S2AReducer.currentDatasourceToEdit);
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* React state for datasource changes. */
    const [changedDatasource, setDatasource] = useState<Datasource>({
        id: currentDatasourceToEdit?.id ?? 0,
        name: currentDatasourceToEdit?.name ?? "",
        spreadsheetUrl: currentDatasourceToEdit?.spreadsheetUrl ?? "",
        sheetName: currentDatasourceToEdit?.sheetName ?? ""
      });
    
    /* Update state each time modal loads. */
    useEffect(() => {
        setDatasource({
            id: currentDatasourceToEdit?.id ?? 0,
            name: currentDatasourceToEdit?.name ?? "",
            spreadsheetUrl: currentDatasourceToEdit?.spreadsheetUrl ?? "",
            sheetName: currentDatasourceToEdit?.sheetName ?? ""
        });
    }, [currentDatasourceToEdit]);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels edit. */
    const handleCloseModal = () => {
        dispatch(finishEdit());
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatasource({ ...changedDatasource, name: event.target.value });
    };

    const handleSpreadsheetUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatasource({ ...changedDatasource, spreadsheetUrl: event.target.value });
    };

    const handleSheetNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDatasource({ ...changedDatasource, sheetName: event.target.value });
    };

    /* If the user confirms edit. */
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(currentDatasourceToEdit) {
            dispatch(editDatasource(changedDatasource));
            dispatch(viewDatasources());
            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.EditDatasourceModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>
                 Editing {currentDatasourceToEdit?.name} App:

                {/* Datasource Name, Spreadsheet Url, Sheet Name Textfields */}
                <TextField onChange={handleNameChange} variant="filled" label="Datasource Name" value={changedDatasource.name} sx={styles.modalTextfield}/>
                <TextField onChange={handleSpreadsheetUrlChange} variant="filled" label="Spreadsheet URL" value={changedDatasource.spreadsheetUrl} sx={styles.modalTextfield}/>
                <TextField onChange={handleSheetNameChange} variant="filled" label="Sheet Name" value={changedDatasource.sheetName} sx={styles.modalTextfield}/>

                {/* Finish/Cancel Buttons */}
                <Button onClick={handleEdit} variant="outlined" size="large" sx={styles.modalButton}>Finish</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
        </Modal>
    );
}

export default EditDatasourceModal;