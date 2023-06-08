import React from 'react';
import { Box, Typography } from '@mui/material';
import './desktop-4.css';
import pngengg from '../../assets/pngegg-3-1.png';
import pngwing1 from '../../assets/pngwing-1.png';
import Header from '../../Header';

const DesktopComponent4: React.FC = () => {
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    return (
        <Box className="desktop-4-AX8">
        <Header  isConnectedWallet={ isConnectedWallet} />
            <Typography variant="body1" className="your-carbon-footprint-jXc">Your Carbon Footprint</Typography>
            <Box className="auto-group-ynay-crJ">
                <img className="pngegg-3-1-jAE" src={pngengg} alt="image" />
                <Box className="auto-group-lxus-RHx">
                    <Typography variant="body1" className="co2-footprint-metrics--Lvi">CO2 Footprint Metrics:</Typography>
                    <Box className="auto-group-98hs-F26">
                        <img className="pngwing-1-mFL" src={pngwing1} alt="icon1" />
                        <Box className="rectangle-14-f5p"></Box>
                        <Box className="rectangle-15-Zwt"></Box>
                        <Box className="rectangle-16-6S2"></Box>
                        <Box className="rectangle-17-1ot"></Box>
                        <Box className="rectangle-18-vR4"></Box>
                        <Box className="rectangle-19-q2E"></Box>
                        <Box className="rectangle-20-szW"></Box>
                        <Typography variant="body1" className="emissions-tracking-o7U" sx={{borderRadisu:5}}>Emissions Tracking</Typography>
                        <Typography variant="body1" className="carbon-accounting-gSA">Carbon Accounting</Typography>
                        <Typography variant="body1" className="footprint-analysis-As8">Footprint Analysis</Typography>
                        <Typography variant="body1" className="emissions-monitoring-4Si">Emissions Monitoring</Typography>
                        <Typography variant="body1" className="carbonauditing-KdY">Carbon Auditing</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DesktopComponent4;
