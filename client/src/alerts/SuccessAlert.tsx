import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import store, { StoreState, hideSuccessAlert, hideWebAppSuccessAlert } from '../store/StoreContext';

export default function SuccessAlert() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const S2AShowSuccessAlert = useSelector((state: StoreState) => state.S2AReducer.showSuccessAlert);
    const userAppShowSuccessAlert = useSelector((state: StoreState) => state.webAppReducer.showSuccessAlert);

    return (
        <>
            {(S2AShowSuccessAlert || userAppShowSuccessAlert) &&
                <Alert severity="success" onClose={() => {dispatch(hideSuccessAlert()); dispatch(hideWebAppSuccessAlert())}} sx={{marginBottom: '0vh'}}>
                    Success!
                </Alert>
            }
        </>
    );
  }