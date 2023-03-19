from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from utils import *

# Allow the API to have complete control over the spreadsheet with this scope
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# Env variable for credentials.
# TODO: Migrate to dynamic token passed from end user request
CREDENTIALS = './credentials.json'

# Function to retrieve the token from local development environment. This is mainly for testing.
# TODO: remove this function to pull authentication token from request itself.
def get_creds():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                CREDENTIALS, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return creds


def get_credentials(tokens):
    """
    Returns a credentials objects to access Google sheets operations

    Args:
        tokens (dict or json): the dict or json object containing access_token, refresh_token,
            client_id, client_secret
    Returns:
        Credentials: the Credentials object to be used for Google sheets operations
    """
    creds = Credentials.from_authorized_user_info(tokens)
    return creds


def refresh_tokens(tokens):
    """
    Refreshes oauth tokens

    Args:
        tokens (dict or json): the dict or json object containing access_token, refresh_token,
            client_id, client_secret
    Returns:
        dict or json: a dict or json object containing the refreshed token values
    """
    creds = Credentials.from_authorized_user_info(tokens)
    creds.refresh(Request())
    
    return creds.to_json()


# Create a spreadsheet and return the new spreadsheet ID.
def create_spreadsheet(title):
    try:
        service = build('sheets', 'v4', credentials=get_creds())

        # Pass in the desired title of the spreadsheet into the call body.
        spreadsheet = {
            'properties': {
                'title': title
            }
        }
        spreadsheet = service.spreadsheets().create(body=spreadsheet,
                                                    fields='spreadsheetId') \
            .execute()

        # Return the newly created spreadsheets' ID number
        return spreadsheet.get('spreadsheetId')
    except HttpError as err:
        print(err)

# Retrieve data from a spreadsheet. If a range is specified, retrieve all data from within that range.
# If no range is specified, returns the entire first sheet. Reads the data row by row as a default.
def get_data(spreadsheet_id, range=None, majorDimension="ROWS"):
    try:
        service = build('sheets', 'v4', credentials=get_creds())

        # Call the Sheets API
        sheet = service.spreadsheets()

        # If no range is specified, pull data from the entire first sheet by default. To do this, we need to retrieve the name
        # of the first sheet.
        if range is None:
            range=sheet.get(spreadsheetId=spreadsheet_id).execute().get('sheets')[0].get('properties').get('title')

        # Make the API call to retrieve the specified data from the sheet
        result = sheet.values().get(spreadsheetId=spreadsheet_id,
                                    range=range,
                                    majorDimension=majorDimension) \
                                .execute()

        # Return the data stored in the spreadsheet as a 2 dimensional list.
        return result.get('values')
    except HttpError as err:
        print(err)

# Update a specific cell in the spreadsheet. This function only works for one 
# cell in the spreadsheet, and does not support updating multiple cells at once. 
def update_cell(spreadsheet_id, value_to_update, row_index, column_index):
    try:
        service = build('sheets', 'v4', credentials=get_creds())

        # Retrieve the type of value of value_to_update as a string parsable by the
        # Google Sheets API.
        type_of_value = get_spreadsheet_value_type(value_to_update)

        # Generate the request body
        request_body = {
            # An array of requests to send to the spreadsheet. We are only concerned with updating the sheet
            # in this API call.
            'requests': [{
                'updateCells': {
                    'rows': [{
                        'values': [{
                            # Update the current value to the requested value
                            'userEnteredValue': {
                                type_of_value: value_to_update
                            }
                        }]
                    }],
                    # Overwrite all fields, regardless of their current data value
                    'fields': '*',
                    'start': {
                        'rowIndex': row_index,
                        'columnIndex': column_index
                    }
                }
            }]
        }

        # Execute the API call
        service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body=request_body).execute()
        
    except HttpError as err:
        print(err)

# For batch updating an entire record / row. Must pass the entire new row as an array
# to this API call.
def update_row(spreadsheet_id, updated_row_data, row_index):
    try:
        service = build('sheets', 'v4', credentials=get_creds())

        # Generate the request body
        request_body = {
            # An array of requests to send to the spreadsheet. We are only concerned with updating the sheet
            # in this API call.
            'requests': [{
                'updateCells': {
                    'rows': [{
                        'values': [
                            # Convert the list of row data into a list of objects parsable by the Sheets API
                            generate_row_data(updated_row_data)
                        ]
                    }],
                    # * means to overwrite all fields, regardless of their current data value
                    'fields': '*',
                    # Begin updating of data at row_index
                    'start': {
                        'rowIndex': row_index
                    }
                }
            }]
        }

        # Execute the API call
        service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body=request_body).execute()
        
    except HttpError as err:
        print(err)

# Insert a new record / row in the spreadsheet. The data in row_to_insert must be passed as a list, where every element in the list
# corresponds to the elements in the row.
# TODO: Allow insertion of row into any row, not just end of spreadsheet
def insert_row(spreadsheet_id, sheet_id, row_to_insert):
    try:
        service = build('sheets', 'v4', credentials=get_creds())

        # Generate the request body
        request_body = {
            # An array of requests to send to the spreadsheet. We are only concerned with updating the sheet
            # in this API call.
            'requests': [{
                'appendCells': {
                    'sheetId': sheet_id,
                    'rows': [{
                        'values': [
                            # Convert the list of row data into a list of objects parsable by the Sheets API
                            generate_row_data(row_to_insert)
                        ]
                    }],
                    # * means to overwrite all fields, regardless of their current data value
                    'fields': '*'
                }
            }]
        }

        # Execute the API call
        service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body=request_body).execute()
        
    except HttpError as err:
        print(err)

# Delete a record (or row) from the spreadsheet
def delete_row(spreadsheet_id, sheet_id, row_index):
    try:
        service = build('sheets', 'v4', credentials=get_creds())

        # Generate the request body
        request_body = {
            # An array of requests to send to the spreadsheet. We are only concerned with updating the sheet
            # in this API call.
            'requests': [{
                'deleteRange': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': row_index,
                        'endRowIndex': row_index + 1
                    },
                    # Shift all rows upwards if necessary
                    'shiftDimension': 'ROWS'
                }
            }]
        }

        # Execute the API call
        service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body=request_body).execute()
        
    except HttpError as err:
        print(err)

    return