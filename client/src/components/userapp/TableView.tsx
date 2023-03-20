import { Box, Button, Divider, Typography } from '@mui/material';
import { View } from '../../store/StoreTypes';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { IS2AState, IWebAppState, showAddRecordModal } from '../../store/StoreContext';

interface TableViewProps extends View { }

// TODO: GET RID OF THE ANY TYPE FOR TABLE PROPS. THIS IS JUST FOR TESTING
function TableView(props: TableViewProps | any) {
    const store = useStore();
    const dispatch = useDispatch();
    
    // TODO: Make API call to the spreadsheet URL
    // let spreadsheetData = api.get
    // let columnName = spreadsheetData[0] // Since the spreadsheet is passed back as a 2d list, the first element (row-wise) contains all of the columns

    let testColumnHeader: string[] = ['Name', 'Age', 'Favorite Fruit', 'Occupation', 'Favorite Color']
    let testSpreadsheetData = [['Jane', '32', 'Pear', 'Engineer', 'Blue'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor'], ['Jane', '32', 'Pear', 'Engineer'], ['Joe', '42', 'Apple', 'Doctor']]

    // Find the percentage of space each cell should take in a row. This assumes that all cells take an even amount of space with the other cells.
    const cellWidthPercentage: string = (100 / testSpreadsheetData[0].length) + '%'

    // Determine the dimensions of the table cells.
    const cellWidth = `repeat(${testSpreadsheetData[0].length}, ${cellWidthPercentage})`

    // Constant to determine the spacing between each row. Change as necessary.
    const rowPadding: string = '8px'

    /**
     * Parse the spreadsheet data into rows
     */
    const spreadsheetData = testSpreadsheetData.map((row, index) => {
        // Alternate table row colors for visual clarity
        const bgColor = index % 2 === 0 ? '#E0E0E0' : '#FFFFFF';

        // Make the last row have a rounded bottom border. This prevents it from overlapping with the table border
        const rounded = index == testSpreadsheetData.length - 1 ? '8px' : '0px'

        return (
            // Iterate through each row and return a graphical representation of the data in the table
            <Box
                className='table-row'
                sx={{
                    display: 'grid',
                    gridTemplateColumns: cellWidth,
                    bgcolor: bgColor,
                    borderBottomLeftRadius: rounded,
                    borderBottomRightRadius: rounded,
                    paddingY: rowPadding
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
     * Frontend component for table header (column names)
     */
    const tableHeader = (
        <Box>
            <Box
                id='table-header'
                sx={{
                    display: 'grid',
                    gridTemplateColumns: cellWidth,
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
        </Box>
    )

    /**
     * Frontend component for table view buttons (adding record and deleting record)
     */
    const buttons = (
        <Box
            id='table-buttons'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}
        >
            {
                Array(testSpreadsheetData.length).fill(
                    <Box
                        id='row-button'
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Button
                            sx={{
                                paddingY: rowPadding
                            }}
                        >
                            <UnfoldMoreIcon />
                            <Typography>
                                View
                            </Typography>
                        </Button>
                        <Button
                            sx={{
                                paddingY: rowPadding
                            }}
                        >
                            <DeleteOutlineIcon />
                            <Typography>
                                Delete
                            </Typography>
                        </Button>
                    </Box>
                )
            }
        </Box>
    )

    /**
     * Generate the table representing only the spreadsheet data. Does not include other functionality except for displaying the spreadsheet data itself.
     */
    const table = (
        <Box
            id='table'
            sx={{
                border: 1,
                borderRadius: '8px',
                borderColor: 'black'
            }}
        >
            {tableHeader}
            {spreadsheetData}
        </Box>
    )

    /**
     * Generate the table into an entire view, including column headers and necessary buttons for viewing and deleting records.
     */
    const tableView = (
        <Box
            id='table-view-container'
            sx={{
                display: 'block',
                width: '100%',
                fontSize: '32px',
            }}
        >
            <Box
                id='table-with-headers'
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '90% 10%'
                }}
            >
                {table}
                {buttons}
            </Box>
        </Box>
    )

    const addRecordButton = (
        <Button
            sx={{
                border: 1,
                width: '15%',
                marginTop: '32px'
            }}
            onClick={ 
                () => dispatch(showAddRecordModal())
            }
        >
            <AddCircleOutlineIcon />
            <Typography>
                Add Record
            </Typography>
        </Button>
    )

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {tableView}
            {addRecordButton}
        </Box>
    );
}

export default TableView;