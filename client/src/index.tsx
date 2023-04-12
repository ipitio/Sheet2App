import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID || ''}>
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);