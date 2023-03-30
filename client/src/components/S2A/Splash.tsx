import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoggedIn } from '../../auth/AuthController';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script'

import '../../styles/Splash.css'

function Splash() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        /* Synchronizes Google API with OAuth client id to prevent depreciation error. */
        function init() {
            gapi.client.init({
                clientId: process.env.REACT_APP_OAUTH_CLIENT_ID || '',
                scope: "email"
            });
        }
        gapi.load('client:auth2', init);
    }, []);

    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if("code" in res && typeof res.code === "string") {
            /* On success, navigate to home screen. */
            getLoggedIn(res.code).then(() => {
                navigate("S2A/home/develop");
            })
            .catch(() => {
              setError("Failed to generate OAuth tokens.");
            });
        }
        else
          setError("External API failure.")
    }   

    const onFailure = () => {
        setError("Failed to sign in.");
    };

    return (
        <div id="splash-wrapper">
          {/* Grid row #1  */}
          <div id="title">
            Sheet2App
          </div>
          <div id="powered-by">
            Powered by Google Cloud
            <img id="gcloud-icon" className="icon"></img>
            & Google Sheets
            <img id="gsheets-icon" className="icon"></img>
          </div>
          
          {/* Grid row #2 */}
          <div id="center-wrapper">
            <div id="description">
                Straightforward. Powerful. No-Code.
            </div>
            <div id="login-button">
                <GoogleLogin
                    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID || ''}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    prompt="consent"
                    accessType="offline"
                    responseType="code"
                    scope="https://www.googleapis.com/auth/gmail.send"
                    buttonText="Sign into S2A with Google"
                />
            </div>
            {error && <div className="error">{error}</div>}
          </div>

          {/* Grid row #3 */}
          <div id="textbox1" className="textbox">
            <p><b>Create Your Own Apps</b><br></br><br></br>Developers will be able to create their own end-user applications backed by their personal Google Sheets data. Permissions can be also be defined at an individual granularity.</p>
          </div>
          <div id="textbox2" className="textbox">
            <p><b>Share and Access Apps</b><br></br><br></br>End-users are able to access developed apps shared with them. Within these apps, they are able to navigate through a plethora of views that allow them to indirectly create, update, and delete Google Sheets data.</p>
          </div>
          <div id="textbox3" className="textbox">
            <p><b>Live Data Synchronization</b><br></br><br></br>End-users can see data changes performed by others in real-time for coordination and collaboration across backing Google Sheets.</p>
          </div>
        </div>
      );
}

export default Splash;