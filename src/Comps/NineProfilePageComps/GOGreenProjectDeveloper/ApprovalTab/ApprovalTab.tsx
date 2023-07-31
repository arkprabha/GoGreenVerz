import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../../../../Header';
import LandQueue from './LandQueue';
import PlantationQueue from './PlantationQueue';
import VVBQueue from './VVBQueue';
import CRIQueue from './CRIQueue';
import GovtAgencyQueue from './GovtAgencyQueue';
import BuyerQueue from './BuyerQueue';
import AdminQueue from './AdminQueue';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ApprovalTab() {
    const [value, setValue] = React.useState(0);

    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Header isConnectedWallet={isConnectedWallet} />
            <Box p={3}>
                <Box>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab
                            label="Added Lands"
                            {...a11yProps(0)}
                            sx={{
                                fontWeight: 'bold',
                                color: 'green',
                            }}
                        />
                        <Tab label="Plantation Partner" {...a11yProps(1)} sx={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}
                        />
                        <Tab label="VVB" {...a11yProps(2)} sx={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}
                        />
                        <Tab label="CRI" {...a11yProps(3)} sx={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}
                        />
                        <Tab label="Govt Agency" {...a11yProps(4)} sx={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}
                        />
                        <Tab label="Admin" {...a11yProps(5)} sx={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}
                        />
                        <Tab label="Buyer" {...a11yProps(6)} sx={{
                            fontWeight: 'bold',
                            color: 'green',
                        }}
                        />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <LandQueue />
                </TabPanel>

                <TabPanel value={value} index={1}>
                 <PlantationQueue />
                </TabPanel>

                <TabPanel value={value} index={2}>
                 <VVBQueue />
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <CRIQueue />
                </TabPanel>

                <TabPanel value={value} index={4}>
                 <GovtAgencyQueue />
                </TabPanel>

                <TabPanel value={value} index={5}>
                    <AdminQueue />
                </TabPanel>

                <TabPanel value={value} index={6}>
                 <BuyerQueue />
                </TabPanel>

            </Box>
        </Box>
    );
}