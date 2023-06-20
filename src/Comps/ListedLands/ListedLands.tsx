import React, { useEffect, useState } from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Box , Stack} from '@mui/material';
import Header from '../../Header';
import axios from 'axios';
import { LandOwnerFiles, get_all_land_owner } from '../../API_Service/API_Service';
import SnackBar from "../SnackBar/SnackBar";

const ListedLands: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  const UserType: string | null = localStorage.getItem('UserProfileType') ?? '';

  useEffect(() => {
    axios({
      method: 'GET',
      url: get_all_land_owner,
      headers: {
        'Authorization': `Bearer ${UserToken}`,
      }
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
          setData(res.data.data);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  }, [])



  return (
    <Box className='pageSizeandBack'>
      <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
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
          {data.map((tab, index) => (
            <Tab key={index} label={tab.LandState} />
          ))}
        </Tabs>
        <Box my={2} mx={5}>
          {data.length > 0 && value < data.length && (
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="video"
                  height="200"
                  width='100%'
                  src={`${LandOwnerFiles}${data[value].VirtualVideo}`}
                  controls
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" textAlign='left'>
                    {data[value].LandOwnerId}
                  </Typography>
                  <Stack spacing={1}>
                    <Box display='flex' gap={1} flexDirection='row'>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Land ID:</Typography>
                      <Typography variant="body2">{data[value].LandOwnerId}</Typography>
                    </Box>
                    <Box display='flex' gap={1} flexDirection='row'>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Longitude:</Typography>
                      <Typography variant="body2"> {data[value].Longitude}</Typography>
                    </Box>
                    <Box display='flex' gap={1} flexDirection='row'>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Latitude:</Typography>
                      <Typography variant="body2"> {data[value].Latitude}</Typography>
                    </Box>
                    <Box display='flex' gap={1} flexDirection='row'>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Land Size:</Typography>
                      <Typography variant="body2"> {data[value].LandSize}</Typography>
                    </Box>
                    <Box display='flex' gap={1} flexDirection='row'>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Creation Date:</Typography>
                      <Typography variant="body2"> {data[value].CreationDate}</Typography>
                    </Box>
                    <Box display='flex' gap={1} flexDirection='row'>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Project Commence Date:</Typography>
                      <Typography variant="body2"> {data[value].ProjectCommenceDate}</Typography>
                    </Box>
                    <Box display='flex' gap={1} flexDirection='row'>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Status:</Typography>
                      <Typography variant="body2"> {data[value].LandStatus}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {
                  UserType === 'Investor' ?
                    <Button size="small" color="primary">
                      Invest on this Land
                    </Button>
                    :
                    <Box display='flex' justifyContent='space-between' flexDirection='row'>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Update
                      </Button>
                    </Box>

                }
              </CardActions>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ListedLands;