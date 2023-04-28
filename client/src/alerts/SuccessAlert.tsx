import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import store, { StoreState, hideSuccessAlert } from '../store/StoreContext';

export default function SuccessAlert() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const showSuccessAlert = useSelector((state: StoreState) => state.S2AReducer.showSuccessAlert);

    return (
        <>
            {showSuccessAlert &&
                <Alert severity="success" onClose={() => {dispatch(hideSuccessAlert())}} sx={{marginBottom: '0vh'}}>
                    Success!
                </Alert>
            }
        </>
    );
  }