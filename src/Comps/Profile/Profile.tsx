import Typography from '@mui/material/Typography';
import { Box, Card, Grid } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContactsIcon from '@mui/icons-material/Contacts';
import LandscapeIcon from '@mui/icons-material/Landscape';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Header from '../../Header';

export default function Profile() {
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    return (
        <>
            <Header isConnectedWallet={isConnectedWallet} />
            <Box className='pageSizeandBack'>
                <Box mx={3} mt={2} mb={2}>
                    <Grid container spacing={4} rowSpacing={4} mb={1}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Box component={Card} boxShadow={5} p={4} alignItems='center'
                                display='flex' flexDirection='row' bgcolor='#FFFFFF'>
                                <Box>
                                    <img alt='profile' src='https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg'
                                        style={{ objectFit: 'contain', width: 100, height: 100, borderRadius: 10 }} />
                                </Box>
                                <Box px={2}>
                                    <Typography color='#28313c' fontWeight={600} fontSize={17}>VijayaPrasath</Typography>
                                        <Typography color='#616e80' fontSize={16}>Land Owner</Typography>
                                        <Typography color='#616e80' variant='subtitle1'>Customer Id : #XXXX</Typography>
                                </Box>
                            </Box>

                                <Box mt={2} component={Card} boxShadow={5} p={2} bgcolor='#FFFFFF' display='flex' justifyContent='space-between' flexDirection='column'>
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                        <Typography fontWeight={600} color='#28313c' fontSize={17}>Lands Status</Typography>
                                    <Box alignSelf='center'>
                                        <LandscapeIcon sx={{ color: '#616e80' }} fontSize='large' />
                                    </Box>
                                </Box>
                                <Box display='flex' flexDirection='row' mt={5} justifyContent='space-around'>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Active</Typography>
                                            <Typography color='#84cb25' fontSize={16}>1</Typography>                                       
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>In Review</Typography>
                                            <Typography color='#84cb25' fontSize={16}>1</Typography>                                        
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>On Hold</Typography>
                                            <Typography color='#84cb25' fontSize={16}>1</Typography>                                      
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Sold</Typography>
                                            <Typography color='#84cb25' fontSize={16}>1</Typography>                                     
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#c2312f' fontSize={16}>Expired</Typography>
                                            <Typography color='#c2312f' fontSize={16}>1</Typography>                                      
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Box component={Card} boxShadow={5} bgcolor='#FFFFFF' p={3} display='flex' justifyContent='space-between' flexDirection='column'>
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                        <Typography fontWeight={600} color='#28313c' fontSize={17}>Lands</Typography>
                                    <Box alignSelf='center'>
                                        <FormatListBulletedIcon sx={{ color: '#616e80' }} fontSize='large' />
                                    </Box>
                                </Box>
                                <Box display='flex' flexDirection='row' mt={6} justifyContent='space-around'>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Listed Lands</Typography>
                                            <Typography color='#84cb25' fontSize={16}>4</Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Add Lands</Typography>
                                            <Typography color='#84cb25' fontSize={16}><PlaylistAddIcon fontSize='large' sx={{ verticalAlign: "middle" }} /></Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Update Lands</Typography>
                                            <Typography color='#84cb25'><UpgradeIcon fontSize='large' sx={{verticalAlign:"middle"}} /></Typography>
                                    </Box>
                                </Box>

                            </Box>

                                <Box mt={2} component={Card} boxShadow={5} bgcolor='#FFFFFF' p={2} display='flex' justifyContent='space-between' flexDirection='column'>
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                        <Typography fontWeight={600} color='#28313c' fontSize={17}>Contact</Typography>
                                    <Box alignSelf='center'>
                                        <ContactsIcon sx={{ color: '#616e80' }} fontSize='large' />
                                    </Box>
                                </Box>
                                <Box display='flex' flexDirection='row' mt={5} justifyContent='space-around'>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Phone Number</Typography>
                                            <Typography color='#84cb25' fontSize={16}>9887263452</Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Email</Typography>
                                            <Typography color='#84cb25' fontSize={16}>XXXX@gmail.com</Typography>
                                    </Box>
                                    <Box textAlign='center'>
                                            <Typography color='#3860b5' fontSize={16}>Address</Typography>
                                            <Typography color='#84cb25' fontSize={16}>XXXX, XXX , XXX</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </>
    );
}