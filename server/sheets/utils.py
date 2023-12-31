import re

# Function to convert the data type of the value as a Sheets-compatible
# data type.
""" def get_spreadsheet_value_type(value):
    if isinstance(value, str):
        return 'stringValue'
    
    if isinstance(value, int) or isinstance(value, float):
        return 'numberValue'
    
    if isinstance(value, bool):
        return 'boolValue'

# Convert a list of row data into a list of objects parsable by the 
# Sheets API.
def generate_row_data(row_data):
    values = []

    for data in row_data:
        values.append(
            {
                # Using userEnteredValue as key enforces that data types are not coerced and the data is entered into the spreadsheet
                # as it is entered in the web application
                'userEnteredValue': {
                    # Retrieve the proper key type for the data in a parsable format for Sheets.
                    get_spreadsheet_value_type(data): data
                }
            }
        )
    
    # Return a list of parsable objects that represent a row of data within the spreadsheet.
    return values """


def get_spreadsheet_value_type(value):
    if isinstance(value, str):
        if (len(value) >= 1 and value[0] == '='):
            return 'formulaValue'
        else:
            return "stringValue"
    elif isinstance(value, bool):
        return "boolValue"
    elif isinstance(value, int):
        return "numberValue"
    elif isinstance(value, float):
        return "numberValue"
    else:
        return "errorValue"


def generate_row_data(row_data):
    row = []
    for value in row_data:
        row.append({get_spreadsheet_value_type(value): value})
    return row


def get_spreadsheet_id(url):
    # ex: https://docs.google.com/spreadsheets/d/1mxIVSQbNFoYjqtO2A5i-WBIrXtc7URaJdTBT5zpTO1A/edit#gid=0
    split = url.split("/d/")
    split = split[1].split("/")
    
    return split[0]


def get_gid(url):
    # ex: https://docs.google.com/spreadsheets/d/1mxIVSQbNFoYjqtO2A5i-WBIrXtc7URaJdTBT5zpTO1A/edit#gid=0
    return int(url.split("gid=")[1])
    
    
def is_valid_url(url):
    url_regex = r'^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)\/edit#gid=([0-9]+)'
    return re.match(url_regex, url)