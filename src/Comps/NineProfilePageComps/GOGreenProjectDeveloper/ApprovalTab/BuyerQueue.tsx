import React, { ChangeEvent, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Button, CardActionArea, CardActions, Grid, Stack, 
  TablePagination, InputBase
} from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import SnackBar from '../../../SnackBar/SnackBar';
import BuyerLandDialog from '../../Buyer/BuyerLandDialog';
import VerifyDialog from './VerifyDialog';

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
  BuyerStatus: string;
  LandId:string;
}

interface PropType {
  data: BuyerData[];
  Loading: boolean;
  getNotVerifiedLands: () => void;
}


function BuyerQueue({ data, Loading , getNotVerifiedLands }: PropType) {


  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  // const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  // const UserId: string | null = localStorage.getItem('UserId') ?? '';
  const UserProfileTypeId: string = '9';
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<BuyerData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<BuyerData[]>([]);
  const [ShowFilterList, setShowFilterList] = useState<boolean>(false);
  const [recentSearch, setRecentSearch] = useState<any[]>([]);
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


  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery !== '' || searchQuery !== null) {
      setRecentSearch([...recentSearch, searchQuery]);
      localStorage.setItem('RecentSearch', JSON.stringify(recentSearch));

      setShowFilterList(true);
      const filteredProducts = data && data.filter((i) => {
        const { BuyerAddress1, BuyerAddress2, BuyerId, BuyerCity, BuyerState, BuyerCountry, Latitude, Longitude } = i;
        // Apply the search logic based on your requirements
        const matchesCity = BuyerCity.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesState = BuyerState.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAddress1 = BuyerAddress1.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAddress2 = BuyerAddress2.toString().includes(searchQuery.toLowerCase());
        const matchesBuyerCountry = BuyerCountry.toString().includes(searchQuery.toLowerCase());
        const matchesLongitude = Longitude.toString().includes(searchQuery);
        const matchesBuyerOwnerId = BuyerId.toString().includes(searchQuery);
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

  const resetFilter = () => {
    setShowFilterList(false);
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
        <BuyerLandDialog openDialog={openDialog} setOpenDialog={setOpenDialog} i={selectedItem} />
        <VerifyDialog getNotVerifiedLands={getNotVerifiedLands} UserProfileTypeId={UserProfileTypeId} setOpen={setOpen} setMessage={setMessage} setColor={setColor} setStatus={setStatus} LandId={LandId} options={options} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} openVerifyDialog={openVerifyDialog} setOpenVerifyDialog={setOpenVerifyDialog} />


        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box display='flex' justifyContent='end'>

              <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '30ch' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Google Maps"
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={handleSearchChange}
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
                      <Typography color='#3285a8' onClick={resetFilter} sx={{ textDecoration: 'underline' }}>View All</Typography>
                    </Box>
                    <Typography variant='caption'>({BuyerList && BuyerList.length})</Typography>
                  </Box>
                  {
                    BuyerList.length === 0 &&
                    <Box py={1}>
                      <Typography variant='h6' color='text.secondary'>Nothing Mathces Your Search Results. <Typography color='#3285a8' onClick={() => setShowFilterList(false)} sx={{ textDecoration: 'underline' }}>View All</Typography></Typography>
                    </Box>
                  }
                  <Grid container spacing={1} display='flex' justifyContent='start' px={1}>
                    {BuyerList.map((i) => (
                      <Grid item xs={12} sm={6} md={3} lg={3} key={i.BuyerId} my={2}>
                        <Card sx={{ maxWidth: 250, bgcolor: '#E0E3DE', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 5 }}>
                          <Box p={2}>
                            <CardActionArea sx={{ bgcolor: '#fff', borderRadius: '5px' }}>
                              {Loading ? (
                                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                              ) : (
                                <CardMedia
                                  component="video"
                                  height="170"
                                  width='100%'
                                  src={i.VirtualVideo}
                                  controls
                                  style={{
                                    border: '1px solid #E0E3DE', // Customize the outline color and thickness
                                    boxSizing: 'border-box', // Ensure that the border doesn't affect the layout
                                  }}
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
                                    <Typography gutterBottom variant="h5" component="div" textAlign='left' color='#D6A31E'>
                                      {i.BuyerId}
                                    </Typography>
                                    <Stack spacing={1}>
                                      <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="#455636" fontWeight={600}>Located:</Typography>
                                        <Typography variant="body2" color="#455636">{i.BuyerCity}, {i.BuyerState}, {i.BuyerCountry}</Typography>
                                      </Box>
                                      <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="#455636" fontWeight={600}>Status:</Typography>
                                        <Typography variant="body2" color="#455636"> {i.BuyerStatus}</Typography>
                                      </Box>
                                    </Stack>
                                  </>
                                )}
                              </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ bgcolor: '#fff', borderRadius: '5px' }}>
                            {Loading ? (
                              <React.Fragment>
                                <Skeleton animation="wave" height={10} width="80%" />
                              </React.Fragment>
                            ) : (
                                <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                    <Button size="small" sx={{ color: '#D6A31E' }} onClick={() => handleOpenDialog(i)}>
                                    View
                                  </Button>


                                    <Button size="small" sx={{ color: '#D6A31E' }} onClick={() => handleOpenVerfiyDialog(i.LandId)}>
                                    Verify
                                  </Button>
                                </Box>
                            )}
                          </CardActions>
                          </Box>
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
                <Grid container spacing={1} display='flex' justifyContent='start' px={1}>
                  {slicedData.map((i) => (
                    <Grid item xs={12} sm={6} md={3} lg={3} key={i.BuyerId} my={2}>
                      <Card sx={{ maxWidth: 250, bgcolor: '#E0E3DE', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 5 }}>
                        <Box p={2}>
                          <CardActionArea sx={{ bgcolor: '#fff', borderRadius: '5px' }}>
                            {Loading ? (
                              <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                            ) : (
                              <CardMedia
                                component="video"
                                height="170"
                                width='100%'
                                src={i.VirtualVideo}
                                controls
                                style={{
                                  border: '1px solid #E0E3DE', // Customize the outline color and thickness
                                  boxSizing: 'border-box', // Ensure that the border doesn't affect the layout
                                }}
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
                                  <Typography gutterBottom variant="h5" component="div" textAlign='left' color='#D6A31E'>
                                    {i.BuyerId}
                                  </Typography>
                                  <Stack spacing={1}>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                      <Typography variant="body2" color="#455636" fontWeight={600}>Located:</Typography>
                                      <Typography variant="body2" color="#455636">{i.BuyerCity}, {i.BuyerState}, {i.BuyerCountry}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                      <Typography variant="body2" color="#455636" fontWeight={600}>Status:</Typography>
                                      <Typography variant="body2" color="#455636"> {i.BuyerStatus}</Typography>
                                    </Box>
                                  </Stack>
                                </>
                              )}
                            </CardContent>
                          </CardActionArea>
                          <CardActions sx={{ bgcolor: '#fff', borderRadius: '5px' }}>
                            {Loading ? (
                              <React.Fragment>
                                <Skeleton animation="wave" height={10} width="80%" />
                              </React.Fragment>
                            ) : (
                              <Box display='flex' justifyContent='space-between' flexDirection='row'>
                                <Button size="small" sx={{ color: '#D6A31E' }} onClick={() => handleOpenDialog(i)}>
                                  View
                                </Button>


                                <Button size="small" sx={{ color: '#D6A31E' }} onClick={() => handleOpenVerfiyDialog(i.LandId)}>
                                  Verify
                                </Button>
                              </Box>
                            )}
                          </CardActions>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TablePagination
                      component="div"
                      count={slicedData.length}
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
  )
}

export default BuyerQueue