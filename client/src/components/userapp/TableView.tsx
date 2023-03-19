import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { View } from '../../store/StoreTypes';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface TableViewProps extends View { }

// TODO: GET RID OF THE ANY TYPE FOR TABLE PROPS. THIS IS JUST FOR TESTING
function TableView(props: TableViewProps | any) {
    // TODO: Make API call to the spreadsheet URL
    // let spreadsheetData = api.get
    // let columnName = spreadsheetData[0] // Since the spreadsheet is passed back as a 2d list, the first element (row-wise) contains all of the columns

    let testColumnHeader: string[] = ['Name', 'Age', 'Favorite Fruit', 'Occupation']
    let testSpreadsheetData = [['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor']]

    /**
     * Parse the spreadsheet data into rows
     */
    const spreadsheetData = testSpreadsheetData.map((row, index) => {
        const bgColor = index % 2 === 0 ? '#E0E0E0' : '#FFFFFF';
        const rounded = index == testSpreadsheetData.length - 1 ? '8px' : '0px'

        return (
            // Iterate through each row and return a graphical representation of the data in the table
            <Box
                className='table-row'
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '25% 25% 25% 25%',
                    bgcolor: bgColor,
                    borderBottomLeftRadius: rounded,
                    borderBottomRightRadius: rounded
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
     * Generate the table into a visual component using the parsed spreadsheet data
     */
    const table = (
        <Box
            id='table-with-headers'
            sx={{
                display: 'grid',
                gridTemplateColumns: '85% 15%'
            }}
        >
            <Box 
                id='table'
                sx={{
                    border: 1,
                    borderRadius: '8px',
                    borderColor: 'black'
                }}
            >
                <Box
                    id='table-header'
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '25% 25% 25% 25%',
                        gridColumn: '1'
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

            <Box
                id='table-buttons'
                sx={{
                    display:'flex',
                    flexDirection: 'column'
                }}
            >

            </Box>
        </Box>
    )

    return (
        <Box
            id='table-view-container'
            sx={{
                display: 'block',
                width: '100%',
                fontSize: '32px',
            }}
        >
            {table}
        </Box>
    )
}

export default TableView;