import React from 'react';
import { Box, Typography } from '@mui/material';
import './ProjectTracking.css';
import flag1 from '../../../assets/icon-flag-iDt.png';
import flag2 from '../../../assets/icon-flag-NbY.png';
import flag3 from '../../../assets/icon-flag.png';
import flag4 from '../../../assets/icon-flag-Pca.png';
import flag5 from '../../../assets/icon-flag-sC2.png';
import flag6 from '../../../assets/icon-flag-gSA.png';
import Header from '../../../Header';

const ProjectTracking: React.FC = () => {
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    return (
        <Box className="desktop-3-jKU">
            <Header  isConnectedWallet={ isConnectedWallet} />
            <Typography variant="body1" className="your-project-tracking-ecn">Your Project Tracking</Typography>
            <Box className="auto-group-6581-xNa">
                <Box className="rectangle-10-rD4"></Box>
                <Box className="rectangle-11-m58"></Box>
                <Box className="rectangle-12-GGn"></Box>
                <Box className="rectangle-13-Asx"></Box>
                <Typography variant="body1" className="your-address-6Fp">Your Address</Typography>
                <Typography variant="body1" className="elm-street-apartment-5b-zMC">1234 Elm Street Apartment 5B</Typography>
                <Typography variant="body1" className="your-geotracking-location-gUv">Your Geotracking Location</Typography>
                <Typography variant="body1" className="anytown-usa-Mqx">Anytown, USA</Typography>
            </Box>
            <Box className="auto-group-vue1-SsQ">
                <img className="icon-flag-hHY" src={flag1} alt="icon1" />
                <img className="icon-flag-PgA" src={flag2} alt="icon2" />
                <img className="icon-flag-tsp" src={flag3} alt="icon3" />
                <img className="icon-flag-QbG" src={flag4} alt="icon4" />
                <img className="icon-flag-81U" src={flag5} alt="icon5" />
                <img className="icon-flag-E4W" src={flag6} alt="icon6" />
              
            </Box>
        </Box>
    );
};

export default ProjectTracking;
