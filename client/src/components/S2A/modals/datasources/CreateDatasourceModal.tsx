import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { viewDatasources, createDatasource, finishCreation, StoreState} from '../../../../store/StoreContext';
import { ModalType } from '../../../../store/StoreTypes';

import styles from '../../../../styles/S2A/modals/ModalStyles';
import { Button, Modal, TextField } from '@mui/material';


function CreateDatasourceModal() {
    const dispatch = useDispatch();

    /* Redux hooks into store. */
    const currentModalType = useSelector((state: StoreState) => state.S2AReducer.currentModalType);

    /* React hooks into elements. */
    const datasourceNameRef = useRef<HTMLDivElement>(null);
    const spreadsheetUrlRef = useRef<HTMLDivElement>(null);
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

        input = spreadsheetUrlRef?.current?.querySelector("input");
        const spreadsheetUrl = input ? input.value : "";

        input = sheetNameRef?.current?.querySelector("input");
        const sheetName = input ? input.value : "";

        if(datasourceName && spreadsheetUrl && sheetName ) {
            dispatch(createDatasource({"datasourceName": datasourceName, "spreadsheetUrl": spreadsheetUrl, "sheetName": sheetName}));
            dispatch(viewDatasources());
            handleCloseModal();
        }
    }

    return (
        <Modal open={currentModalType == ModalType.CreateDatasourceModal} onClose={handleCloseModal} sx={styles.modal}>
            <div style={styles.modalContainer}>

                {/* Datasource Name/Spreadsheet Url/Sheet Name TextFields */}
                <TextField ref={datasourceNameRef} variant="filled" label="Datasource Name" sx={styles.modalTextfield}/>
                <TextField ref={spreadsheetUrlRef} variant="filled" label="Spreadsheet URL" sx={styles.modalTextfield}/>
                <TextField ref={sheetNameRef} variant="filled" label="Sheet Name" sx={styles.modalTextfield}/>

                {/* Create/Cancel Buttons */}
                <Button onClick={handleCreate} variant="outlined" size="large" sx={styles.modalButton}>Create</Button>
                <Button onClick={handleCloseModal} variant="outlined" size="large" sx={styles.modalButton}>Cancel</Button>
            </div>
         </Modal>
    );
}

export default CreateDatasourceModal;