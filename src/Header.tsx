import { Box, Typography, Grid } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import RemoveBg from './assets/removebg-preview-1.png';
import './Header.styles.css';
import {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as React from 'react';



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

  const navigate = useNavigate();
  
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);





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


  return (
    <div className="desktop-1-42aa">
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="auto-group-wh57-8wY">
                <Box>
                <img className="removebg-preview-1-FoC" src={RemoveBg} alt='removebg' />
                </Box>
                  <Box display='flex' flexDirection='row'>
                      <Typography className="home-VSe" onClick={() =>navigate('/')}>Home</Typography>
                      <Typography className="home-VSe" onClick={() =>handleOpenPage('desktop2')}>Contribution</Typography>
                      <Typography className="home-VSe" onClick={() => handleOpenPage('desktop3')}>Carbon Footprint</Typography>
                      <Typography className="home-VSe" onClick={() =>handleOpenPage('desktop4')}>Project Tracking</Typography>
                      <Typography className="home-VSe" onClick={() => handleOpenPage('desktop5')}>Carbon Offset</Typography>
                      <Typography className="home-VSe" onClick={() => handleOpenPage('desktop6')}>MRV</Typography>
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
