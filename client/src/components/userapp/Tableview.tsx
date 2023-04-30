import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useDispatch, useSelector } from 'react-redux';
import store, { StoreState, setCurrentRecordIndex, setFirstRecordColumns, showAddRecordModal, showDeleteRecordModal } from '../../store/StoreContext';
import { useEffect, useState } from 'react';
import DatasourceNavBar from './DatasourceNavBar';
import styles from '../../styles/userapp/containers/ContentContainers'
import { loadTableview } from '../../store/StoreController';

function Tableview() {
    const dispatch = useDispatch<typeof store.dispatch>();

    const [records, setRecords] = useState<any[][]>([]);

    const columns = useSelector((state: StoreState) => state.webAppReducer.columns);
    const columnData = useSelector((state: StoreState) => state.webAppReducer.columnData);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isLoading) return;

        dispatch(loadTableview())
            .then(() => {
                /** Convert columns into records */
                const newRecords = [];
                const columnKeys = Object.keys(columnData) as unknown as number[];
                const firstRecordColumns = [];

                for (let i = 1; i < columnData[columnKeys[0]].length; i++) {
                    let currRecord = [];
                    for (let j = 0; j < columnKeys.length; j++) {
                        console.log(columns[j]);
                        if (i == 1 && columns[j].editable) {
                            /** Store the data for the first detail view */
                            firstRecordColumns.push(columns[j]);
                        }

                        currRecord.push(columnData[columnKeys[j]][i]);
                    }
                    newRecords.push(currRecord);
                }
                
                dispatch(setFirstRecordColumns(firstRecordColumns));
                setRecords(newRecords);
                setIsLoading(false);
            })
    })

    const columnNames = columns.map((col) => { return col.name });

    // Find the percentage of space each cell should take in a row. This assumes that all cells take an even amount of space with the other cells.
    const cellWidthPercentage: string = (100 / (records && records[0] ? records[0].length : 1)) + '%'

    // Determine the dimensions of the table cells.
    const cellWidth = `repeat(${(records && records[0] ? records[0].length : 1)}, ${cellWidthPercentage})`

    // Constant to determine the spacing between each row. Change as necessary.
    const rowPadding: string = '8px'

    const handleShowDeleteModal = (index: number) => {
        dispatch(setCurrentRecordIndex(index));
        dispatch(showDeleteRecordModal());
    }

    const buttons = (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {records.map((record, index) => {
                return (
                    <Box id='row-button' sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Button sx={{ paddingY: rowPadding }}>
                            <UnfoldMoreIcon />
                            <Typography>
                                View
                            </Typography>
                        </Button>
                        <Button sx={{ paddingY: rowPadding }} onClick={() => { handleShowDeleteModal(index) }}>
                            <DeleteOutlineIcon />
                            <Typography>
                                Delete
                            </Typography>
                        </Button>
                    </Box>
                )
            })}
        </Box>
    )

    const table = (
        <Box id='table' sx={{ border: 1, borderRadius: '8px', borderColor: 'black' }}>

            {/** Table Headers */}
            <Box>
                <Box id='table-header' sx={{ display: 'grid', gridTemplateColumns: cellWidth, gridColumn: '1' }}>
                    {columnNames.map((columnHeader) => {
                        return (
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '32px' }}>{columnHeader}</Typography>
                        )
                    })}
                </Box>
                <Divider sx={{ bgcolor: 'black' }} />
            </Box>

            {/** Table Data */}
            {records.map((record, index) => {
                // Alternate table row colors for visual clarity
                const bgColor = index % 2 === 0 ? '#E0E0E0' : '#FFFFFF';

                // Make the last row have a rounded bottom border. This prevents it from overlapping with the table border
                const rounded = index == records.length - 1 ? '8px' : '0px'

                return (
                    <Box sx={{ display: 'grid', gridTemplateColumns: cellWidth, bgcolor: bgColor, borderBottomLeftRadius: rounded, borderBottomRightRadius: rounded, paddingY: rowPadding }}>
                        {record.map((entry) => {
                            return (
                                <Typography sx={{ textAlign: 'center' }}>{entry}</Typography>
                            )
                        })}
                    </Box>
                )
            })
            }
        </Box>
    )

    const tableView = (
        <Box id='table-view-container' sx={{ display: 'block', width: '100%', fontSize: '32px' }}>
            <Box id='table-with-headers' sx={{ display: 'grid', gridTemplateColumns: '90% 10%' }}>
                {table}
                {buttons}
            </Box>
        </Box>
    )

    const addRecordButton = (
        <Button startIcon={<AddCircleOutlineIcon />} sx={{ border: 1, width: '15%', marginTop: '32px', bgcolor: '#1976d2', color: 'white', '&:hover': { 'background': "#0062A5" } }} onClick={() => dispatch(showAddRecordModal())}>
            <Typography>
                Add Record
            </Typography>
        </Button>
    )

    return (
        <Box>
            <DatasourceNavBar />
            {isLoading ? <CircularProgress sx={styles.contentContainer} /> :
                <Box sx={{ ...styles.contentContainer, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {tableView}
                    {addRecordButton}
                </Box>
            }
        </Box>
    );
}

export default Tableview;