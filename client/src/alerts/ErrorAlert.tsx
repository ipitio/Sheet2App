import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { store, StoreState, hideErrorAlert, hideWebAppErrorAlert } from '../store/StoreContext';

export default function ErrorAlert() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const S2AShowErrorAlert = useSelector((state: StoreState) => state.S2AReducer.showErrorAlert);
    const userAppShowErrorAlert = useSelector((state: StoreState) => state.webAppReducer.showErrorAlert);
    return (
        <>
            {(S2AShowErrorAlert || userAppShowErrorAlert) &&
                <Alert severity="error" onClose={() => {dispatch(hideErrorAlert()); dispatch(hideWebAppErrorAlert())}} sx={{marginBottom: '0vh'}}>
                    Error. Could not process your request.
                </Alert>
            }
        </>
    );
  }