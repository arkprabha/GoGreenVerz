import React, { ChangeEvent, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Button, CardActionArea, CardActions, Grid, Stack, TextField,
  TablePagination, Autocomplete, Container
} from '@mui/material';
import { useState } from 'react';
import { Box, } from '@mui/material';
import axios from 'axios';
import {  get_state, methodGet,} from '../../../../API_Service/API_Service';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import LandDataDialog from '../../LandComponents/LandDataDialog';
import SnackBar from '../../../SnackBar/SnackBar';
import VerifyDialog from './VerifyDialog';


interface LandItem {
  LandId: string;
  VirtualVideo: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  LandOwnerName: string;
  LandAddress1: string;
  LandAddress2: string;
  LandCity: string;
  LandState: string;
  LandCountry: string;
  MobileNum: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  LandStatus: string;
  LandRemarks: string;
}
interface PropType {
  data: LandItem[];
  Loading: boolean;
  getNotVerifiedLands: () => void;
}
interface State {
  StateId: string;
  StateName: string;
}


export default function LandQueue({ data, Loading, getNotVerifiedLands } : PropType) {

  const [state, setState] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  const UserProfileTypeId: string = '1';
  const [openLandDialog, setOpenLandDialog] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<LandItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<LandItem[]>([]);
  const [ShowFilterList, setShowFilterList] = useState<boolean>(false);
  const [recentSearch, setRecentSearch] = useState<any[]>([]);
  const [inputKey, setInputKey] = useState<number>(0);
  const [LandId, setLandId] = useState<string>('');

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [openVerifyDialog, setOpenVerifyDialog] = useState<boolean>(false);

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
        setOpen(false)
        setStatus(true)
        setColor(true)

      }
    }).catch(err => {
      alert('Oops something went wrong ' + err)
    });
  }, [])


  const handleLandOpenDialog = (item: LandItem) => {
    setSelectedItem(item);
    setOpenLandDialog(true);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleSearchChange = (event: ChangeEvent<{} | any>, newValue: State | null) => {
    const selectedValue = newValue ? newValue.StateName : event.target.value;
    setSearchQuery(selectedValue);
  };

  const handleSearch = () => {
    if (searchQuery && searchQuery.trim() !== '') {
      setRecentSearch(prevSearch => [...prevSearch, searchQuery]);
      localStorage.setItem('RecentSearch', JSON.stringify(recentSearch));
      setShowFilterList(true);

      const filteredProducts = data && data.filter((i) => {
        const { LandAddress1, LandAddress2, LandId, LandCity, LandState, LandCountry, Latitude, Longitude } = i;
        // Apply the search logic based on your requirements
        const matchesCity = LandCity.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = LandState.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAddress1 = LandAddress1.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAddress2 = LandAddress2.toString().includes(searchQuery.toLowerCase());
        const matchesLandCountry = LandCountry.toString().includes(searchQuery.toLowerCase());
        const matchesLongitude = Longitude.toString().includes(searchQuery);
        const matchesLandId = LandId.toString().includes(searchQuery);
        const matchesLatitude = Latitude.toString().includes(searchQuery);

        const matches = (
          matchesCity ||
          matchesState ||
          matchesAddress1 ||
          matchesAddress2 ||
          matchesLandCountry ||
          matchesLandId ||
          matchesLatitude ||
          matchesLongitude
        );

        console.log('Search Query:', searchQuery);
        console.log('Item:', i);
        console.log('Matches:', matches);

        return matches;
      });

      setSearchResults(filteredProducts);
      console.log('Filtered Products:', filteredProducts);
    } else {
      setShowFilterList(false);
      setSearchResults([]);
    }
  };


  console.log(searchResults);
  console.log(searchQuery);

  const slicedData = data && data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const LandList = searchResults && searchResults.slice(page * rowsPerPage, (page + 1) * rowsPerPage);



  const resetFilter = () => {
    setShowFilterList(false);
    setInputKey((prevKey) => prevKey + 1);
  }

  const handleOpenVerfiyDialog = (id: string) => {
    setOpenVerifyDialog(true);
    setLandId(id);
  }


   const options = ['GGV Verified'];


  return (
    <Box>
      <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
      <Box p={1}>

        <LandDataDialog openDialog={openLandDialog} setOpenDialog={setOpenLandDialog} i={selectedItem} />

        <VerifyDialog getNotVerifiedLands={getNotVerifiedLands} UserProfileTypeId={UserProfileTypeId} setOpen={setOpen} setMessage={setMessage} setColor={setColor} setStatus={setStatus} LandId={LandId} options={options} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} openVerifyDialog={openVerifyDialog} setOpenVerifyDialog={setOpenVerifyDialog} />
        <Container>
        <Grid container spacing={2}>

          {/* <Grid item xs={12} sm={12} md={3} lg={3} height='auto' >
            <Box p={1}>
              <Box py={3}>
              </Box>
              <Box py={3}>
                <Stack spacing={2}>
                  <Typography color='#008080' sx={{ textDecoration: 'underline' }} fontWeight={600}>Recent Searches</Typography>
                  {
                    recentSearch && recentSearch.map((i, index) =>
                      <Typography sx={{ marginBottom: 1 }} key={index}>{i}<CloseIcon sx={{ verticalAlign: 'middle' }} fontSize='small' onClick={() => removeSearchText(index)} /> </Typography>
                    )}
                </Stack>
              </Box>
            </Box>
          </Grid> */}
          
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box display='flex' justifyContent='end'>
                <Paper sx={{ p: '2px 4px', width: '30ch', display: 'flex', alignItems: 'center'}}>
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
                        placeholder="  Search By Location"
                        variant="standard"
                        sx={{ width: '25ch' }}
                        color="success"
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                        onChange={handleSearchChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
                      />
                    )}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
            </Box>
            {
              ShowFilterList && searchQuery !== '' ?
                <>
                  <Box p={1}>
                    <Box display='flex' justifyContent='space-between'>
                      <Typography variant='h6' color='text.secondary'>Best Results</Typography>
                      <Typography color='#3285a8' onClick={resetFilter} sx={{ textDecoration: 'underline' }}>See All Lands</Typography>
                    </Box>
                    <Typography variant='caption'>({LandList && LandList.length})</Typography>
                  </Box>
                  {
                    LandList.length === 0 &&
                    <Box py={1}>
                      <Typography variant='h6' color='text.secondary'>Nothing Mathces Your Search Results. <Typography color='#3285a8' onClick={() => setShowFilterList(false)} sx={{ textDecoration: 'underline' }}>See All Lands</Typography></Typography>
                    </Box>
                  }
                  <Grid container spacing={1} display='flex' justifyContent='start' px={3}>
                    {LandList.map((i) => (
                      <Grid item xs={12} sm={6} md={4} lg={4} key={i.LandId} my={3}>
                        <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 5 }}>
                          <CardActionArea>
                            {Loading ? (
                              <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                            ) : (
                              <CardMedia
                                component="video"
                                height="170"
                                width='100%'
                                src={i.VirtualVideo}
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
                                    {i.LandId}
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
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                  <Button size="small" color="primary" onClick={() => handleLandOpenDialog(i)}>
                                    View
                                  </Button>


                                  <Button size="small" color="primary" onClick={() => handleOpenVerfiyDialog(i.LandId)}>
                                    Verify
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
                        count={LandList.length}
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
                    <Grid item xs={12} sm={6} md={4} lg={4} key={i.LandId} my={3}>
                      <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 5 }}>
                        <CardActionArea>
                          {Loading ? (
                            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                          ) : (
                            <CardMedia
                              component="video"
                              height="170"
                              width='100%'
                              src={i.VirtualVideo}
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
                                  {i.LandId}
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
                              <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                <Button size="small" color="primary" onClick={() => handleLandOpenDialog(i)}>
                                  View
                                </Button>


                                <Button size="small" color="primary" onClick={() => handleOpenVerfiyDialog(i.LandId)}>
                                  Verify
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
      </Container>
      </Box>
    </Box>
  )
}
