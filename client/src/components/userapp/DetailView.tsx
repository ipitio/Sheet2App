import React from 'react';
import {Box, Divider} from '@mui/material';
import { View } from '../../store/StoreTypes';

interface DetailViewProps extends View {
    // The 0-based index of the record (row number) being represented
    recordIndex: number
}

// TODO: GET RID OF THE ANY TYPE FOR TABLE PROPS. THIS IS JUST FOR TESTING
function DetailView(props: DetailViewProps | any) {
    // TODO: Make API call to the spreadsheet URL
    // let spreadsheetData = api.get
    // let columnName = spreadsheetData[0] // Since the spreadsheet is passed back as a 2d list, the first element (row-wise) contains all of the columns

    let testColumnHeader: string[] = ['A', 'B', 'C', 'D']

    return (
        <Box
            id='table-view-container'
            sx={{
                display: 'block',
                width: '100%',
                fontSize: '32px'
            }}
        >
            <Box
                id='table-header'
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                {
                    testColumnHeader.map((columnHeader) => {
                        return <div>{columnHeader}</div>
                    })
                }
            </Box>
            <Divider 
                sx={{
                    bgcolor:'black',
                    fontWeight:'bold'
                }}
            />
        </Box>
    )
}

export default DetailView;