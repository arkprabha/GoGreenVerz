import React from 'react';
import pagenotfound from '../assets/pagenotfound.png';
import { Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { startUrl } from '../Routes';

function Pagenotfound() {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Container>
                <Box>
                    <img src={pagenotfound} style={{ width: 500, height: 400 }} alt='img' />
                </Box>
                <Box sx={{ py: 5 }}>
                    <Button variant="contained" onClick={() => navigate(startUrl)}>Go to home page</Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Pagenotfound;
