import React from 'react';
import { Box,Card,Typography, TextField } from '@mui/material';
import './MRV.css';
import Header from '../../../Header';
import BottomImage from '../../assets/page6.png';

const MRV: React.FC = () => {
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    return (
            <Box className="desktop-6-RwC">
                <img className="line-5-ck6" src={BottomImage} alt="line" />
                <Header  isConnectedWallet={ isConnectedWallet} />
            <Typography className="measuring-and-reporting-AJS">Measuring and Reporting</Typography>
                 <Box className="auto-group-czst-tVL">
                <Box component={Card} bgcolor='#84cb25' width={600} display='flex' justifyContent='center' textAlign='left' flexDirection='column' gap={3} p={3}>
                   <TextField
                    id="standard-basic"
                    fullWidth
                    label='Total returns'
                    InputLabelProps={{
                    style: {
                    color: '#262626',
                    fontSize: 14, // Adjust the label color as needed
                    }
                    }}
                    InputProps={{
                    disableUnderline: true,
                    sx: {
                    bgcolor: 'white',
                    borderRadius: 5,
                    fontSize: 12,
                    color: '#262626',
                    }
                    }}
                    />

<TextField
                    id="standard-basic"
                    fullWidth
                    label='Total investment'
                    InputLabelProps={{
                    style: {
                    color: '#262626',
                    fontSize: 14, // Adjust the label color as needed
                    }
                    }}
                    InputProps={{
                    disableUnderline: true,
                    sx: {
                    bgcolor: 'white',
                    borderRadius: 5,
                    fontSize: 12,
                    color: '#262626',
                    }
                    }}
                    />

<TextField
                    id="standard-basic"
                    fullWidth
                    label='Total revenue'
                    InputLabelProps={{
                    style: {
                    color: '#262626',
                    fontSize: 14, // Adjust the label color as needed
                    }
                    }}
                    InputProps={{
                    disableUnderline: true,
                    sx: {
                    bgcolor: 'white',
                    borderRadius: 5,
                    fontSize: 12,
                    color: '#262626',
                    }
                    }}
                    />


                        <TextField
                    id="standard-basic"
                    fullWidth
                    label='Total tCO2e Sequestered'
                    InputLabelProps={{
                    style: {
                    color: '#262626',
                    fontSize: 14, // Adjust the label color as needed
                    }
                    }}
                    InputProps={{
                    disableUnderline: true,
                    sx: {
                    bgcolor: 'white',
                    borderRadius: 5,
                    fontSize: 12,
                    color: '#262626',
                    }
                    }}
                    />
                    </Box>
                
                </Box>
                
            </Box>
    );
};

export default MRV;
