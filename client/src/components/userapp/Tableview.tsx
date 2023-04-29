import { Box, Button, Divider, Typography } from '@mui/material';
import { View } from '../../store/StoreTypes';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useDispatch, useSelector } from 'react-redux';
import store, { StoreState, showAddRecordModal, showDeleteRecordModal } from '../../store/StoreContext';
import { Record } from '../../store/StoreTypes';
import { useEffect, useState } from 'react';
import DatasourceNavBar from './DatasourceNavBar';
import styles from '../../styles/userapp/containers/ContentContainers'
import { loadTableview } from '../../store/StoreController';

function Tableview() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const columns = useSelector((state: StoreState) => state.webAppReducer.columns);
    const columnData = useSelector((state: StoreState) => state.webAppReducer.columnData);

    const app = useSelector((state: StoreState) => state.webAppReducer.app);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading || !app) return;

        dispatch(loadTableview())
        .then(() => {
            setIsLoading(false);
        })
    })

    const columnNames = columns.map((col) => {return col.name});

    // Find the percentage of space each cell should take in a row. This assumes that all cells take an even amount of space with the other cells.
    const cellWidthPercentage: string = (100 / (columnData && columnData[0] ? columnData[0].length : 1)) + '%'

    // Determine the dimensions of the table cells.
    const cellWidth = `repeat(${(columnData && columnData[0] ? columnData[0].length : 1)}, ${cellWidthPercentage})`

    // Constant to determine the spacing between each row. Change as necessary.
    const rowPadding: string = '8px'

    /**
     * Frontend component for table header (column names)
     */
    const tableHeader = (
        <Box>
            <Box id='table-header' sx={{ display: 'grid', gridTemplateColumns: cellWidth, gridColumn: '1' }}>
                {columnNames.map((columnHeader) => {
                    return (
                        <Typography key={columnHeader} sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '32px' }}>
                            {columnHeader}
                        </Typography>
                    )
                })}
            </Box>
            <Divider sx={{ bgcolor: 'black' }} />
        </Box>
    )

    /**
     * Frontend component for table view buttons (adding record and deleting record)
     */
    const buttons = (
        <Box id='table-buttons' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', }}>
            {
                // TODO: Replace with real data array
                // spreadsheetRecords.map((record: Record) => {
                //     return (
                //         <Box key={record.id} id='row-button' sx={{ display: 'flex', flexDirection: 'row' }}>
                //             <Button sx={{ paddingY: rowPadding }}>
                //                 <UnfoldMoreIcon />
                //                 <Typography>
                //                     View
                //                 </Typography>
                //             </Button>
                //             <Button sx={{ paddingY: rowPadding }} onClick={() => { dispatch(showDeleteRecordModal(record)) }}>
                //                 <DeleteOutlineIcon />
                //                 <Typography>Delete</Typography>
                //             </Button>
                //         </Box>
                //     )
                // })
            }
        </Box>
    )

    /**
     * Generate the table representing only the spreadsheet data. Does not include other functionality except for displaying the spreadsheet data itself.
     */
    const table = (
        <Box id='table' sx={{ border: 1, borderRadius: '8px', borderColor: 'black' }}>
            {tableHeader}
            <Box sx={{ display: 'grid', gridTemplateColumns: cellWidth, borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', paddingY: rowPadding }}>
                {columnData.map((data, index) => {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {data.map((cell, index) => {
                                if (index == 0) return (<></>);
                                return (<Typography>{cell}</Typography>);
                            })}
                        </Box>)
                })}
            </Box>
        </Box>
    )

    /**
     * Generate the table into an entire view, including column headers and necessary buttons for viewing and deleting records.
     */
    const tableView = (
        <Box id='table-view-container' sx={{ display: 'block', width: '100%', fontSize: '32px' }}>
            <Box id='table-with-headers' sx={{ display: 'grid', gridTemplateColumns: '90% 10%' }}>
                {table}
                {buttons}
            </Box>
        </Box>
    )

    const addRecordButton = (
        <Button sx={{ border: 1, width: '15%', marginTop: '32px' }} onClick={() => dispatch(showAddRecordModal())}>
            <AddCircleOutlineIcon />
            <Typography>
                Add Record
            </Typography>
        </Button>
    )

    return (
        <Box>
            <DatasourceNavBar />
            <Box sx={{ ...styles.contentContainer, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {tableView}
                {addRecordButton}
            </Box>
        </Box>
    );
}

export default Tableview;