from django.test import TestCase

from server.api.sheets.sheets_api import *

# Create your tests here.
class SheetsAPITestCase(TestCase):
    spreadsheet_id='1GxYsHB5FOpZRRDDk0e5E5MpuHKpj_U7C7v6ubhcwNpQ'
    sheet_id=0
    range='A2:C2'
    columns=[0, 2]
    value_to_update='Updated cell value'
    row_index=2
    column_index=0
    updated_row_data=['1', '2', '3']

    def test_get_data_when_sheet_id_is_none(self):
        self.assertListEqual(get_data(self.spreadsheet_id), [['Some', 'Test', 'Data']])
    
    def test_get_data_when_sheet_range_is_none(self):
        self.assertListEqual(get_data(self.spreadsheet_id, self.sheet_id), [['Some', 'Test', 'Data'], ['Second', 'Row', 'Data']])

    def test_get_data(self):
        self.assertListEqual(get_data(self.spreadsheet_id, self.sheet_id, self.range), [['Second', 'Row', 'Data']])

    def test_get_column_data(self):
        self.assertListEqual(get_column_data(self.spreadsheet_id, self.sheet_id, self.range), [['Some', 'Second'], ['Data', 'Data']])

    def test_update_cell(self):
        update_cell(self.spreadsheet_id, self.sheet_id, self.value_to_update, self.row_index, self.column_index)
        self.assertListEqual(get_data(self.spreadsheet_id, self.sheet_id, '3:3'), [['Updated cell value']])

    def test_update_row(self):
        update_row(self.spreadsheet_id, self.sheet_id, self.updated_row_data, 3)
        self.assertListEqual(get_data(self.spreadsheet_id, self.sheet_id, '4:4'), [['1', '2', '3']])

    # Insert a row containing Inserted Row Data into the last row of the spreadsheet
    def test_insert_row(self):
        insert_row(self.spreadsheet_id, self.sheet_id, ['Inserted', 'Row', 'Data'])
        self.assertListEqual(get_data(self.spreadsheet_id, self.sheet_id, '5:5'), [['Inserted', 'Row', 'Data']])

    # After the previous test has run, delete the row at index 5. This should mean the row
    # at index 5 is now empty.
    def test_delete_row(self):
        delete_row(self.spreadsheet_id, self.sheet_id, 5)
        self.assertListEqual(get_data(self.spreadsheet_id, self.sheet_id, '5:5'), [[]])
