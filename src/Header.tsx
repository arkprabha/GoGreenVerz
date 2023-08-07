import { Box, Typography, Grid , MenuItem, Menu} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import RemoveBg from './assets/unnamed-removebg-preview.png';
import './Header.styles.css';
import {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as React from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

interface  HeaderProps {
  isConnectedWallet?: string;
}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Header({ isConnectedWallet} : HeaderProps) {
  
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const handleOpenPage = (item: string) => {
      navigate(`/${item}`);
  };

  const handleMenuOpenPage = (item: string) => {
    if (isConnectedWallet === 'true') {
      setIsSnackbarOpen(false);
      navigate(`/${item}`);
    } else {
      setIsSnackbarOpen(true);
    }
  };

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setIsSnackbarOpen(false);
};


  const Logout = () =>{
    localStorage.clear();
    navigate('/');
  }

  const  UserProfileType: string | null = localStorage.getItem('UserProfileType') ?? '';

  const profileTypeNames = {
    'Land owner': 'Listed Lands',
    'Investor': 'Listed Lands',
    'GoGreenverz or Project Developer': 'Invested Lands',
    'Plantation Partner': 'GGV Approved',
    'Verification and Validation Body': 'Plantation Filled',
    'Carbon Registry of India': 'VVB Filled',
    'Government Agencies': 'CRI Filled',
    'Admin': 'GA Approved',
    'Buyers': 'Listed Lands'
  };

  return (
    <div className="desktop-1-42aa" style={{boxShadow:'10px'}}>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="auto-group-wh57-8wY">
                <Box>
                <img className="removebg-preview-1-FoC" src={RemoveBg} alt='removebg' />
                </Box>
              <Box display='flex' flexDirection='row'>
              <Typography className="home-VSe" onClick={() =>navigate('/home')}>Home</Typography>
              <Typography className="home-VSe" onClick={handleClick}>NFT</Typography>
              <Box>
                <Menu
                  className="home-VSe"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{ padding: 2, marginTop: 1 }}
                >
                  <MenuItem onClick={() => handleMenuOpenPage('contribution')} sx={{ fontSize: 16 }}>Contribution</MenuItem>
                  <MenuItem onClick={() => handleMenuOpenPage('footprint')} sx={{ fontSize: 16 }}>Carbon Footprint</MenuItem>
                  <MenuItem onClick={() => handleMenuOpenPage('trackproject')} sx={{ fontSize: 16 }}>Project Tracking</MenuItem>
                  <MenuItem onClick={() => handleMenuOpenPage('offset')} sx={{ fontSize: 16 }}>Carbon Offset</MenuItem>
                  <MenuItem onClick={() => handleMenuOpenPage('mrv')} sx={{ fontSize: 16 }}>Renewal</MenuItem>
                  {
                    UserProfileType === 'GoGreenverz or Project Developer' &&
                    <MenuItem onClick={() => handleOpenPage('afforestation')} sx={{ fontSize: 16 }}>Afforestation</MenuItem>
                  }
                </Menu>
              </Box>
                {
                  UserProfileType && (
                  <Typography className="home-VSe" onClick={() => handleOpenPage('listedlands')}>
                      {profileTypeNames[UserProfileType as keyof typeof profileTypeNames]}
                    </Typography>
                  )
                }
              {
              UserProfileType === 'Land owner' && <Typography className="home-VSe" onClick={() => handleOpenPage('addyourlands')}>Add Lands</Typography>
              }
              {
              UserProfileType === 'Investor' &&  <Typography className="home-VSe" onClick={() => handleOpenPage('investedlands')}>Invested Lands</Typography>
              }
              {
              UserProfileType === 'GoGreenverz or Project Developer' && <Typography className="home-VSe" onClick={() => handleOpenPage('devsubmittedlands')}>Approved Lands</Typography>
              }
              {
              UserProfileType === 'Plantation Partner' && <Typography className="home-VSe" onClick={() => handleOpenPage('myfilledlands')}>My Filled Lands</Typography>
              }
              {
              UserProfileType === 'Verification and Validation Body' && <Typography className="home-VSe" onClick={() => handleOpenPage('vvblandsubmissions')}>My Work Submissions</Typography>
              }
              {
                UserProfileType === 'Carbon Registry of India' && <Typography className="home-VSe" onClick={() => handleOpenPage('crisubmissions')}> My Work Submissions</Typography>
              }
              {
                UserProfileType === 'Government Agencies' && <Typography className="home-VSe" onClick={() => handleOpenPage('govtsubmissions')}> My Work Submissions</Typography>
              }
              {
              UserProfileType === 'Admin' && <Typography className="home-VSe" onClick={() => handleOpenPage('adminsubmittedlands')}>Submitted Lands</Typography>
              }
              {
              UserProfileType === 'Buyers' && <Typography className="home-VSe" onClick={() => handleOpenPage('yourlands')}>Your Lands</Typography>
              }

              {
                UserProfileType === 'GoGreenverz or Project Developer' ? <Typography className="home-VSe" onClick={() => handleOpenPage('approvaltab')}>Dashboard</Typography>
                :
              <Typography className="home-VSe" onClick={() => handleOpenPage('afforestation')}>Afforestation</Typography>
              }
             
              <Typography className="home-VSe" onClick={() => handleOpenPage('profile')}>Profile</Typography>
              <Typography className="home-VSe" onClick={Logout}><PowerSettingsNewIcon  sx={{verticalAlign:'middle'}}/></Typography>
              </Box>
              <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Please! Connect Your Wallet!
              </Alert>
            </Snackbar>
              </Box>
        </Grid>
        </Grid>
    </div>
      );
    }
