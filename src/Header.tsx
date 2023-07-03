import { Box, Typography, Grid , MenuItem, Menu} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import RemoveBg from './assets/removebg-preview-1.png';
import './Header.styles.css';
import {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';


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


    const  UserProfileType: string | null = localStorage.getItem('UserProfileType') ?? '';

  return (
    <div className="desktop-1-42aa">
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="auto-group-wh57-8wY">
                <Box>
                <img className="removebg-preview-1-FoC" src={RemoveBg} alt='removebg' />
                </Box>
              <Box display='flex' flexDirection='row'>
              <Typography className="home-VSe" onClick={() =>navigate('/home')}>Home</Typography>
              <Typography className="home-VSe" onClick={handleClick}>Menu</Typography>
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
                  <MenuItem onClick={() => handleOpenPage('contribution')} sx={{ fontSize: 16 }}>Contribution</MenuItem>
                  <MenuItem onClick={() => handleOpenPage('footprint')} sx={{ fontSize: 16 }}>Carbon Footprint</MenuItem>
                  <MenuItem onClick={() => handleOpenPage('trackproject')} sx={{ fontSize: 16 }}>Project Tracking</MenuItem>
                  <MenuItem onClick={() => handleOpenPage('offset')} sx={{ fontSize: 16 }}>Carbon Offset</MenuItem>
                  <MenuItem onClick={() => handleOpenPage('mrv')} sx={{ fontSize: 16 }}>Renewal</MenuItem>
                </Menu>
              </Box>
              <Typography className="home-VSe" onClick={() => handleOpenPage('listedlands')}>Listed Lands</Typography>
              {
              UserProfileType === 'Land owner' && <Typography className="home-VSe" onClick={() => handleOpenPage('addyourlands')}>Add Lands</Typography>
              }
              {
              UserProfileType === 'Investor' &&  <Typography className="home-VSe" onClick={() => handleOpenPage('investedlands')}>Invested Lands</Typography>
              }
              {
              UserProfileType === 'GoGreenverz or Project Developer' && <Typography className="home-VSe" onClick={() => handleOpenPage('devsubmittedlands')}>Submitted Lands</Typography>
              }
              {
              UserProfileType === 'Plantation Partner' && <Typography className="home-VSe" onClick={() => handleOpenPage('myfilledlands')}>My Filled Lands</Typography>
              }
              {
              UserProfileType === 'Verification and Validation Body' && <Typography className="home-VSe" onClick={() => handleOpenPage('vvblandsubmissions')}>My Land Submissions</Typography>
              }
              {
              UserProfileType === 'Carbon Registry of India' && <Typography className="home-VSe" onClick={() => handleOpenPage('crisubmissions')}>My Land Submissions</Typography>
              }
              {
              UserProfileType === 'Government Agencies' && <Typography className="home-VSe" onClick={() => handleOpenPage('govtsubmissions')}>My Land Submissions</Typography>
              }
              {
              UserProfileType === 'Admin' && <Typography className="home-VSe" onClick={() => handleOpenPage('adminsubmittedlands')}>Submitted Lands</Typography>
              }
              {
              UserProfileType === 'Buyers' && <Typography className="home-VSe" onClick={() => handleOpenPage('yourlands')}>Your Lands</Typography>
              }
              <Typography className="home-VSe" onClick={() => handleOpenPage('profile')}>Profile</Typography>
              <Typography className="home-VSe" onClick={() => navigate('/')}>Logout<LogoutIcon  sx={{verticalAlign:'middle'}}/></Typography>
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
