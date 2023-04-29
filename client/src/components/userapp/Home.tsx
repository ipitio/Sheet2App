import { Box, Typography } from '@mui/material';
import DatasourceNavBar from './DatasourceNavBar';
import { useDispatch } from 'react-redux';

function Home() {
    const dispatch = useDispatch();

    return (
        <Box>
            <DatasourceNavBar />
            <Typography>
                Welcome.
            </Typography>
        </Box>
    );
}

export default Home;