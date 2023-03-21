import os
from http import HTTPStatus

from dotenv import get_key
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

from sheets.sheets_api import SCOPES


def get_client_id_secret():
    client_id = get_key('.env', "CLIENT_ID")
    client_secret = get_key('.env', "CLIENT_SECRET")
    
    return client_id, client_secret


def oauth_login_user(auth_code):
    try:
        client_id, client_secret = get_client_id_secret()
        
        flow = InstalledAppFlow.from_client_config(
            client_config={'client_id': client_id, 'client_secret': client_secret},
            scopes=SCOPES
        )
        
        flow.fetch_token(authorization_response=auth_code)
        creds = flow.credentials
        creds_info = Request().authorize(creds)
        
        email = creds_info['email']
        access_token = creds.token
        refresh_token = creds.refresh_token
        
        return email, access_token, refresh_token, HTTPStatus.OK
    
    except Exception as e:
        return f"Error: {e} ", 0, 0, HTTPStatus.INTERNAL_SERVER_ERROR
        