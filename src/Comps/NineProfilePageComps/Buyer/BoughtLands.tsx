import React, { ChangeEvent, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Button, CardActionArea, CardActions, Grid, Stack, TextField,
  TablePagination, Autocomplete , Container
} from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { LandOwnerFiles, get_state, methodGet, get_buyer } from '../../../API_Service/API_Service';
import Header from '../../../Header';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import SnackBar from '../../SnackBar/SnackBar';
import BuyerLandDialog from './BuyerLandDialog';


interface BuyerData {
  BuyerId: string;
  BuyerName: string;
  BuyerAddress1: string;
  BuyerAddress2: string;
  BuyerCity: string;
  BuyerState: string;
  BuyerPostalCode: string;
  BuyerCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  BuyerStatus: String;
}



interface State {
  StateId: string;
  StateName: string;
}



const BoughtLands: React.FC = () => {

  const [state, setState] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
 const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
  const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  const UserId: string | null = localStorage.getItem('UserId') ?? '';
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<BuyerData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [ShowFilterList, setShowFilterList] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);
  const [recentSearch, setRecentSearch] = useState<any[]>([]);
  const [inputKey, setInputKey] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecentSearch = localStorage.getItem('RecentSearch');
    if (storedRecentSearch !== null) {
      const parsedRecentSearch = JSON.parse(storedRecentSearch);
      setRecentSearch(parsedRecentSearch);
    }
  }, []);


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


  useEffect(() => {
    const lData = new FormData()
    lData.append('UserId', UserId);
    axios({
      method: 'POST',
      url: get_buyer,
      data: lData,
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


  const handleOpenDialog = (item: BuyerData) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };



  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };





  const movedtoEditPage = (id: string) => {
    navigate('/updateaddedbuyer', { state: { id: id } })
  }

  const handleSearchChange = (event: ChangeEvent<{} | any>, newValue: State | null) => {
    const selectedValue = newValue ? newValue.StateName : event.target.value;
    setSearchQuery(selectedValue);
  };

  const handleSearch = () => {
    setRecentSearch([...recentSearch, searchQuery]);
    localStorage.setItem('RecentSearch', JSON.stringify(recentSearch));
    if (searchQuery !== '' || searchQuery !== null) {
      setShowFilterList(true);
      const filteredProducts = data && data.filter((i) => {
        const { BuyerAddress1, BuyerAddress2, BuyerOwnerId, BuyerCity, BuyerState, BuyerCountry, Latitude, Longitude } = i;
        // Apply the search logic based on your requirements
        const matchesCity = BuyerCity.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = BuyerState.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAddress1 = BuyerAddress1.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAddress2 = BuyerAddress2.toString().includes(searchQuery.toLowerCase());
        const matchesBuyerCountry = BuyerCountry.toString().includes(searchQuery.toLowerCase());
        const matchesLongitude = Longitude.toString().includes(searchQuery);
        const matchesBuyerOwnerId = BuyerOwnerId.toString().includes(searchQuery);
        const matchesLatitude = Latitude.toString().includes(searchQuery);

        return (
          matchesCity ||
          matchesState ||
          matchesAddress1 ||
          matchesAddress2 ||
          matchesBuyerCountry ||
          matchesBuyerOwnerId ||
          matchesLatitude ||
          matchesLongitude
        );
      });

      setSearchResults(filteredProducts);
    }
    else {
      setShowFilterList(false);
      setSearchResults([]);
    }
  }

  const slicedData = data && data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const BuyerList = searchResults && searchResults.slice(page * rowsPerPage, (page + 1) * rowsPerPage);


  const removeSearchText = (index: number) => {
    if (index >= 0 && index < recentSearch.length) {
      const updatedRecentSearch = [...recentSearch];
      updatedRecentSearch.splice(index, 1);
      localStorage.setItem('RecentSearch', JSON.stringify(updatedRecentSearch));
      setRecentSearch(updatedRecentSearch);
    }
  };

  const resetFilter = () => {
    setShowFilterList(false);
    setInputKey((prevKey) => prevKey + 1);
  }



  return (
    <Box>

      <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
      <Header isConnectedWallet={isConnectedWallet} />
      <Box p={1}>
        <BuyerLandDialog openDialog={openDialog} setOpenDialog={setOpenDialog} i={selectedItem} />

        <Container>
          <Box mb={1}>
            <Grid container mb={2} mt={2}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box width='100%' textAlign='center' py={2} className="text-container">
                  <Typography className="FormheadingName" sx={{fontSize:'2rem' , fontWeight:700}} >Bought Lands</Typography>                  </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <Grid container spacing={2} display='flex' justifyContent='space-between'>

          <Grid item xs={12} sm={12} md={3} lg={3} height='auto' >
            <Box p={1}>
              <Box py={3}>
                <Paper sx={{ p: '2px 4px', width: '30ch', display: 'flex', alignItems: 'center', }}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    freeSolo
                    key={inputKey}
                    onChange={handleSearchChange}
                    options={state}
                    getOptionLabel={(option) => (option ? option.StateName : '')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search By Location"
                        variant="standard"
                        sx={{ width: '25ch' }}
                        color="success"
                        onChange={handleSearchChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
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
                   <Typography color='#008080' sx={{textDecoration:'underline'}} fontWeight={600}>Recent Searches</Typography>
                  {
                    recentSearch && recentSearch.map((i, index) =>
                      <Typography sx={{ marginBottom: 1 }} key={index}>{i}<CloseIcon sx={{ verticalAlign: 'middle' }} fontSize='small' onClick={() => removeSearchText(index)} /> </Typography>
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
                      <Typography color='#3285a8' onClick={resetFilter} sx={{ textDecoration: 'underline' }}>See All Buyers</Typography>
                    </Box>
                    <Typography variant='caption'>({BuyerList && BuyerList.length})</Typography>
                  </Box>
                  {
                    BuyerList.length === 0 &&
                    <Box py={1}>
                      <Typography variant='h6' color='text.secondary'>Nothing Mathces Your Search Results. <Typography color='#3285a8' onClick={() => setShowFilterList(false)} sx={{ textDecoration: 'underline' }}>See All Buyers</Typography></Typography>
                    </Box>
                  }
                  <Grid container spacing={1} display='flex' justifyContent='start' px={3}>
                    {BuyerList.map((i) => (
                      <Grid item xs={12} sm={6} md={4} lg={4} key={i.id} my={3}>
                         <Card sx={{ maxWidth: 300 , height:'100%' , display:'flex',flexDirection:'column',  justifyContent:'space-between' , boxShadow:5 }}>
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
                                    {i.BuyerId}
                                  </Typography>
                                  <Stack spacing={1}>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Located:</Typography>
                                      <Typography variant="body2">{i.BuyerCity}, {i.BuyerState}, {i.BuyerCountry}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                      <Typography variant="body2" color="text.secondary" fontWeight={600}>Status:</Typography>
                                      <Typography variant="body2"> {i.BuyerStatus}</Typography>
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
                              <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                <Button size="small" color="primary" onClick={() => handleOpenDialog(i)}>
                                  View
                                </Button>


                                <Button size="small" color="primary" onClick={() => movedtoEditPage(i.BuyerId)}>
                                  Update
                                </Button>
                              </Box>
                            )}
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <TablePagination
                        component="div"
                        count={BuyerList.length}
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
                       <Card sx={{ maxWidth: 300 , height:'100%' , display:'flex',flexDirection:'column',  justifyContent:'space-between' , boxShadow:5 }}>
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
                                  {i.BuyerId}
                                </Typography>
                                <Stack spacing={1}>
                                  <Box display='flex' gap={1} flexDirection='row'>
                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>Located:</Typography>
                                    <Typography variant="body2">{i.BuyerCity}, {i.BuyerState}, {i.BuyerCountry}</Typography>
                                  </Box>
                                  <Box display='flex' gap={1} flexDirection='row'>
                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>Status:</Typography>
                                    <Typography variant="body2"> {i.BuyerStatus}</Typography>
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
                            <Box display='flex' justifyContent='space-between' flexDirection='row'>
                              <Button size="small" color="primary" onClick={() => handleOpenDialog(i)}>
                                View
                              </Button>


                              <Button size="small" color="primary" onClick={() => movedtoEditPage(i.BuyerId)}>
                                Update
                              </Button>
                            </Box>
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
export default BoughtLands;