import React from 'react';
import {Box, Button, Divider, Typography} from '@mui/material';
import { View } from '../../store/StoreTypes';
import EditIcon from '@mui/icons-material/Edit';

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
            id='detail-view-container'
            sx={{
                display: 'grid',
                flexDirection:'column',
                width: '100%',
                fontSize: '32px',
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            <Box
                id='detail-header'
                sx={{
                    display: 'block',
                    justifyContent: 'space-between',
                    width: 'full'
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

            {/** TODO: ADD THE SPREADSHEET DATA HERE */}

            <Button
                id='edit-record-button'
                sx={{
                    display: 'flex',

                }}
            >
                <Typography>
                    Edit Record
                </Typography>
                <EditIcon />
            </Button>
        </Box>
    )
}

export default DetailView;