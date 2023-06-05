import React from 'react';
import { Box, Typography } from '@mui/material';
import './desktop-2.css';
import onejk from '../../assets/-1jk.png';
import png from '../../assets/twoJk.png';
import collection from '../../assets/collection.png';
import Header from '../../Header';

const DesktopComponent2: React.FC = () => {
    return (
        <Box className="desktop-2-HUr">
            <Header />
            <Box className="auto-group-qsb3-GX8">
                <Box className="auto-group-wwau-kSJ">
                    <img className="item-8-Ftr" src={onejk} alt="item-8" />
                    <img className="item-9-BXc" src={png} alt="item-9" />
                    <img className="collection-hVx" src={collection} alt="collection" />
                </Box>
                <Box className="auto-group-jevh-zjx" textAlign='left'>
                    <Typography variant="body1" className="number-of-nfts-3-7Jn">Number of NFT’s = 3</Typography>
                    <Typography variant="body1" className="number-of-trees-15-2Ar"> Number of Trees = 15</Typography>
                    <Typography variant="body1" className="total-value-3-sol-x4W"> Total value = 3 SOL</Typography>
                </Box>
            </Box>
            <Typography variant="body1" className="your-contribution-z1C">Your Contribution</Typography>
        </Box>
    );
};

export default DesktopComponent2;
