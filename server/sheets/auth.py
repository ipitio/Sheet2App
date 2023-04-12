import os
from http import HTTPStatus
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

NODE_HOST = os.getenv('NODE_HOST')
NODE_PORT = os.getenv('NODE_PORT')
NODE_PROTOCOL = os.getenv('NODE_PROTOCOL')
NODE_URL = f"{NODE_PROTOCOL}://{NODE_HOST}:{NODE_PORT}"

def get_client_id_secret():
    CLIENT_ID = os.getenv('OAUTH_CLIENT_ID')
    CLIENT_SECRET = os.getenv('OAUTH_CLIENT_SECRET')

    return CLIENT_ID, CLIENT_SECRET


def oauth_login_user(auth_code):
    try:
        if os.getenv('NODE_PROTOCOL') == 'http':
            os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
        
        CLIENT_ID, CLIENT_SECRET = get_client_id_secret()
        CLIENT_CONFIG = {
            "web": {
                "client_id": CLIENT_ID,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "client_secret": CLIENT_SECRET
            }
        }
        SCOPES = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/gmail.send'
        ]

        flow = Flow.from_client_config(
            client_config=CLIENT_CONFIG,
            scopes=SCOPES,
            redirect_uri=f"{NODE_URL}"
        )
        
        flow.fetch_token(code=auth_code)
        credentials = flow.credentials
        
        service = service = build('oauth2', 'v2', credentials=credentials)
        
        user_info = service.userinfo().get().execute()
        email = user_info['email']
        access_token = credentials.token
        refresh_token = credentials.refresh_token
        
        auth_info = {
            "email": email, 
            "access_token": access_token, 
            "refresh_token": refresh_token
        }
        
        return auth_info, HTTPStatus.OK
    
    except Exception as e:
        print(f"Error: {e}")
        return f"Error: {e} ", 0, 0, HTTPStatus.INTERNAL_SERVER_ERROR
        