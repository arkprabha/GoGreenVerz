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
import {get_land_by_profile_users, get_land_details, get_state, methodGet, methodPost } from '../../../API_Service/API_Service';
import Header from '../../../Header';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import LandDataDialog from './LandDataDialog';
import SnackBar from '../../SnackBar/SnackBar';
import GoProjectLandDialog from '../GOGreenProjectDeveloper/GoProjectLandDialog';
import PlantationLandDialog from '../Planatation/PlantationLandDialog';
import VVBLandDialog from '../VVB/VVBLandDialog';
import CRILandDialog from '../CRI Carbon/CRILandDialog';
import GovtAgencyLandDialog from '../GovtAgency/GovtAgencyLandDialog';
import AdminLandDialog from '../Admin/AdminLandDialog';
// import BuyerLandDialog from '../Buyer/BuyerLandDialog';
import InvestorDataDialog from '../InvestorComponents/InvestorLandDialog';

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
interface AdminData {
  AdminId: string;
  AdminName: string;
  AdminAddress1: string;
  AdminAddress2: string;
  AdminCity: string;
  AdminState: string;
  AdminPostalCode: string;
  AdminCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  AdminStatus: string;
  LandId: string;
}

interface GovAgencyData {
  GovAgencyId: string;
  GovAgencyName: string;
  GovAgencyAddress1: string;
  GovAgencyAddress2: string;
  GovAgencyCity: string;
  GovAgencyState: string;
  GovAgencyPostalCode: string;
  GovAgencyCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  GovAgencyStatus: string;
  LandId: string;
}
// interface BuyerData {
//   BuyerId: string;
//   BuyerName: string;
//   BuyerAddress1: string;
//   BuyerAddress2: string;
//   BuyerCity: string;
//   BuyerState: string;
//   BuyerPostalCode: string;
//   BuyerCountry: string;
//   MobileNum: string;
//   Longitude: string;
//   Latitude: string;
//   LandSize: string;
//   VirtualVideo: string;
//   Remarks: string;
//   CreationDate: string;
//   ProjectCommenceDate: string;
//   BuyerStatus: String;
// }

interface CRIData {
  CRIId: string;
  CRIName: string;
  CRIAddress1: string;
  CRIAddress2: string;
  CRICity: string;
  CRIState: string;
  CRIPostalCode: string;
  CRICountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  CRIStatus: string;
  LandId:string;
}

interface GoProjectData {
  DeveloperId: string;
  DeveloperName: string;
  DeveloperAddress1: string;
  DeveloperAddress2: string;
  DeveloperCity: string;
  DeveloperState: string;
  DeveloperPostalCode: string;
  DeveloperCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  DeveloperStatus: String;
  LandId: string;
}

interface InvestorData {
  InvestorId: string;
  VirtualVideo: string;
  InvestorName: string;
  InvestorAddress1: string;
  InvestorAddress2: string;
  InvestorCity: string;
  InvestorState: string;
  InvestorCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  LandRemarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  InvestorStatus: string;
  LandId: string;
}


interface PlantationData {
  PlantationPartnerId: string;
  PlantationPartnerName: string;
  PlantationPartnerAddress1: string;
  PlantationPartnerAddress2: string;
  PlantationPartnerCity: string;
  PlantationPartnerState: string;
  PlantationPartnerPostalCode: string;
  PlantationPartnerCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  PlantationPartnerStatus: string;
  LandId: string;
}

interface VVBData {
  VVBId: string;
  VVBName: string;
  VVBAddress1: string;
  VVBAddress2: string;
  VVBCity: string;
  VVBState: string;
  VVBPostalCode: string;
  VVBCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  VVBStatus: string;
  LandId: string;
}




interface State {
  StateId: string;
  StateName: string;
}

const ListedLands: React.FC = () => {

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
  // const UserId: string | null = localStorage.getItem('UserId') ?? '';
  const UserType: string | null = localStorage.getItem('UserProfileType') ?? '';

  const [selectedLandItem, setSelectedLandItem] = useState<LandItem | null>(null);
  const [selectedAdminItem, setSelectedAdminItem] = useState<AdminData | null>(null);
  // const [selectedBuyerItem, setSelectedBuyerItem] = useState<BuyerData | null>(null);
  const [selectedCRIItem, setSelectedCRIItem] = useState<CRIData | null>(null);
  const [selectedDevItem, setSelectedDevItem] = useState<GoProjectData | null>(null);
  const [selectedInvestorItem, setSelectedInvestorItem] = useState<InvestorData | null>(null);
  const [selectedPlantItem, setSelectedPlantItem] = useState<PlantationData | null>(null);
  const [selectedVVBItem, setSelectedVVBItem] = useState<VVBData | null>(null);
  const [selectedGovtItem, setSelectedGovtItem] = useState<GovAgencyData | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [ShowFilterList, setShowFilterList] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);
  const [recentSearch, setRecentSearch] = useState<any[]>([]);
  const [inputKey, setInputKey] = useState<number>(0);
  const navigate = useNavigate();
  const UserId: string | null = localStorage.getItem('UserId') ?? '';
  const UserProfileTypeId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';

  // Dialog 
  const [openLandDialog, setOpenLandDialog] = useState<boolean>(false);
  const [openInvestorDialog, setOpenInvestorDialog] = useState<boolean>(false);
  const [openDeveloperDialog, setOpenDeveloperDialog] = useState<boolean>(false);
  const [openPlantDialog, setOpenPlantDialog] = useState<boolean>(false);
  const [openVVBDialog, setOpenVVBDialog] = useState<boolean>(false);
  const [openCRIDialog, setOpenCRIDialog] = useState<boolean>(false);
  const [openGovtDialog, setOpenGovtDialog] = useState<boolean>(false);
  const [openAdminDialog, setOpenAdminDialog] = useState<boolean>(false);
  // const [openBuyerDialog, setOpenBuyerDialog] = useState<boolean>(false);

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
    if(UserType !== 'Land owner'){
      const lData = new FormData()
      lData.append('UserProfileTypeId', UserProfileTypeId);
       axios({
           method: 'POST',
            url: get_land_details,
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
          }
          // This is for particular Land Owner 
      else {
      const lData = new FormData()
      lData.append('UserId', UserId);
      lData.append('UserProfileTypeId', UserProfileTypeId);
      axios({
        method: methodPost,
        url: get_land_by_profile_users,  
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
          }
   }, [UserToken])


  const handleLandOpenDialog = (item : LandItem) => {
    setSelectedLandItem(item);
    setOpenLandDialog(true);
  };

  const handleOpenInvestorDialog = (item : InvestorData) => {
    setSelectedInvestorItem(item);
    setOpenInvestorDialog(true);
  };


  const handleOpenDevDialog = (item : GoProjectData) => {
    setSelectedDevItem(item);
    setOpenDeveloperDialog(true);
  };


  const handleOpenPlantDialog = (item : PlantationData) => {
    setSelectedPlantItem(item);
    setOpenPlantDialog(true);
  };

  const handleOpenVVBDialog = (item : VVBData) => {
    setSelectedVVBItem(item);
    setOpenVVBDialog(true);
  };

  const handleOpenCRIDialog = (item : CRIData) => {
    setSelectedCRIItem(item);
    setOpenCRIDialog(true);
  };

  const handleOpenGovtDialog = (item : GovAgencyData) => {
    setSelectedGovtItem(item);
    setOpenGovtDialog(true);
  };


  const handleOpenAdminDialog = (item : AdminData) => {
    setSelectedAdminItem(item);
    setOpenAdminDialog(true);
  };

  // const handleOpenBuyerDialog = (item : BuyerData) => {
  //   setSelectedBuyerItem(item);
  //   setOpenBuyerDialog(true);
  // };




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
  const selectedValue = newValue ? newValue.StateName : event.target.value ;
  setSearchQuery(selectedValue);
};

  const handleSearch = () => {
    if (searchQuery !== '' || searchQuery !== null) {
    setRecentSearch([...recentSearch , searchQuery]);
    localStorage.setItem('RecentSearch', JSON.stringify(recentSearch));
    setShowFilterList(true);
    const filteredProducts = data && data.filter((i) => {
    const {LandAddress1, LandAddress2 ,LandId, LandCity, LandState, LandCountry, Latitude, Longitude } = i;
      // Apply the search logic based on your requirements
      const matchesCity = LandCity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = LandState.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAddress1 = LandAddress1.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAddress2 = LandAddress2.toString().includes(searchQuery.toLowerCase());
      const matchesLandCountry = LandCountry.toString().includes(searchQuery.toLowerCase());
      const matchesLongitude = Longitude.toString().includes(searchQuery);
      const matchesLandId = LandId.toString().includes(searchQuery);
      const matchesLatitude = Latitude.toString().includes(searchQuery);

      return (
        matchesCity ||
        matchesState ||
        matchesAddress1 ||
        matchesAddress2 ||
        matchesLandCountry ||
        matchesLandId ||
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

          <LandDataDialog openDialog={openLandDialog} setOpenDialog={setOpenLandDialog} i={selectedLandItem} />
          <InvestorDataDialog openDialog={openInvestorDialog} setOpenDialog={setOpenInvestorDialog} i={selectedInvestorItem} />
          <GoProjectLandDialog openDialog={openDeveloperDialog} setOpenDialog={setOpenDeveloperDialog} i={selectedDevItem} />
          <PlantationLandDialog openDialog={openPlantDialog} setOpenDialog={setOpenPlantDialog} i={selectedPlantItem} />
          <VVBLandDialog openDialog={openVVBDialog} setOpenDialog={setOpenVVBDialog} i={selectedVVBItem} />
          <CRILandDialog openDialog={openCRIDialog} setOpenDialog={setOpenCRIDialog} i={selectedCRIItem} />
          <GovtAgencyLandDialog openDialog={openGovtDialog} setOpenDialog={setOpenGovtDialog} i={selectedGovtItem} />
          <AdminLandDialog openDialog={openAdminDialog} setOpenDialog={setOpenAdminDialog} i={selectedAdminItem} />
          {/* <BuyerLandDialog openDialog={openBuyerDialog} setOpenDialog={setOpenBuyerDialog} i={selectedBuyerItem} /> */}


          <Container>
            <Box mb={1}>
              <Grid container>
                <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box width='100%' textAlign='center' py={2} className="text-container">
                    <Typography className="FormheadingName" sx={{fontSize:'2.5rem' , fontWeight:700 ,letterSpacing:'0.8rem'}} > Listed Lands</Typography> </Box>
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
            <Box py={3}>
            <Stack spacing={2}>
            <Typography color='#008080' sx={{textDecoration:'underline'}} fontWeight={600}>Recent Searches</Typography>
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
           <Card sx={{ maxWidth: 300 , height:'100%' , display:'flex',flexDirection:'column',  justifyContent:'space-between' , boxShadow:5 }}>
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
          <>
            {
            UserType !== 'Land owner' ?
           <Box display='flex' justifyContent='space-between' flexDirection='row'>
  {/* Add Form */}
            {
            UserType === 'Investor' &&  
            <Button size="small" color="primary" onClick={() => handleClickOpenInvestor(i.LandId)}>Invest</Button>
            }
            {
            UserType === 'GoGreenverz or Project Developer' &&
            <Button size="small" color="primary" onClick={() => handleClickOpenProjectDev(i.LandId)}> GoProject Dev Form</Button>
            }
            {
            UserType === 'Plantation Partner' && 
            <Button size="small" color="primary" onClick={() => handleClickOpenPlantation(i.LandId)}>Add Plantation</Button>
            }
            {
            UserType === 'Verification and Validation Body' && 
           <Button size="small" color="primary" onClick={() => handleClickOpenVVB(i.LandId)}>VVB Form</Button>
            }
            {
            UserType === 'Carbon Registry of India' && 
            <Button size="small" color="primary" onClick={() => handleClickOpenCRI(i.LandId)}>CRI Form</Button>
            }
            {
            UserType === 'Government Agencies' && 
            <Button size="small" color="primary" onClick={() => handleClickOpenGovt(i.LandId)}>Govt Agency Form</Button>
            }
            {
            UserType === 'Admin' &&
            <Button size="small" color="primary" onClick={() => handleClickOpenAdmin(i.LandId)}>Admin Form</Button>
            }
            {
            UserType === 'Buyers' &&
            <Button size="small" color="primary" onClick={() => handleClickOpenBuyer(i.LandId)}>Buy Land</Button>
            }


{/* View Button */}
            {
              UserType === 'Investor' &&
              <Button size="small" color="primary" onClick={() => handleLandOpenDialog(i)}>View</Button>
            }
            {
              UserType === 'GoGreenverz or Project Developer' &&
              <Button size="small" color="primary" onClick={() => handleOpenInvestorDialog(i)}>View</Button>
            }
            {
              UserType === 'Plantation Partner' &&
              <Button size="small" color="primary" onClick={() => handleOpenDevDialog(i)}>View</Button>
            }
            {
              UserType === 'Verification and Validation Body' &&
              <Button size="small" color="primary" onClick={() => handleOpenPlantDialog(i)}>View</Button>
            }
            {
              UserType === 'Carbon Registry of India' &&
              <Button size="small" color="primary" onClick={() => handleOpenVVBDialog(i)} >View</Button>
            }
            {
              UserType === 'Government Agencies' &&
              <Button size="small" color="primary" onClick={() => handleOpenCRIDialog(i)} >View</Button>
            }
            {
              UserType === 'Admin' &&
              <Button size="small" color="primary" onClick={() => handleOpenGovtDialog(i)} >View</Button>
            }
            {
              UserType === 'Buyers' &&
              <Button size="small" color="primary" onClick={() => handleOpenAdminDialog(i)} >View</Button>
            }

            </Box>
            :
            <Box display='flex' justifyContent='space-between' flexDirection='row'>
            <Button size="small" color="primary" onClick={()=>handleLandOpenDialog(i)}>
            View
            </Button>
         

            <Button size="small" color="primary" onClick={()=>movedtoEditPage(i.LandId)}>
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
          <Grid item xs={12} sm={6} md={4} lg={4} key={i.id} my={3}>
           <Card sx={{ maxWidth: 300 , height:'100%' , display:'flex',flexDirection:'column',  justifyContent:'space-between', boxShadow:5 }}>
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
          <>
          {
            UserType !== 'Land owner' ?
              <Box display='flex' justifyContent='space-between' flexDirection='row'>
                {
                  UserType === 'Investor' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenInvestor(i.LandId)}>Invest</Button>
                }
                {
                  UserType === 'GoGreenverz or Project Developer' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenProjectDev(i.LandId)}> GoProject Dev Form</Button>
                }
                {
                  UserType === 'Plantation Partner' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenPlantation(i.LandId)}>Add Plantation</Button>
                }
                {
                  UserType === 'Verification and Validation Body' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenVVB(i.LandId)}>VVB Form</Button>
                }
                {
                  UserType === 'Carbon Registry of India' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenCRI(i.LandId)}>CRI Form</Button>
                }
                {
                  UserType === 'Government Agencies' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenGovt(i.LandId)}>Govt Agency Form</Button>
                }
                {
                  UserType === 'Admin' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenAdmin(i.LandId)}>Admin Form</Button>
                }
                {
                  UserType === 'Buyers' &&
                  <Button size="small" color="primary" onClick={() => handleClickOpenBuyer(i.LandId)}>Buy Land</Button>
                }

{/* View Button */}
            {
            UserType === 'Investor' &&
            <Button size="small" color="primary" onClick={() => handleLandOpenDialog(i)}>View</Button>
            }
            {
            UserType === 'GoGreenverz or Project Developer' &&
            <Button size="small" color="primary" onClick={() => handleOpenInvestorDialog(i)}>View</Button>
            }
            {
            UserType === 'Plantation Partner' &&
            <Button size="small" color="primary" onClick={() => handleOpenDevDialog(i)}>View</Button>
            }
            {
            UserType === 'Verification and Validation Body' &&
             <Button size="small" color="primary" onClick={() => handleOpenPlantDialog(i)}>View</Button>
            }
            {
            UserType === 'Carbon Registry of India' &&
            <Button size="small" color="primary" onClick={() => handleOpenVVBDialog(i)} >View</Button>
            }
            {
            UserType === 'Government Agencies' &&
            <Button size="small" color="primary" onClick={() => handleOpenCRIDialog(i)} >View</Button>
            }
            {
            UserType === 'Admin' &&
            <Button size="small" color="primary" onClick={() => handleOpenGovtDialog(i)} >View</Button>
            }
            {
            UserType === 'Buyers' &&
            <Button size="small" color="primary" onClick={() => handleOpenAdminDialog(i)} >View</Button>
            }
            </Box>
            :
            <Box display='flex' justifyContent='space-between' flexDirection='row'>
            <Button size="small" color="primary" onClick={()=>handleLandOpenDialog(i)}>
            View
            </Button>


            <Button size="small" color="primary" onClick={()=>movedtoEditPage(i.LandId)}>
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