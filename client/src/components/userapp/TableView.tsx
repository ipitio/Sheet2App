import React from 'react';
import {Box, Divider, Typography} from '@mui/material';
import { View } from '../../store/StoreTypes';

interface TableViewProps extends View {}

// TODO: GET RID OF THE ANY TYPE FOR TABLE PROPS. THIS IS JUST FOR TESTING
function TableView(props: TableViewProps | any) {
    // TODO: Make API call to the spreadsheet URL
    // let spreadsheetData = api.get
    // let columnName = spreadsheetData[0] // Since the spreadsheet is passed back as a 2d list, the first element (row-wise) contains all of the columns

    let testColumnHeader: string[] = ['Name', 'Age', 'Favorite Fruit', 'Occupation']
    let testSpreadsheetData = [['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer']]

    // Parse the spreadsheet data into rows
    const spreadsheetData = testSpreadsheetData.map((row, index) => {
        const bgColor = index % 2 == 0 ? '#E0E0E0' : '#FFFFFF';

        return (
            // Iterate through each row and return a graphical representation of the data in the table
            <Box
                className='table-row'
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '25% 25% 25% 25%',
                    bgcolor: bgColor
                }}
            >
                {
                    // Take each element in the row and place it in a cell
                    row.map((entry) => {
                        return (
                            <Typography sx={{
                                textAlign: 'center'
                            }}>
                                {entry}
                            </Typography>
                        )
                    })
                }
            </Box>
        )
    })

    /**
     * Generate the table into a visual component
     */
    const table = (
        <Box id='table'>
            <Box
                id='table-header'
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '25% 25% 25% 25%'
                }}
            >
                {
                    testColumnHeader.map((columnHeader) => {
                        return (
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '32px'
                                }}
                            >
                                {columnHeader}
                            </Typography>
                        )
                    })
                }
            </Box>
            <Divider
                sx={{
                    bgcolor: 'black'
                }}
            />
            {
                spreadsheetData
            }
        </Box>
    )

    return (
        <Box
            id='table-view-container'
            sx={{
                display: 'block',
                width: '100%',
                fontSize: '32px',
                border: 1,
                borderRadius: '8px',
                borderColor: 'black'
            }}
        >
            {table}
        </Box>
    )
}

export default TableView;