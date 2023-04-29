import React, { useEffect } from 'react';
import {Box, Button, Divider, Typography} from '@mui/material';
import { View } from '../../store/StoreTypes';
import EditIcon from '@mui/icons-material/Edit';
import { showEditRecordModal } from '../../store/StoreContext';
import { useDispatch } from 'react-redux';
import DatasourceNavBar from './DatasourceNavBar';

function Detailview() {
    const dispatch = useDispatch();
    // TODO: Make API call to the spreadsheet URL
    // let spreadsheetData = api.get
    // let columnName = spreadsheetData[0] // Since the spreadsheet is passed back as a 2d list, the first element (row-wise) contains all of the columns

    let testColumnHeader: string[] = ['A', 'B', 'C', 'D']

    return (
        <Box>
            <DatasourceNavBar />
            <Box
                id='detail-view-container'
                sx={{
                    display: 'grid',
                    flexDirection: 'column',
                    width: '100%',
                    fontSize: '32px',
                    alignItems: 'center',
                    justifyContent: 'center'
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
                            return <div key={columnHeader}>{columnHeader}</div>
                        })
                    }
                </Box>
                <Divider
                    sx={{
                        bgcolor: 'black',
                        fontWeight: 'bold'
                    }}
                />

                {/** TODO: ADD THE SPREADSHEET DATA HERE */}

                <Button
                    id='edit-record-button'
                    sx={{
                        display: 'flex'
                    }}
                    // onClick={() => { dispatch(showEditRecordModal(props)) }}
                >
                    <Typography>
                        Edit Record
                    </Typography>
                    <EditIcon />
                </Button>
            </Box>
        </Box>
    )
}

export default Detailview;