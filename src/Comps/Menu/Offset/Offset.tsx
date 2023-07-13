import React from 'react';
import { Box, Typography } from '@mui/material';
import './Offset.css';
import pngwing4 from '../../../assets/pngwing-4.png';
import pngwing2 from '../../../assets/pngwing-2.png';
import Header from '../../../Header';

const Offset : React.FC = () => {
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    return (
        <Box className="desktop-4-AX8">
      <Header  isConnectedWallet={ isConnectedWallet} />
            <Typography variant="body1" className="your-carbon-footprint-jXcoff">Carbon offset</Typography>
            <Box className="auto-group-ynay-crJ">
                <img className="pngegg-3-1-jA" src={pngwing4} alt="image" />
                <Box className="auto-group-lxus-RHx">
                    {/* <Typography variant="body1" className="co2-footprint-metrics--Lvi">Offset metrics:</Typography> */}
                    <Box className="auto-group-98hs-F26">
                        <img className="pngwing-1-mFL" src={pngwing2} alt="icon1" />
                        <Box className="rectangle-14-f5p"></Box>
                        <Box className="rectangle-15-Zwt"></Box>
                        <Box className="rectangle-16-6S2"></Box>
                        <Box className="rectangle-17-1ot"></Box>
                        <Box className="rectangle-18-vR4"></Box>
                        <Box className="rectangle-19-q2E"></Box>
                        <Box className="rectangle-20-szW"></Box>
                        <Typography variant="body1" className="emissions-tracking-o7U" sx={{borderRadisu:5}}>Offset Validation</Typography>
                        <Typography variant="body1" className="carbon-accounting-gSA">Emissions Reduction</Typography>
                        <Typography variant="body1" className="footprint-analysis-As8">Offset Calculation</Typography>
                        <Typography variant="body1" className="emissions-monitoring-4Si">Offset Verification</Typography>
                        <Typography variant="body1" className="carbonauditing-KdY">Impact Assessment</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Offset ;

