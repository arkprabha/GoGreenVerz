import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    Box,
    Card,
    Grid,
    Stack,
    Typography,
    IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get_user_status_count, methodPost, update_user } from '../../../API_Service/API_Service';
import axios from 'axios';
import { appendData } from "../../../Variables/ProcessVariable";
import SnackBar from "../../SnackBar/SnackBar";
import Header from '../../../Header';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContactsIcon from '@mui/icons-material/Contacts';
import LandscapeIcon from '@mui/icons-material/Landscape';
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ProfileRoutes from './ProfileRoutes';
import CloseIcon from '@mui/icons-material/Close';

export default function ProfileUpdateForm() {


    const [open, setOpen] = useState < boolean > (false);
    const [status, setStatus] = useState < boolean > (false);
    const [color, setColor] = useState < boolean > (false);
    const [message, setMessage] = useState < string > ('');
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';
    const navigate = useNavigate();
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserProfileTypeId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';
    const UserProfileType: string | null = localStorage.getItem('UserProfileType') ?? '';
    const [UserName, setUserName] =  useState < string > ('');
    const [UserPhone, setUserPhone] =  useState < string > ('');
   const [ExistingUserPhone, setExistingUserPhone] = useState<string>('');
    const [UserMail, setUserMail] =  useState < string > ('');
     const [ExistingUserMail, setExistingUserMail] = useState<string>('');
    const [UserAddress, setUserAddress] =  useState < string > ('');
    const [UserCity, setUserCity] =  useState < string > ('');
    const [UserState, setUserState] =  useState < string > ('');
    const [UserPostalCode, setUserPostalCode] =  useState < string > ('');
    const [UserCountry, setUserCountry] =  useState < string > ('');
    const [UserUniqueId, setUserUniqueId] = useState<string>('');
    const [StatusData, setStatusData] = useState<any>([]);
    const [ShowUpdateUserName, setShowUpdateUserName] = useState<boolean>(false);
    const [ShowUpdateUserPhone, setShowUpdateUserPhone] = useState<boolean>(false);
    const [ShowUpdateUserMail, setShowUpdateUserMail] = useState<boolean>(false);
    const [ShowUpdateUserAddress, setShowUpdateUserAddress] = useState<boolean>(false);
    // const [ShowUpdateUserAddress, setShowUpdateUserAddress] = useState<boolean>(false);

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
                    setOpen(true);
                    setStatus(true);
                    setColor(true);
                  setUserName(res.data.Data.UserName)
                  setUserPhone(res.data.Data.UserMobile)
                  setExistingUserPhone(res.data.Data.UserMobile)
                  setUserMail(res.data.Data.UserEmail)
                  setExistingUserMail(res.data.Data.UserEmail)
                  setUserAddress(res.data.Data.UserAddress)
                  setUserCity(res.data.Data.UserCity)
                  setUserState(res.data.Data.UserState)
                  setUserPostalCode(res.data.Data.UserPinCode)
                  setUserCountry(res.data.Data.UserCountry)        
                  setUserUniqueId(res.data.Data.UserUniqueId) 
                  setStatusData(res.data.Status);    
                }
            })
            .catch((err) => {
                alert('Oops something went wrong ' + err);
            });
    }, []);

    const handleSubmit = () => {
        const obj = {
            UserName: UserName,
            UserPhone: ExistingUserPhone === UserPhone ? '' : UserPhone,
            UserMail: ExistingUserMail === UserMail ? '' : UserMail ,
            UserAddress: UserAddress,
            UserCity: UserCity,
            UserState: UserState,
            UserPostalCode: UserPostalCode,
            UserCountry: UserCountry,
            UserProfileTypeId: UserProfileTypeId,
            UserId:UserId
        };
        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_user, // Replace with your API URL
            data: sendData,
        })
            .then((res) => {
                if (res.data.error) {
                    setMessage(res.data.message);
                    setOpen(true);
                    setStatus(false);
                    setColor(false);
                } else {
                    setMessage(res.data.message);
                    setOpen(true);
                    setStatus(true);
                    setColor(true);
                    setShowUpdateUserPhone(false);
                    setShowUpdateUserAddress(false);
                    setShowUpdateUserMail(false);
                    setShowUpdateUserName(false);
                }
            })
            .catch((err) => {
                alert('Oops something went wrong ' + err);
            });
    };

    const totalFormCount = Object.keys(StatusData).reduce((total, key) => total + StatusData[key].length, 0);

    const ShowUserPhoneField = () => { setShowUpdateUserPhone(true)}
    const ShowUserMailField = () => { setShowUpdateUserMail(true) }
    const ShowUserAddressField = () => { setShowUpdateUserAddress(true) }
    const ShowUserNameField = () => { setShowUpdateUserName(true) }


  const CloseUserPhoneField = () => { setShowUpdateUserPhone(false) }
  const CloseUserMailField = () => { setShowUpdateUserMail(false) }
  const CloseUserAddressField = () => { setShowUpdateUserAddress(false) }
  const CloseUserNameField = () => { setShowUpdateUserName(false) }

    return (
      <Box>
    <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
      <Header isConnectedWallet={isConnectedWallet} />
      <Box p={3} my={1}>
          <Box display='flex' justifyContent='end' py={2}>
            <Button variant='outlined' color='error' onClick={() => navigate('/profile')} >Cancel</Button>
          </Box>
        <Grid container spacing={4} rowSpacing={4}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box
              component={Card}
              p={4}
              boxShadow={5}
              alignItems="center"
              display="flex"
              flexDirection="row"
              bgcolor='#008080'
            >
              <Box mt={2}>
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
                <Box >
                <IconButton
                aria-label="upload"
                component="label"
                >
                <EditIcon  />
                <TextField
                hidden
                id="profilePicUpload"
                type="file"
                sx={{display:'none'}}
                />
                </IconButton>
                </Box>

              </Box>
                <Box px={2}>
                {
                !ShowUpdateUserName ?
                <Typography color="#F9F9F8" fontWeight={600} fontSize={17}>
                {UserName} <EditIcon color='warning' onClick={ShowUserNameField} sx={{ verticalAlign: 'middle' }} />
                </Typography>
                :
                <Box display="flex" flexDirection="row" gap={1}>
                <TextField
                autoComplete="given-name"
                name="UserName"
                fullWidth
                id="firstName"
                label="Your Full Name"
                autoFocus
                size='small'
                color='secondary'
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                />
                <Box display="flex" flexDirection="column" gap={1} >
                <DoneAllIcon color='warning' onClick={handleSubmit} sx={{ verticalAlign: 'middle' }} />
                <CloseIcon onClick={CloseUserNameField} color='error' sx={{ verticalAlign: 'middle' }} />
                </Box>
                </Box>
                }

                <Typography color="#F9F9F8" variant="subtitle1">
                  {UserProfileType}
                </Typography>
                <Typography color="#ACE1AF" variant="caption">
                Customer Id : {UserUniqueId}
                </Typography>
                </Box>
               </Box>

            <Box
              mt={1}
              mb={2}
              component={Card}
              boxShadow={5}
              p={2}
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              bgcolor='#008080'
            >
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Typography color="#F9F9F8" fontWeight={600}>Status</Typography>
                <Box alignSelf="center">
                  <LandscapeIcon sx={{ color: '#F9F9F8' }} fontSize="large" />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                mt={6}
                justifyContent="space-evenly"
              >
                  {Object.keys(StatusData).map((key) => (
                    <Box textAlign="center" key={key}>
                      <Typography color="#F9F9F8">{key}</Typography>
                      <Typography color={key !== 'Expired' ? "#ACE1AF" : "#c2312f"}>{StatusData[key].length}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box
              component={Card}
              boxShadow={5}
              p={3}
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              bgcolor='#008080'
            >
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                mb={4}
              >
                <Typography fontWeight={600} color="#F9F9F8">Work</Typography>
                <Box alignSelf="center">
                  <FormatListBulletedIcon
                    sx={{ color: '#F9F9F8' }}
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
              boxShadow={5}
              p={2}
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              bgcolor='#008080'
            >
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Typography fontWeight={600} color="#F9F9F8">Contact</Typography>
                <Box alignSelf="center">
                  <ContactsIcon sx={{ color: '#F9F9F8' }} fontSize="large" />
                </Box>
              </Box>
              <Box mt={6}>
                <Grid
                  container
                  spacing={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-evenly"
                >
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box textAlign="center">
                        {
                            !ShowUpdateUserPhone ?
                     
                     <Stack spacing={1}>
                     <Typography color="#F9F9F8">Phone Number</Typography>
                      <Typography color="#ACE1AF" variant="subtitle2">
                      {UserPhone} <EditIcon color='warning' onClick={ShowUserPhoneField} sx={{ verticalAlign: 'middle' }} />
                      </Typography>
                      </Stack>
                     :
                    <Box display="flex" flexDirection="row" gap={1}>
                    <TextField
                    fullWidth
                    id="phno"
                    label="Phone Number"
                    name="UserPhone"
                    type='tel'
                    size='small'
                    value={UserPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    />
                              <Box display="flex" flexDirection="column" gap={1} >
                                <DoneAllIcon color='warning' onClick={handleSubmit} sx={{ verticalAlign: 'middle' }} />
                                <CloseIcon onClick={CloseUserPhoneField} color='error' sx={{ verticalAlign: 'middle' }} />
                              </Box>
                    </Box>
                    }
                    </Box>
                  </Grid>

                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box textAlign="center" >
                    {
                    !ShowUpdateUserMail ?
                    <Stack spacing={1}>
                    <Typography color="#F9F9F8">Email</Typography>
                    <Typography color="#ACE1AF" variant="subtitle2" sx={{wordWrap:'break-word'}}>
                    {UserMail} <EditIcon color='warning' onClick={ShowUserMailField} sx={{ verticalAlign: 'middle' }} />
                    </Typography>
                   </Stack>
                    :
                    <Box display="flex" flexDirection="row" gap={1}>
                    <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="UserMail"
                    autoComplete="email"
                    size='small'
                    color='secondary'
                    value={UserMail}
                    onChange={(e) => setUserMail(e.target.value)}
                    />
                              <Box display="flex" flexDirection="column" gap={1} >
                                <DoneAllIcon color='warning' onClick={handleSubmit} sx={{ verticalAlign: 'middle' }} />
                                <CloseIcon onClick={CloseUserMailField} color='error' sx={{ verticalAlign: 'middle' }} />
                              </Box>
                    </Box>
                    }
                    </Box>
                  </Grid>

                    <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box textAlign="center">
                    {
                    !ShowUpdateUserAddress ?

                    <Stack spacing={1}>
                    <Typography color="#F9F9F8">Address</Typography>
                    <Typography color="#ACE1AF" variant="subtitle2">
                    {UserCity}, {UserState} <EditIcon color='warning' onClick={ShowUserAddressField} sx={{ verticalAlign: 'middle' }} />
                    </Typography>
                    </Stack>
                    :
                    <Box display="flex" flexDirection="row" gap={1}>
                    <Box display="flex" flexDirection="column" gap={1}>
                    <TextField
                    fullWidth
                    id="Address"
                    label="City"
                    name='UserCity'
                    type="text"
                    variant="outlined"
                    size='small'
                    color='secondary'
                    value={UserCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    />
                    <TextField
                    fullWidth
                    id="Address"
                    label="State"
                    name='UserState'
                    type="text"
                    variant="outlined"
                    size='small'
                    color='secondary'
                    value={UserState}
                    onChange={(e) => setUserState(e.target.value)}
                    />
                    </Box>
                              <Box display="flex" flexDirection="column" gap={1} >
                                <DoneAllIcon color='warning' onClick={handleSubmit} sx={{ verticalAlign: 'middle' }} />
                                <CloseIcon onClick={CloseUserAddressField} color='error' sx={{ verticalAlign: 'middle' }} />
                              </Box>
                    </Box>
                    }
                    </Box>
                    </Grid>

                </Grid>

              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
    );
}