import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import store, { StoreState, hideErrorAlert } from '../store/StoreContext';

export default function ErrorAlert() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const showSuccessAlert = useSelector((state: StoreState) => state.S2AReducer.showErrorAlert);

    return (
        <>
            {showSuccessAlert &&
                <Alert severity="error" onClose={() => {dispatch(hideErrorAlert())}} sx={{marginBottom: '0vh'}}>
                    Error. Could not process your request.
                </Alert>
            }
        </>
    );
  }