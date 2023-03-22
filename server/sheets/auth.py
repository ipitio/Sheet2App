import os
from http import HTTPStatus
import requests

from dotenv import get_key
from dotenv import load_dotenv
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request

from sheets.sheets_api import SCOPES


def get_client_id_secret():
    load_dotenv()
    client_id = os.getenv('CLIENT_ID')
    client_secret = os.getenv('CLIENT_SECRET')
    
    return client_id, client_secret


def oauth_login_user(auth_code):
    try:
        os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
        
        client_id, client_secret = get_client_id_secret()
        
        # TODO: scopes need to be fixed so they match tszhim's scopes in google cloud oauth consent 
        # fix this so it uses, Flow.from_client_config
        flow = Flow.from_client_secrets_file(
            'sheets/credentials_web.json',
            scopes=['https://www.googleapis.com/auth/spreadsheets',
                    "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"],
            redirect_uri="http://localhost:3000"
        )
        
        flow.fetch_token(code=auth_code)
        
        creds = flow.credentials
        creds_info = Request().authorize(creds, verify=False)   # TODO this line is the next line that is bugged
        
        email = creds_info['email']
        access_token = creds.token
        refresh_token = creds.refresh_token
        
        return email, access_token, refresh_token, HTTPStatus.OK
    
    except Exception as e:
        print(f"Error: {e}")
        return f"Error: {e} ", 0, 0, HTTPStatus.INTERNAL_SERVER_ERROR
        