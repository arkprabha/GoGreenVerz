import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    Grid,
    Typography,
    Button
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContactsIcon from '@mui/icons-material/Contacts';
import LandscapeIcon from '@mui/icons-material/Landscape';
import Header from '../../../Header';
import { get_user_status_count, methodPost } from '../../../API_Service/API_Service';
import SnackBar from '../../SnackBar/SnackBar';
import ProfileRoutes from './ProfileRoutes';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';

interface UserData {
    UserName: string;
    UserMobile: string;
    UserEmail: string;
    UserCity: string;
    UserState: string;
    UserUniqueId:string;
}

export default function AllUserProfile() {
    const [userData, setUserData] = useState < UserData | null > (null);
    const [StatusData, setStatusData] =  useState<any>([]);
    const [open, setOpen] = useState < boolean > (false);
    const [status, setStatus] = useState < boolean > (false);
    const [color, setColor] = useState < boolean > (false);
    const [message, setMessage] = useState < string > ('');
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';
    const UserProfileTypeId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';
    const UserProfileType: string | null = localStorage.getItem('UserProfileType') ?? '';
    const navigate = useNavigate();


    useEffect(() => {
        const lData = new FormData();
        lData.append('UserId', UserId!);
        lData.append('UserProfileTypeId', UserProfileTypeId!);

        axios({
            method: methodPost,
            url: get_user_status_count,
            data: lData,
            headers: {
                'Authorization': `Bearer ${UserToken}`,
            },
        })
            .then((res) => {
                if (res.data.error) {
                    setMessage(res.data.message);
                    setOpen(true);
                    setStatus(false);
                    setColor(false);
                } else {
                    setMessage(res.data.message);
                    setUserData(res.data.Data);
                    setStatusData(res.data.Status);
                    setOpen(false)
                    setStatus(true);
                    setColor(true);
                }
            })
            .catch((err) => {
                alert('Oops something went wrong ' + err);
            });
    }, []);

    const totalFormCount = Object.keys(StatusData).reduce((total, key) => total + StatusData[key].length, 0);

    return (
        <>
            <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
            <Header isConnectedWallet={isConnectedWallet} />
            <Box p={3} my={1}>
                <Box display='flex' justifyContent='end' py={2}>
                    <Button variant='outlined' sx={{ color: '#004953', borderColor:'#004953'}}  onClick={()=>navigate('/editprofile')} >Edit Profile <BorderColorIcon fontSize='small' sx={{verticalAlign:'middle' , ml:1}} /></Button>
                </Box>
                
                <Grid container spacing={4} rowSpacing={4}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Box
                            component={Card}
                            p={4}
                            boxShadow={8}
                            alignItems="center"
                            display="flex"
                           justifyContent='space-between'
                            bgcolor='#C8CDC2'
                        >
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                            >
                                <img
                                    alt="profile"
                                    src="https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg"
                                    style={{
                                        objectFit: 'contain',
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                    }}
                                />
                           
                            <Box px={2}>
                                <Typography color="#455636" fontWeight={600} fontSize={17}>
                                    {userData?.UserName}
                                </Typography>
                                <Typography color="#455636" variant="subtitle1">
                                    {UserProfileType}
                                </Typography>
                                <Typography color="#808000" variant="caption">
                                    Customer Id : {userData?.UserUniqueId}
                                </Typography>
                            </Box>
                            </Box>
                            <Box alignSelf="start">
                                <AccountBoxIcon sx={{ color: '#455636' }} fontSize="large" />
                            </Box>
                        </Box>
                        <Box
                            mt={1}
                            mb={2}
                            component={Card}
                            boxShadow={8}
                            p={2}
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="column"
                            bgcolor='#C8CDC2'
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                flexDirection="row"
                            >
                                <Typography color="#455636" fontWeight={600}>Status</Typography>
                                <Box alignSelf="center">
                                    <LandscapeIcon sx={{ color: '#455636' }} fontSize="large" />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="row"
                                mt={5}
                                justifyContent="space-evenly"
                            >
                                {Object.keys(StatusData).map((key) => (
                                    <Box textAlign="center" key={key}>
                                    <Typography color="#455636">{key}</Typography>
                                    <Typography color={key !== 'Expired' ? "#808000" : "#c2312f" }>{StatusData[key].length}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Box
                            component={Card}
                            boxShadow={8}
                            p={3}
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="column"
                            bgcolor='#C8CDC2'
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                flexDirection="row"
                            >
                                <Typography fontWeight={600} color="#455636">Work</Typography>
                                <Box alignSelf="center">
                                    <FormatListBulletedIcon
                                        sx={{ color: '#455636' }}
                                        fontSize="large"
                                    />
                                </Box>
                            </Box>
                            <ProfileRoutes totalFormCount={totalFormCount} />
                        </Box>

                        <Box
                            mt={1}
                            mb={2}
                            component={Card}
                            boxShadow={8}
                            p={2}
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="column"
                            bgcolor='#C8CDC2'
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                flexDirection="row"
                            >
                                <Typography fontWeight={600} color="#455636">Contact</Typography>
                                <Box alignSelf="center">
                                    <ContactsIcon sx={{ color: '#455636' }} fontSize="large" />
                                </Box>
                            </Box>
                            <Box mt={5}>
                                <Grid
                                    container
                                    spacing={2}
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-evenly"
                                >
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <Box textAlign="center" display="flex" flexDirection="column" >
                                            <Typography color="#455636">Phone Number</Typography>
                                            <Typography color="#808000" variant="subtitle2">
                                                {userData?.UserMobile}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <Box textAlign="center" display="flex" flexDirection="column">
                                            <Typography color="#455636">Email</Typography>
                                            <Typography color="#808000" variant="subtitle2">
                                                {userData?.UserEmail}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <Box textAlign="center" display="flex" flexDirection="column">
                                            <Typography color="#455636">Address</Typography>
                                            <Typography color="#808000" variant="subtitle2">
                                                {userData?.UserCity}, {userData?.UserState}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
