import Typography from '@mui/material/Typography';
import { Box, Card, Container, Grid } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContactsIcon from '@mui/icons-material/Contacts';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Header from '../../Header';
import { useNavigate } from 'react-router-dom';

export default function LandOwnerProfile() {
       const navigate = useNavigate();
        const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    return (
        <>
             <Header  isConnectedWallet={isConnectedWallet} />
                <Box p={3}>
                    <Grid container spacing={4} rowSpacing={4}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Box component={Card} p={4} alignItems='center'
                                display='flex' flexDirection='row'>
                                <Box>
                                    <img alt='profile' src='https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg'
                                        style={{ objectFit: 'contain', width: 100, height: 100, borderRadius: 10 }} />
                                </Box>
                                <Box px={2}>
                                    <Typography color='#28313c' fontWeight={600} fontSize={17}>VijayaPrasath</Typography>
                                    <Typography color='#616e80' variant='subtitle1'>Land Owner</Typography>
                                    <Typography color='#616e80' variant='caption'>Customer Id : LO23-1</Typography>
                                </Box>
                            </Box>

                            <Box mt={1} mb={2} component={Card} p={2} display='flex' justifyContent='space-between' flexDirection='column'>
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                    <Typography fontWeight={600}>Lands Status</Typography>
                                    <Box alignSelf='center'>
                                        <LandscapeIcon sx={{ color: '#616e80' }} fontSize='large' />
                                    </Box>
                                </Box>
                                <Box display='flex' flexDirection='row' mt={5} justifyContent='space-around'>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Active</Typography>
                                        <Typography color='#84cb25'>1</Typography>                                       
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>In Review</Typography>
                                        <Typography color='#84cb25'>1</Typography>                                        
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>On Hold</Typography>
                                        <Typography color='#84cb25'>1</Typography>                                      
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Sold</Typography>
                                        <Typography color='#84cb25'>1</Typography>                                     
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#c2312f'>Expired</Typography>
                                        <Typography color='#c2312f'>1</Typography>                                      
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Box component={Card} p={3} display='flex' justifyContent='space-between' flexDirection='column'>
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                    <Typography fontWeight={600}>Lands</Typography>
                                    <Box alignSelf='center'>
                                        <FormatListBulletedIcon sx={{ color: '#616e80' }} fontSize='large' />
                                    </Box>
                                </Box>
                                <Box display='flex' flexDirection='row' mt={3} justifyContent='space-around'>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Listed Lands</Typography>
                                        <Typography color='#84cb25'>4</Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Add Lands</Typography>
                                        <Typography color='#84cb25'><AddCircleOutlineIcon onClick={()=>navigate('/addyourlands')}  /></Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Update Lands</Typography>
                                        <Typography color='#84cb25'><UpgradeIcon onClick={()=>navigate('/listedlands')} /></Typography>
                                    </Box>
                                </Box>

                            </Box>

                        <Box mt={1} mb={2} component={Card} p={2} display='flex' justifyContent='space-between' flexDirection='column'>
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                    <Typography fontWeight={600}>Contact</Typography>
                                    <Box alignSelf='center'>
                                        <ContactsIcon sx={{ color: '#616e80' }} fontSize='large' />
                                    </Box>
                                </Box>
                                <Box display='flex' flexDirection='row' mt={5} justifyContent='space-around'>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Phone Number</Typography>
                                        <Typography color='#84cb25'>9887263452</Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Email</Typography>
                                        <Typography color='#84cb25'>XXXX@gmail.com</Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                        <Typography color='#3860b5'>Address</Typography>
                                        <Typography color='#84cb25'>XXXX, XXX , XXX</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

        </>
    );
}