import React from 'react';
import GoogleLogin from 'react-google-login';

function Splash() {
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID
    return (
        <div> </div>
        /*
        <div>   
            <div>Splash</div>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login"
            />
        </div>
        */
    );
}

export default Splash;