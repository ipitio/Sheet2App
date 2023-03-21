from django.test import TestCase

from server.api.sheets.sheets_api import *

# Create your tests here.
class SheetsAPITestCase(TestCase):
    spreadsheet_id='1GxYsHB5FOpZRRDDk0e5E5MpuHKpj_U7C7v6ubhcwNpQ'
    sheet_id=0

    def test_get_data_when_sheet_id_is_none(self):
        TestCase.assertEqual(get_data(self.spreadsheet_id), ['First', 'Read', 'Data'])
