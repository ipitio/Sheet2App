import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from "gapi-script"

const clientId: string = process.env.REACT_APP_OAUTH_CLIENT_ID || '';

function Splash() {
    const navigate = useNavigate();
    const { updateAuthState } = useContext(AuthContext);

    /* Synchronizes Google API with OAuth client id to prevent depreciation error. */
    useEffect(() => {
        function init() {
            gapi.client.init({
                clientId: clientId,
                scope: "email"
            });
        }
        gapi.load('client:auth2', init);
    }, []);

    /* On success, navigate to home screen. */
    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if("accessToken" in res) {
            updateAuthState(res.profileObj.email, res.accessToken);
            navigate('/S2A/home');
        }
        else
            console.log("Offline failure.", res);
    }   

    /* On failure, display error message. */
    const onFailure = (res: any) => {
        console.log("General failure", res);
    };

    return (
        <div>   
            <div>Splash</div>
            <GoogleLogin 
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                buttonText="Sign into S2A with Google"
            />
        </div>
    );
}

export default Splash;