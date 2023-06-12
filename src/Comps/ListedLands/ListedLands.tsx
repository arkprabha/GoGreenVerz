import React, { useState } from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Box } from '@mui/material';
import Header from '../../Header';

interface TabData {
  label: string;
  details: {
    image: string;
    Land_ID: string;
    Longtitude: string;
    Lattitude: string;
    Land_Size: string;
    Creation_Date: string;
    ProjectCommenceDate: string;
    Status: string;
  }[];
}

const tabsData: TabData[] = [
  { label: 'Land One', details: [{ 'image': 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-%C3%A1kos-szab%C3%B3-440731.jpg&fm=jpg', 'Land_ID': 'L1D2', 'Longtitude': 'XXXX', 'Lattitude': 'XXXX', 'Land_Size': '45.Sq.ft', 'Creation_Date': 'DD / MM / YYYY', 'ProjectCommenceDate': 'DD / MM / YYYY', 'Status': 'Active' }] },
  { label: 'Land Two', details: [{ 'image': 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-%C3%A1kos-szab%C3%B3-440731.jpg&fm=jpg', 'Land_ID': 'L1D3', 'Longtitude': 'YYXX', 'Lattitude': 'UUUX', 'Land_Size': '65.Sq.ft', 'Creation_Date': 'DD / MM / YYYY', 'ProjectCommenceDate': 'DD / MM / YYYY', 'Status': 'On Hold' }] },
  { label: 'Land Three', details: [{ 'image': 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-%C3%A1kos-szab%C3%B3-440731.jpg&fm=jpg', 'Land_ID': 'L3D4', 'Longtitude': 'ZZXX', 'Lattitude': 'MMXX', 'Land_Size': '75.Sq.ft', 'Creation_Date': 'DD / MM / YYYY', 'ProjectCommenceDate': 'DD / MM / YYYY', 'Status': 'Expired' }] },
  { label: 'Land Four', details: [{ 'image': 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-%C3%A1kos-szab%C3%B3-440731.jpg&fm=jpg', 'Land_ID': 'L5D4', 'Longtitude': 'AAAX', 'Lattitude': 'NNXX', 'Land_Size': '85.Sq.ft', 'Creation_Date': 'DD / MM / YYYY', 'ProjectCommenceDate': 'DD / MM / YYYY', 'Status': 'In Review' }] },
  { label: 'Land Five', details: [{ 'image': 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-%C3%A1kos-szab%C3%B3-440731.jpg&fm=jpg', 'Land_ID': 'L6D6', 'Longtitude': 'CCCX', 'Lattitude': 'FFXX', 'Land_Size': '95.Sq.ft', 'Creation_Date': 'DD / MM / YYYY', 'ProjectCommenceDate': 'DD / MM / YYYY', 'Status': 'Active' }] },
  { label: 'Land Six', details: [{ 'image': 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-%C3%A1kos-szab%C3%B3-440731.jpg&fm=jpg', 'Land_ID': 'L9D8', 'Longtitude': 'NNNN', 'Lattitude': 'GGGX', 'Land_Size': '40.Sq.ft', 'Creation_Date': 'DD / MM / YYYY', 'ProjectCommenceDate': 'DD / MM / YYYY', 'Status': 'Active' }] },
];

export default function ListedLands(): JSX.Element {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';

  return (
    <Box className='pageSizeandBack'>
      <Header isConnectedWallet={isConnectedWallet} />
    <Box sx={{ width: 540 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        {tabsData.map((tab: TabData, index: number) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box my={2} mx={5}>
        <Card sx={{ maxWidth: 345 }}>
          {tabsData[value].details.map((detail, index) => (
            <React.Fragment key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={detail.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" textAlign="left">
                    {detail.Land_ID}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="left">
                    Land ID : {detail.Land_ID}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="left">
                    Longtitude : {detail.Longtitude}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="left">
                    Lattitude : {detail.Lattitude}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="left">
                    Land Size : {detail.Land_Size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="left">
                    Creation Date : {detail.Creation_Date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="left">
                    Project Commence Date : {detail.ProjectCommenceDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="left">
                    Status : {detail.Status}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Invest on this Land
                </Button>
              </CardActions>
            </React.Fragment>
          ))}
        </Card>
      </Box>
    </Box>

    </Box>
  );
}