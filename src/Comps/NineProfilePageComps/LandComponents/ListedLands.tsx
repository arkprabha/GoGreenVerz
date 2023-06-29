import React, { useEffect, useState } from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Box , Stack} from '@mui/material';
import Header from '../../../Header';
import axios from 'axios';
import { LandOwnerFiles, get_all_land_owner } from '../../../API_Service/API_Service';
import SnackBar from "../../SnackBar/SnackBar";

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
              <CardActions>import React, {useEffect} from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Checkbox, FormControlLabel, Grid, Stack,  TableBody,
  TableCell,
  TableContainer,
  TableHead, TextField,
  TableRow,  TablePagination, Table, Dialog, DialogTitle, DialogContent, Autocomplete } from '@mui/material';
import { useState } from 'react';
import { Box} from '@mui/material';
import axios from 'axios';
import { LandOwnerFiles, get_all_land_owner, get_state, methodGet } from '../API_Service/API_Service';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import LandDataDialog from './LandDataDialog';

export default function ListedLands() {
    const [value, setValue] = useState(0);
    const [state, setState] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data , setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const UserToken = localStorage.getItem('UserToken');
    const UserType = localStorage.getItem('UserProfileType');
    const [selectedStates, setSelectedStates] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [ShowFilterList, setShowFilterList] = useState(false);
    const [Loading , setLoading] = useState(true);
    const[recentSearch , setRecentSearch] = useState([]);
    const [input , setInput] = useState(false);
     
    
    useEffect(() => {
      const storedRecentSearch = JSON.parse(localStorage.getItem('RecentSearch'));
      if (storedRecentSearch) {
      setRecentSearch(storedRecentSearch);
      }
      }, []);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

      const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStateChange = (event) => {
    const stateName = event.target.name;
    setSelectedStates((prevSelectedStates) => {
      if (prevSelectedStates.includes(stateName)) {
        return prevSelectedStates.filter((state) => state !== stateName);
      } else {
        return [...prevSelectedStates, stateName];
      }
    });
  };

    const navigate = useNavigate();

            useEffect(() => {
            axios({
                method: methodGet,
                url: get_state,
                headers: {
                'Authorization': `Bearer ${UserToken}`,
            }
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setState(res.data.data)
                    setOpen(true)
                    setStatus(true)
                    setColor(true)

                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
    }, [])


   useEffect(()=>{
       axios({
           method: 'GET',
           url: get_all_land_owner,
           headers: {
               'Authorization': `Bearer ${UserToken}`,
           }
       })
           .then((res) => {
               if (res.data.error) {
                   setData([]);
                    setLoading(false);
               } else {
                   setData(res.data.data);
                   setLoading(false);
               }
           })
           .catch((err) => {
               alert("Oops something went wrong " + err);
           });
   }, [UserToken])



 const movedtoEditPage  = (id) =>{
    navigate('/updateaddedlands', {state:{id:id}})
 }

const handleSearchChange = (event, newValue) => {
  const selectedValue = newValue ? newValue.StateName : event.target.value;
  setSearchQuery(selectedValue);
};

  const handleSearch = () => {
    setRecentSearch([...recentSearch , searchQuery]);
    localStorage.setItem('RecentSearch', JSON.stringify(recentSearch));
    if(searchQuery !== '' || searchQuery !== null){
    setShowFilterList(true);
    const filteredProducts = data && data.filter((i) => {
    const {LandAddress1, LandAddress2 ,LandOwnerId, LandCity, LandState, LandCountry, Latitude, Longitude } = i;
      // Apply the search logic based on your requirements
      const matchesCity = LandCity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = LandState.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAddress1 = LandAddress1.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAddress2 = LandAddress2.toString().includes(searchQuery.toLowerCase());
      const matchesLandCountry = LandCountry.toString().includes(searchQuery.toLowerCase());
      const matchesLongitude = Longitude.toString().includes(searchQuery);
      const matchesLandOwnerId = LandOwnerId.toString().includes(searchQuery);
      const matchesLatitude = Latitude.toString().includes(searchQuery);

      return (
        matchesCity ||
        matchesState ||
        matchesAddress1 ||
        matchesAddress2 ||
        matchesLandCountry ||
        matchesLandOwnerId ||
        matchesLatitude ||
        matchesLongitude
      );
    });

    setSearchResults(filteredProducts);
     }
     else 
     {
      setShowFilterList(false);
      setSearchResults([]);
     }
    }

     const slicedData = data && data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
     const LandList = searchResults && searchResults.slice(page * rowsPerPage, (page + 1) * rowsPerPage);


    const removeSearchText = (index) => {
      if (index >= 0 && index < recentSearch.length) {
        const updatedRecentSearch = [...recentSearch];
        updatedRecentSearch.splice(index, 1);
        localStorage.setItem('RecentSearch', JSON.stringify(updatedRecentSearch));
        setRecentSearch(updatedRecentSearch);
      }
    };

  const resetFilter = () =>{
    setShowFilterList(false);
    setInput(true);
  }

    return (
        <Box>
            <Header />
            <Box p={1}>
            <LandDataDialog openDialog={openDialog} setOpenDialog={setOpenDialog} i={selectedItem} />
           <Grid container spacing={2}  display='flex' justifyContent='space-between'>
       
          <Grid item xs={12} sm={12} md={3} lg={3} height='auto' borderRight={{xs:'none' , sm:'none', md:'1px solid silver'}}>
          <Box p={1}>
          <Box py={3}>
          <Paper sx={{ p: '2px 4px', width: '30ch', display: 'flex', alignItems: 'center', }}>
          <Autocomplete
          id="combo-box-demo"
          size="small"
          freeSolo
          key={input}
          onChange={handleSearchChange}
          options={state}
          getOptionLabel={(option) => (option ? option.StateName : '')}
          renderInput={(params) => (
          <TextField
          {...params}
          placeholder="Search Lands By Address, ID, Lat"
          variant="standard"
          sx={{ width: '25ch' }}
          value={searchQuery}
          onChange={handleSearchChange}
          />
          )}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
          <SearchIcon />
          </IconButton>
          </Paper>
            </Box>
            <Box py={3}>
            <Stack spacing={2}>
            <Typography variant='Subtitle1' color='primary' sx={{textDecoration:'underline'}} fontWeight={600}>Recent Searches</Typography>
           {
            recentSearch && recentSearch.map((i , index)=>
            <Typography sx={{marginBottom:1}}>{i}<CloseIcon sx={{verticalAlign:'middle'}} fontSize='small'  onClick={()=>removeSearchText(index)}/> </Typography>
           )}
           </Stack>
            </Box>
            </Box>
            </Grid>

      <Grid item xs={12} sm={12} md={9} lg={9}>
          {
          ShowFilterList && searchQuery !== '' ?
          <>
        <Box p={1}>
          <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' color='text.secondary'>Best Results</Typography>
           <Typography color='#3285a8' onClick={resetFilter} sx={{textDecoration:'underline'}}>See All Lands</Typography>
          </Box>
          <Typography variant='caption'>({LandList && LandList.length})</Typography>
        </Box>
        {
          LandList.length === 0 && 
          <Box py={1}>
          <Typography variant='h6' color='text.secondary'>Nothing Mathces Your Search Results. <Typography color='#3285a8' onClick={()=> setShowFilterList(false)} sx={{textDecoration:'underline'}}>See All Lands</Typography></Typography>
        </Box>
        }
        <Grid container spacing={1} display='flex' justifyContent='start' px={3}>
          {LandList.map((i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i.id} my={3}>
           <Card sx={{ maxWidth: 300 , height:'100%' , display:'flex',flexDirection:'column',  justifyContent:'space-between' }}>
            <CardActionArea>
        {Loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
            <CardMedia
            component="video"
            height="170"
            width='100%'
            src={`${LandOwnerFiles}${i.VirtualVideo}`}
            controls
            />
      )}
            <CardContent>
          {Loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div" textAlign='left'>
            {i.LandOwnerId}
            </Typography>
            <Stack spacing={1}>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Located:</Typography>
            <Typography variant="body2">{i.LandCity}, {i.LandState}, {i.LandCountry}</Typography>
            </Box>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Status:</Typography>
            <Typography variant="body2"> {i.LandStatus}</Typography>
            </Box>
            </Stack>
            </>
        )}
            </CardContent>
            </CardActionArea>
            <CardActions>
          {Loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <>
            {
            UserType === 'Investor' ?
           <Box display='flex' justifyContent='space-between' flexDirection='row'>
            <Button size="small" color="primary" onClick={()=>navigate('/investorprofileform')}>
            Invest
            </Button>
              
            <Button size="small" color="primary" onClick={()=>handleOpenDialog(i)}>
             View
            </Button>
            </Box>
            :
            <Box display='flex' justifyContent='space-between' flexDirection='row'>
            <Button size="small" color="primary" onClick={()=>handleOpenDialog(i)}>
            View
            </Button>
         

            <Button size="small" color="primary" onClick={()=>movedtoEditPage(i.LandOwnerId)}>
             Update
            </Button>
            </Box>
            }
            </>
)}            
            </CardActions>
            </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </Grid>
    </Grid>
        </>
         :
        <Grid container spacing={1} display='flex' justifyContent='start' px={3}>
          {slicedData.map((i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i.id} my={3}>
           <Card sx={{ maxWidth: 300 , height:'100%' , display:'flex',flexDirection:'column',  justifyContent:'space-between' }}>
            <CardActionArea>
        {Loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
            <CardMedia
            component="video"
            height="170"
            width='100%'
            src={`${LandOwnerFiles}${i.VirtualVideo}`}
            controls
            />
      )}
            <CardContent>
          {Loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div" textAlign='left'>
            {i.LandOwnerId}
            </Typography>
            <Stack spacing={1}>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Located:</Typography>
            <Typography variant="body2">{i.LandCity}, {i.LandState}, {i.LandCountry}</Typography>
            </Box>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Status:</Typography>
            <Typography variant="body2"> {i.LandStatus}</Typography>
            </Box>
            </Stack>
            </>
        )}
            </CardContent>
            </CardActionArea>
            <CardActions>
          {Loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <>
            {
            UserType === 'Investor' ?
           <Box display='flex' justifyContent='space-between' flexDirection='row'>
            <Button size="small" color="primary" onClick={()=>navigate('/investorprofileform')}>
            Invest
            </Button>
              
            <Button size="small" color="primary" onClick={()=>handleOpenDialog(i)}>
             View
            </Button>
            </Box>
            :
            <Box display='flex' justifyContent='space-between' flexDirection='row'>
            <Button size="small" color="primary" onClick={()=>handleOpenDialog(i)}>
            View
            </Button>


            <Button size="small" color="primary" onClick={()=>movedtoEditPage(i.LandOwnerId)}>
             Update
            </Button>
            </Box>
            }
             </>
              )}
            </CardActions>
            </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </Grid>
    </Grid>
}
    </Grid>
    </Grid>

        </Box>
        </Box>
    );
};
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