import  React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { get_not_verified_profile_form, methodGet } from '../../../../API_Service/API_Service';
import SnackBar from '../../../SnackBar/SnackBar';

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

interface PlantationData {
  PlantationPartnerId: string;
  PlantationPartnerName: string;
  PlantationPartnerAddress1: string;
  PlantationPartnerAddress2: string;
  PlantationPartnerCity: string;
  PlantationPartnerState: string;
  PlantationPartnerPostalCode: string;
  PlantationPartnerCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  PlantationPartnerStatus: string;
  LandId: string;
}
interface VVBData {
    VVBId: string;
    VVBName: string;
    VVBAddress1: string;
    VVBAddress2: string;
    VVBCity: string;
    VVBState: string;
    VVBPostalCode: string;
    VVBCountry: string;
    MobileNum: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    VirtualVideo: string;
    Remarks: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    VVBStatus: String;
    LandId: string;
}

interface LandItem {
    LandId: string;
    VirtualVideo: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    LandOwnerName: string;
    LandAddress1: string;
    LandAddress2: string;
    LandCity: string;
    LandState: string;
    LandCountry: string;
    MobileNum: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    LandStatus: string;
    LandRemarks: string;
}
interface CRIData {
    CRIId: string;
    CRIName: string;
    CRIAddress1: string;
    CRIAddress2: string;
    CRICity: string;
    CRIState: string;
    CRIPostalCode: string;
    CRICountry: string;
    MobileNum: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    VirtualVideo: string;
    Remarks: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    CRIStatus: string;
    LandId:string;
}


interface AdminData {
    AdminId: string;
    AdminName: string;
    AdminAddress1: string;
    AdminAddress2: string;
    AdminCity: string;
    AdminState: string;
    AdminPostalCode: string;
    AdminCountry: string;
    MobileNum: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    VirtualVideo: string;
    Remarks: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    AdminStatus: string;
    LandId: string;
}

interface BuyerData {
    BuyerId: string;
    BuyerName: string;
    BuyerAddress1: string;
    BuyerAddress2: string;
    BuyerCity: string;
    BuyerState: string;
    BuyerPostalCode: string;
    BuyerCountry: string;
    MobileNum: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    VirtualVideo: string;
    Remarks: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    BuyerStatus: string;
    LandId: string;
}


interface GovAgencyData {
    GovAgencyId: string;
    GovAgencyName: string;
    GovAgencyAddress1: string;
    GovAgencyAddress2: string;
    GovAgencyCity: string;
    GovAgencyState: string;
    GovAgencyPostalCode: string;
    GovAgencyCountry: string;
    MobileNum: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    VirtualVideo: string;
    Remarks: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    GovAgencyStatus: string;
    LandId: string;
}



export default function ApprovalTab() {
    const [value, setValue] = useState(0);

    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const [Loading, setLoading] = useState<boolean>(true);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [color, setColor] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';

    const [LandData, setLandData] = useState<LandItem[]>([]);
    const [PlantationData, setPlantationData] = useState<PlantationData[]>([]);
    const [VVBData, setVVBData] = useState<VVBData[]>([]);
    const [CRIData, setCRIData] = useState<CRIData[]>([]);
    const [GovtData, setGovtData] = useState<GovAgencyData[]>([]);
    const [AdminData, setAdminData] = useState<AdminData[]>([]);
    const [BuyerData, setBuyerData] = useState<BuyerData[]>([]);

    
    const getNotVerifiedLands = () => {
        axios({
            method: methodGet,
            url: get_not_verified_profile_form,
            headers: {
                'Authorization': `Bearer ${UserToken}`,
            }
        }).then(res => {
            if (res.data.error) {
                setMessage(res.data.message)
                setOpen(true)
                setStatus(false)
                setColor(false)
                setLoading(false)
            } else {
                setMessage(res.data.message)
                setOpen(true)
                setStatus(true)
                setColor(true)
                setLandData(res.data.LandOwner);
                setPlantationData(res.data.Plantation);
                setVVBData(res.data.VVB);
                setCRIData(res.data.CRI);
                setGovtData(res.data.GovernmentAgency);
                setAdminData(res.data.Admin);
                setBuyerData(res.data.Buyer);
                setLoading(false)
            }
        }).catch(err => {
            alert('Oops something went wrong ' + err)
        });
    }

    useEffect(() => {
        getNotVerifiedLands();
    }, [])

    return (
        <Box>
            <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
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
                    <LandQueue data={LandData} Loading={Loading} getNotVerifiedLands={getNotVerifiedLands} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <PlantationQueue data={PlantationData} Loading={Loading} getNotVerifiedLands={getNotVerifiedLands} />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <VVBQueue data={VVBData} Loading={Loading} getNotVerifiedLands={getNotVerifiedLands} />
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <CRIQueue data={CRIData} Loading={Loading} getNotVerifiedLands={getNotVerifiedLands} />
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <GovtAgencyQueue data={GovtData} Loading={Loading} getNotVerifiedLands={getNotVerifiedLands} />
                </TabPanel>

                <TabPanel value={value} index={5}>
                    <AdminQueue data={AdminData} Loading={Loading} getNotVerifiedLands={getNotVerifiedLands} />
                </TabPanel>

                <TabPanel value={value} index={6}>
                    <BuyerQueue data={BuyerData} Loading={Loading} getNotVerifiedLands={getNotVerifiedLands} />
                </TabPanel>

            </Box>
        </Box>
    );
}