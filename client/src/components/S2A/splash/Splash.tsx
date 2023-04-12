import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoggedIn } from '../../../auth/AuthController';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from '../../../local_modules/gapi-script-esm';

import styles from '../../../styles/S2A/splash/SplashStyles'

function Splash() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    /* Synchronizes Google API with OAuth client id to prevent depreciation error. */
    useEffect(() => {
        if (!gapi) return;
        function init() {
            gapi.client.init({
                clientId: process.env.REACT_APP_OAUTH_CLIENT_ID || '',
                scope: "email"
            });
        }
        gapi.load('client:auth2', init);
    }, [gapi]);

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

    const onFailure = (error: any) => {
        if("error" in error && error["error"] === "popup_closed_by_user") {
           setError("Failed to sign in.");
        }
    };

    return (
        <div style={styles.splashWrapper}>
          {/* Grid row #1  */}
          <div style={styles.title}>
            Sheet2App
          </div>
          <div style={styles.poweredBy}>
            Powered by Google Cloud
            <img style={{ ...styles.gcloud, ...styles.icon }}></img>
            & Google Sheets
            <img style={{ ...styles.gsheets, ...styles.icon }}></img>
          </div>
          
          {/* Grid row #2 */}
          <div style={styles.centerWrapper}>
            <div style={styles.description}>
                Straightforward. Powerful. No-Code.
            </div>
            <div style={styles.loginButton}>
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
            {error && <div style={styles.error}>{error}</div>}
          </div>

          {/* Grid row #3 */}
          <div style={{ ...styles.textbox1, ...styles.textbox }}>
            <p><b>Create Your Own Apps</b><br></br><br></br>Developers will be able to create their own end-user applications backed by their personal Google Sheets data. Permissions can be also be defined at an individual granularity.</p>
          </div>
          <div style={{ ...styles.textbox2, ...styles.textbox }}>
            <p><b>Share and Access Apps</b><br></br><br></br>End-users are able to access developed apps shared with them. Within these apps, they are able to navigate through a plethora of views that allow them to indirectly create, update, and delete Google Sheets data.</p>
          </div>
          <div style={{ ...styles.textbox3, ...styles.textbox }}>
            <p><b>Live Data Synchronization</b><br></br><br></br>End-users can see data changes performed by others in real-time for coordination and collaboration across backing Google Sheets.</p>
          </div>
        </div>
  );
}

export default Splash;