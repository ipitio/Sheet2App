import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoggedIn } from '../../auth/AuthController';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from "gapi-script"

const clientId: string = process.env.REACT_APP_OAUTH_CLIENT_ID || '';

function Splash() {
    const navigate = useNavigate();

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
        if("code" in res && typeof res.code === "string") {
            getLoggedIn(res.code).then(() => {
                navigate("s2a/home");
            })
            .catch(err => {
                console.log("Failed to generate OAuth tokens.", err);
            });
        }
        else
            console.log("Failed to sign in.", res);
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
                prompt="consent"
                accessType="offline"
                responseType="code"
                scope="https://www.googleapis.com/auth/gmail.send"
                buttonText="Sign into S2A with Google"
            />
        </div>
    );
}

export default Splash;