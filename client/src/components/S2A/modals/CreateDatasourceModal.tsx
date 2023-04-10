import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewDatasources, createDatasource, finishCreation, StoreState} from '../../../store/StoreContext';
import { ModalType } from '../../../store/StoreTypes';

import styles from '../../../styles/S2A/ModalStyles';
import { Button, Modal, TextField } from '@mui/material';


function CreateDatasourceModal() {
    const dispatch = useDispatch();

    /* Redux hooks into store. */
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* React hooks into elements. */
    const datasourceNameRef = useRef<HTMLDivElement>(null);
    const spreadsheetURLRef = useRef<HTMLDivElement>(null);
    const sheetNameRef = useRef<HTMLDivElement>(null);

    /* Event handlers. */

    /* If the user clicks on space outside of the modal or confirms/cancels creation.*/
    const handleCloseModal = () => {
        dispatch(finishCreation());
    }

    /* If the user confirms creation. */
    const handleCreate = () => {
        let input = datasourceNameRef?.current?.querySelector("input");
        const datasourceName = input ? input.value : "";

        input = spreadsheetURLRef?.current?.querySelector("input");
        const spreadsheetURL = input ? input.value : "";

        input = sheetNameRef?.current?.querySelector("input");
        const sheetName = input ? input.value : "";

        if(datasourceName && spreadsheetURL && sheetName ) {
            dispatch(createDatasource({"datasourceName": datasourceName, "spreadsheetUrl": spreadsheetURL, "sheetName": sheetName}));
            dispatch(viewDatasources());
            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.CreateDatasourceModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>

                {/* Datasource Name/Spreadsheet URL/Sheet Name TextFields */}
                <TextField ref={datasourceNameRef} variant="filled" label="Datasource Name"/>
                <TextField ref={spreadsheetURLRef} variant="filled" label="Spreadsheet URL"/>
                <TextField ref={sheetNameRef} variant="filled" label="Sheet Name"/>

                {/* Confirm/Cancel Buttons */}
                <Button onClick={handleCreate} variant="outlined" size="large" sx={styles.modalButton}>Create</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
         </Modal>
    );
}

export default CreateDatasourceModal;