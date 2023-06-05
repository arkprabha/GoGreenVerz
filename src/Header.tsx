import { Box, Typography, Grid } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import RemoveBg from './assets/removebg-preview-1.png';
import './Header.styles.css';

export default function Header() {

  const navigate = useNavigate();

  return (
    <div className="desktop-1-42aa">
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="auto-group-wh57-8wY">
                <Box>
                <img className="removebg-preview-1-FoC" src={RemoveBg} alt='removebg' />
                </Box>
                  <Box display='flex' flexDirection='row'>
                      <Typography className="home-VSe" onClick={() => navigate('/')}>Home</Typography>
                      <Typography className="home-VSe" onClick={() => navigate('/desktop2')}>Contribution</Typography>
                      <Typography className="home-VSe" onClick={() => navigate('/desktop3')}>Carbon Footprint</Typography>
                      <Typography className="home-VSe" onClick={() => navigate('/desktop4')}>Project Tracking</Typography>
                      <Typography className="home-VSe" onClick={() => navigate('/desktop5')}>Carbon Offset</Typography>
                      <Typography className="home-VSe" onClick={() => navigate('/desktop6')}>MRV</Typography>
                  </Box>
              </Box>
    </Grid>
    </Grid>
</div>
  );
}
