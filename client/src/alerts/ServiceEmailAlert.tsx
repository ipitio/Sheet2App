import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { store, StoreState, hideEmailAlert, displayEmailAlert } from '../store/StoreContext';
import { useEffect } from 'react';

export default function ServiceEmailAlert() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const showEmailAlert = useSelector((state: StoreState) => state.S2AReducer.showEmailAlert);

    useEffect(() => {
        dispatch(displayEmailAlert());
    }, [])

    return (
        <>
            {showEmailAlert &&
                <Alert severity="info" onClose={() => {dispatch(hideEmailAlert());}} sx={{marginBottom: '0vh'}}>
                    Share your spreadsheets with s2a-service-account@cse-416-380603.iam.gserviceaccount.com
                </Alert>
            }
        </>
    );
  }