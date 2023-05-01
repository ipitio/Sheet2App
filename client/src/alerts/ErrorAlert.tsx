import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { store, StoreState, hideErrorAlert, hideWebAppErrorAlert, clearErrorMessage, returnToS2A } from '../store/StoreContext';
import { Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function ErrorAlert() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const S2AShowErrorAlert = useSelector((state: StoreState) => state.S2AReducer.showErrorAlert);
    const userAppShowErrorAlert = useSelector((state: StoreState) => state.webAppReducer.showErrorAlert);
    const errorMessage = useSelector((state: StoreState) => state.webAppReducer.errorMessage);

    return (
        <>
            {(S2AShowErrorAlert || userAppShowErrorAlert) &&
                <Alert severity="error" onClose={() => {dispatch(hideErrorAlert()); dispatch(hideWebAppErrorAlert()); dispatch(clearErrorMessage())}} sx={{marginBottom: '0vh', display: 'flex', flexDirection: 'column'}}>
                    {`Error. Could not process your request. ${errorMessage}`}

                    {errorMessage.includes("The datasource is not valid") &&
                        <Link href='/S2A/home/access'>
                            <Button startIcon={<KeyboardReturnIcon />} onClick={() => { dispatch(returnToS2A()); dispatch(hideWebAppErrorAlert()); dispatch(clearErrorMessage()); }}>
                                Return To S2A
                            </Button>
                        </Link>
                    }
                </Alert>
            }
        </>
    );
  }