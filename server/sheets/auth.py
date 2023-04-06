import os
from http import HTTPStatus

from dotenv import get_key
from dotenv import load_dotenv
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build


def get_client_id_secret():
    load_dotenv()
    CLIENT_ID = os.getenv('CLIENT_ID')
    CLIENT_SECRET = os.getenv('CLIENT_SECRET')

    return CLIENT_ID, CLIENT_SECRET


def oauth_login_user(auth_code):
    try:
        os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1' # TODO sommehow fix this thing
        
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
            'https://www.googleapis.com/auth/userinfo.email'
        ]

        flow = Flow.from_client_config(
            client_config=CLIENT_CONFIG,
            scopes=SCOPES,
            redirect_uri="http://localhost:3000"
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
        