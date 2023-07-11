import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Grid,
  Typography
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContactsIcon from '@mui/icons-material/Contacts';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Header from '../../Header';
import { get_user, methodPost } from '../../API_Service/API_Service';
import SnackBar from '../SnackBar/SnackBar';

interface UserData {
  UserName: string;
  UserMobile: string;
  UserEmail: string;
  UserCity: string;
  UserState: string;
}

export default function InvestorProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
  const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  const UserId: string | null = localStorage.getItem('UserId') ?? '';
  const UserProfileTypeId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';
  const navigate = useNavigate();

  useEffect(() => {
    const lData = new FormData();
    lData.append('UserId', UserId!);
    lData.append('UserProfileTypeId', UserProfileTypeId!);

    axios({
      method: methodPost,
      url: get_user,
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
          setUserData(res.data.data);
          setOpen(true);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert('Oops something went wrong ' + err);
      });
  }, []);

  return (
    <>
     <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
      <Header isConnectedWallet={isConnectedWallet} />
      <Box p={3} my={2}>
        <Grid container spacing={4} rowSpacing={4}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box
              component={Card}
              boxShadow={5}
              p={4}
              alignItems="center"
              display="flex"
              flexDirection="row"
            >
              <Box>
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
              </Box>
              <Box px={2}>
                <Typography color="#28313c" fontWeight={600} fontSize={17}>
                  {userData?.UserName}
                </Typography>
                <Typography color="#616e80" variant="subtitle1">
                  Investor
                </Typography>
                <Typography color="#616e80" variant="caption">
                  Customer Id : IN23-1
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
            >
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Typography fontWeight={600}>Lands Status</Typography>
                <Box alignSelf="center">
                  <LandscapeIcon sx={{ color: '#616e80' }} fontSize="large" />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                mt={5}
                justifyContent="space-around"
              >
                <Box textAlign="center">
                  <Typography color="#3860b5">Active</Typography>
                  <Typography color="#84cb25">1</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography color="#3860b5">In Review</Typography>
                  <Typography color="#84cb25">1</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography color="#3860b5">On Hold</Typography>
                  <Typography color="#84cb25">1</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography color="#3860b5">Sold</Typography>
                  <Typography color="#84cb25">1</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography color="#c2312f">Expired</Typography>
                  <Typography color="#c2312f">1</Typography>
                </Box>
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
            >
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Typography fontWeight={600}>Lands</Typography>
                <Box alignSelf="center">
                  <FormatListBulletedIcon
                    sx={{ color: '#616e80' }}
                    fontSize="large"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                mt={3}
                justifyContent="space-around"
              >
                <Box textAlign="center" onClick={() => navigate('/investedlands')}>
                  <Typography color="#3860b5">Invested Lands</Typography>
                  <Typography color="#84cb25">4</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography color="#3860b5">New Invest</Typography>
                  <Typography color="#84cb25">
                    <AddCircleOutlineIcon
                      onClick={() => navigate('/listedlands')}
                    />
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography color="#3860b5">
                    Edit Invest Information
                  </Typography>
                  <Typography color="#84cb25">
                    <UpgradeIcon
                      onClick={() => navigate('/investedlands')}
                    />
                  </Typography>
                </Box>
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
            >
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Typography fontWeight={600}>Contact</Typography>
                <Box alignSelf="center">
                  <ContactsIcon sx={{ color: '#616e80' }} fontSize="large" />
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
                    <Box textAlign="center" display="flex" flexDirection="column" gap={1}>
                      <Typography color="#3860b5">Phone Number</Typography>
                      <Typography color="#84cb25" variant="subtitle2">
                        {userData?.UserMobile}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box textAlign="center" display="flex" flexDirection="column" gap={1}>
                      <Typography color="#3860b5">Email</Typography>
                      <Typography color="#84cb25" variant="subtitle2">
                        {userData?.UserEmail}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Box textAlign="center" display="flex" flexDirection="column" gap={1}>
                      <Typography color="#3860b5">Address</Typography>
                      <Typography color="#84cb25" variant="subtitle2">
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
