import React, {ChangeEvent, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Stack, TextField,
TablePagination, Autocomplete } from '@mui/material';
import { useState } from 'react';
import { Box , Container} from '@mui/material';
import axios from 'axios';
import { LandOwnerFiles, get_all_land_owner, get_state, methodGet } from '../../../API_Service/API_Service';
import Header from '../../../Header';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import LandDataDialog from './LandDataDialog';
import SnackBar from '../../SnackBar/SnackBar';


interface LandItem {
  LandOwnerId: string;
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
  Remarks: string;
}


interface State {
  StateId: string;
  StateName: string;
}

const ListedLands: React.FC = () => {

  const [state, setState] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
  const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  // const UserId: string | null = localStorage.getItem('UserId') ?? '';
  const UserType: string | null = localStorage.getItem('UserProfileType') ?? '';
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<LandItem | null>(null);
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


  const handleOpenDialog = (item : LandItem) => {
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

       



 const movedtoEditPage  = (id : string) =>{
    navigate('/updateaddedlands', {state:{id:id}})
 }

const handleSearchChange = (event: ChangeEvent<{} | any>, newValue: State | null) => {
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


    const removeSearchText = (index : number) => {
      if (index >= 0 && index < recentSearch.length) {
        const updatedRecentSearch = [...recentSearch];
        updatedRecentSearch.splice(index, 1);
        localStorage.setItem('RecentSearch', JSON.stringify(updatedRecentSearch));
        setRecentSearch(updatedRecentSearch);
      }
    };

  const resetFilter = () =>{
    setShowFilterList(false);
     setInputKey((prevKey) => prevKey + 1);
  }

  const handleClickOpenInvestor = (id: string) =>{
    navigate('/investerprofileform', {state: { id : id}})
  }

  const handleClickOpenProjectDev = (id: string) => {
    navigate('/goprojectdeveloperform', { state: { id: id } })
  }

  const handleClickOpenAdmin = (id: string) => {
    navigate('/adminprofileform', { state: { id: id } })
  }
  const handleClickOpenBuyer = (id: string) => {
    navigate('/buyersform', { state: { id: id } })
  }
  const handleClickOpenPlantation = (id: string) => {
    navigate('/planationform', { state: { id: id } })
  }
  const handleClickOpenCRI = (id: string) => {
    navigate('/cricarbonform', { state: { id: id } })
  }
  const handleClickOpenVVB = (id: string) => {
    navigate('/vvbform', { state: { id: id } })
  }
  const handleClickOpenGovt = (id: string) => {
    navigate('/govtagencyform', { state: { id: id } })
  }



    return (
        <Box>
           <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
             <Header isConnectedWallet={isConnectedWallet} />
            <Box p={1}>
            <LandDataDialog openDialog={openDialog} setOpenDialog={setOpenDialog} i={selectedItem} />

          <Container>
            <Box mb={1}>
              <Grid container mb={2} mt={2}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Box width='100%' textAlign='center' py={2}>
                    <Typography className="FormheadingName" sx={{fontSize:'2.8rem'}} > Listed Lands</Typography>                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>

           <Grid container spacing={2}  display='flex' justifyContent='space-between'>
       
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
          placeholder="Search Lands By Address, ID, Lat"
          variant="standard"
          sx={{ width: '25ch' }}
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
            <Typography color='primary' sx={{textDecoration:'underline'}} fontWeight={600}>Recent Searches</Typography>
           {
            recentSearch && recentSearch.map((i , index)=>
            <Typography sx={{marginBottom:1}} key={index}>{i}<CloseIcon sx={{verticalAlign:'middle'}} fontSize='small'  onClick={()=>removeSearchText(index)}/> </Typography>
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
            UserType !== 'Land owner' ?
           <Box display='flex' justifyContent='space-between' flexDirection='row'>
            {
            UserType === 'Investor' &&  
            <Button size="small" color="primary" onClick={() => handleClickOpenInvestor(i.LandOwnerId)}>Invest</Button>
            }
            {
            UserType === 'GoGreenverz or Project Developer' &&
            <Button size="small" color="primary" onClick={() => handleClickOpenProjectDev(i.LandOwnerId)}> GoProject Dev Form</Button>
            }
            {
            UserType === 'Plantation Partner' && 
            <Button size="small" color="primary" onClick={() => handleClickOpenPlantation(i.LandOwnerId)}>Add Plantation</Button>
            }
            {
            UserType === 'Verification and Validation Body' && 
           <Button size="small" color="primary" onClick={() => handleClickOpenVVB(i.LandOwnerId)}>VVB Form</Button>
            }
            {
            UserType === 'Carbon Registry of India' && 
            <Button size="small" color="primary" onClick={() => handleClickOpenCRI(i.LandOwnerId)}>CRI Form</Button>
            }
            {
            UserType === 'Government Agencies' && 
            <Button size="small" color="primary" onClick={() => handleClickOpenGovt(i.LandOwnerId)}>Govt Agency Form</Button>
            }
            {
            UserType === 'Admin' &&
            <Button size="small" color="primary" onClick={() => handleClickOpenAdmin(i.LandOwnerId)}>Admin Form</Button>
            }
            {
            UserType === 'Buyers' &&
            <Button size="small" color="primary" onClick={() => handleClickOpenBuyer(i.LandOwnerId)}>Buy Land</Button>
            }
              
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
            UserType !== 'Land owner' ?
              <Box display='flex' justifyContent='space-between' flexDirection='row'>
                {
                  UserType === 'Investor' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenInvestor(i.LandOwnerId)}>Invest</Button>
                }
                {
                  UserType === 'GoGreenverz or Project Developer' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenProjectDev(i.LandOwnerId)}> GoProject Dev Form</Button>
                }
                {
                  UserType === 'Plantation Partner' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenPlantation(i.LandOwnerId)}>Add Plantation</Button>
                }
                {
                  UserType === 'Verification and Validation Body' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenVVB(i.LandOwnerId)}>VVB Form</Button>
                }
                {
                  UserType === 'Carbon Registry of India' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenCRI(i.LandOwnerId)}>CRI Form</Button>
                }
                {
                  UserType === 'Government Agencies' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenGovt(i.LandOwnerId)}>Govt Agency Form</Button>
                }
                {
                  UserType === 'Admin' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenAdmin(i.LandOwnerId)}>Admin Form</Button>
                }
                {
                  UserType === 'Buyers' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenBuyer(i.LandOwnerId)}>Buy Land</Button>
                }

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
export default ListedLands;