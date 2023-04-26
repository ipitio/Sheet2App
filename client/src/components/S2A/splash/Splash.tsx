import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoggedIn } from '../../../auth/AuthController';

import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';

import styles from '../../../styles/S2A/splash/SplashStyles'
import Cookies from 'js-cookie';

function Splash() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const login = useGoogleLogin({
      onSuccess: codeResponse => getLoggedIn(codeResponse.code)
      .then((res: any) => {
        console.log("Successfully signed in.");
        navigate('/S2A/home/develop');
      })
      .catch((err: any) => {
        setError(err.message);
      }),
      scope: 'openid https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      flow: 'auth-code',
    });
    
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
                  onSuccess={() => {
                    if (!Cookies.get('refreshToken')) {
                      login();
                    } else {
                      navigate('/S2A/home/develop');
                    }
                  }}
                  onError={() => setError("Failed to sign in.")}
                  useOneTap
                  auto_select
                  
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