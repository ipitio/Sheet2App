import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import DatasourceNavBar from './DatasourceNavBar';
import { useDispatch } from 'react-redux';

function Home() {
    const dispatch = useDispatch();

    return (
        <Box>
            <DatasourceNavBar />
        </Box>
    );
}

export default Home;