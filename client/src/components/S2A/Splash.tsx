import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoggedIn } from '../../auth/AuthController';

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script'

import gcloudIcon from '../../styles/googlecloud.png'
import gsheetsIcon from '../../styles/googlesheets.png'

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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '5% 70% 25%', height: '100vh', fontFamily: 'sans-serif'}}>
          {/* Grid row #1  */}
          <div style={{ gridColumn: '1', gridRow: '1', marginLeft: '5rem', textAlign: 'left', fontSize: '2.5rem'}}>
            Sheet2App
          </div>
          <div style={{ gridColumn: '3', gridRow: '1', marginLeft: '5rem', textAlign: 'center', fontSize: '1.1rem', fontWeight: 'lighter'}}>
            Powered by Google Cloud
            <img src={gcloudIcon} style={{ marginLeft: '0.5rem', marginRight: '0.5rem', verticalAlign: 'middle', height: '2rem' }}></img>
            & Google Sheets
            <img src={gsheetsIcon} style={{ marginLeft: '0.5rem', marginRight: '0.5rem', verticalAlign: 'middle', height: '2rem' }}></img>
          </div>
          
          {/* Grid row #2 */}
          <div style={{ gridColumn: '1 / span 3', gridRow: '2', justifySelf: 'center', alignSelf: 'center', height: '55vh', width: '100vw', backgroundColor: '#87CEEB'}}>
            <div style={{ display: 'flex', marginTop: '1rem', justifyContent: 'center', fontSize: '2rem'}}>
                Straightforward. Powerful. No-Code.
            </div>
            <div style={{ height: '65%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          </div>

          {/* Grid row #3 */}
          <div style={{ gridColumn: '1', gridRow: '3', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #87CEEB', borderRadius: '10px', margin: '2rem', padding: '2rem' }}>
            <p><b>Create Your Own Apps</b><br></br><br></br>Developers will be able to create their own end-user applications backed by their personal Google Sheets data. Permissions can be also be defined at an individual granularity.</p>
          </div>
          <div style={{ gridColumn: '2', gridRow: '3', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #87CEEB', borderRadius: '10px', margin: '2rem', padding: '2rem' }}>
            <p><b>Share and Access Apps</b><br></br><br></br>End-users are able to access developed apps shared with them. Within these apps, they are able to navigate through a plethora of views that allow them to indirectly create, update, and delete Google Sheets data.</p>
          </div>
          <div style={{ gridColumn: '3', gridRow: '3', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #87CEEB', borderRadius: '10px', margin: '2rem', padding: '2rem' }}>
            <p><b>Live Data Synchronization</b><br></br><br></br>End-users can see data changes performed by others in real-time for coordination and collaboration across backing Google Sheets.</p>
          </div>
        </div>
      );
}

export default Splash;