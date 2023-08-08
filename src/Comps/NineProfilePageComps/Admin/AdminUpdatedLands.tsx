import React, { ChangeEvent, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    Button, CardActionArea, CardActions, Grid, Stack, 
    TablePagination, Container, InputBase
} from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { get_land_by_profile_users } from '../../../API_Service/API_Service';
import Header from '../../../Header';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import AdminLandDialog from './AdminLandDialog';


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


const AdminUpdatedLands: React.FC = () => {

    const [page, setPage] = useState<number>(0);
   const [rowsPerPage, setRowsPerPage] = useState<number>(8);
    const [data, setData] = useState<any[]>([]);
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';
    const UserProfileTypeId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<AdminData | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [ShowFilterList, setShowFilterList] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(true);
    const [recentSearch, setRecentSearch] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedRecentSearch = localStorage.getItem('RecentSearch');
        if (storedRecentSearch !== null) {
            const parsedRecentSearch = JSON.parse(storedRecentSearch);
            setRecentSearch(parsedRecentSearch);
        }
    }, []);

    useEffect(() => {
        const lData = new FormData()
        lData.append('UserId', UserId);
        lData.append('UserProfileTypeId', UserProfileTypeId);
        axios({
            method: 'POST',
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
    }, [UserToken])


    const handleOpenDialog = (item: AdminData) => {
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
        navigate('/updateaddedadmin', { state: { id: id } })
    }


    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        if (searchQuery !== '' || searchQuery !== null) {
        setRecentSearch([...recentSearch, searchQuery]);
        localStorage.setItem('RecentSearch', JSON.stringify(recentSearch));
       
            setShowFilterList(true);
            const filteredProducts = data && data.filter((i) => {
                const { AdminAddress1, AdminAddress2, AdminId, AdminCity, AdminState, AdminCountry, Latitude, Longitude } = i;
                // Apply the search logic based on your requirements
                const matchesCity = AdminCity.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesState = AdminState.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesAddress1 = AdminAddress1.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesAddress2 = AdminAddress2.toString().includes(searchQuery.toLowerCase());
                const matchesAdminCountry = AdminCountry.toString().includes(searchQuery.toLowerCase());
                const matchesLongitude = Longitude.toString().includes(searchQuery);
                const matchesAdminOwnerId = AdminId.toString().includes(searchQuery);
                const matchesLatitude = Latitude.toString().includes(searchQuery);

                return (
                    matchesCity ||
                    matchesState ||
                    matchesAddress1 ||
                    matchesAddress2 ||
                    matchesAdminCountry ||
                    matchesAdminOwnerId ||
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
    const AdminList = searchResults && searchResults.slice(page * rowsPerPage, (page + 1) * rowsPerPage);


    const resetFilter = () => {
        setShowFilterList(false);
    }



    return (
        <Box>
            <Header isConnectedWallet={isConnectedWallet} />
            <Box p={1}>
                <AdminLandDialog openDialog={openDialog} setOpenDialog={setOpenDialog} i={selectedItem} />

                <Container>
                    <Box mb={1}>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <Box width='100%' textAlign='center' py={2} className="text-container">
                                    <Typography className="FormheadingName" sx={{fontSize:'2.5rem' , fontWeight:700 ,letterSpacing:'0.3rem' , textTransform:'uppercase' }} >Submitted Lands</Typography>                  
                                    </Box>
                            </Grid>
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
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Container>
                <Grid container spacing={2} display='flex' justifyContent='space-between'>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {
                            ShowFilterList && searchQuery !== '' ?
                                <>
                                    <Box p={1}>
                                        <Box display='flex' justifyContent='space-between'>
                                            <Typography variant='h6' color='text.secondary'>Best Results</Typography>
                                            <Typography color='#3285a8' onClick={resetFilter} sx={{ textDecoration: 'underline' }}>View All</Typography>
                                        </Box>
                                        <Typography variant='caption'>({AdminList && AdminList.length})</Typography>
                                    </Box>
                                    {
                                        AdminList.length === 0 &&
                                        <Box py={1}>
                                            <Typography variant='h6' color='text.secondary'>Nothing Mathces Your Search Results. <Typography color='#3285a8' onClick={() => setShowFilterList(false)} sx={{ textDecoration: 'underline' }}>View All</Typography></Typography>
                                        </Box>
                                    }
                                    <Grid container spacing={1} display='flex' justifyContent='start' px={1}>
                                        {AdminList.map((i) => (
                                            <Grid item xs={12} sm={6} md={3} lg={3} key={i.AdminId} my={2}>
                                                <Card sx={{ maxWidth: 250, bgcolor: '#E0E3DE', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 5, borderRadius: '10px' }}>
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
                                                                    border: '2px solid #007bff', // Customize the outline color and thickness
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
                                                                        {i.AdminId}
                                                                    </Typography>
                                                                    <Stack spacing={1}>
                                                                        <Box display='flex' gap={1} flexDirection='row'>
                                                                                    <Typography variant="body2" color="#455636" fontWeight={600}>Located:</Typography>
                                                                                    <Typography variant="body2" color="#455636">{i.AdminCity}, {i.AdminState}, {i.AdminCountry}</Typography>
                                                                        </Box>
                                                                        <Box display='flex' gap={1} flexDirection='row'>
                                                                                    <Typography variant="body2" color="#455636" fontWeight={600}>Status:</Typography>
                                                                                    <Typography variant="body2" color="#455636"> {i.AdminStatus}</Typography>
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


                                                                        <Button size="small" sx={{ color: '#D6A31E' }} onClick={() => movedtoEditPage(i.AdminId)}>
                                                                    Update
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
                                                count={AdminList.length}
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
                                        <Grid item xs={12} sm={6} md={3} lg={3} key={i.id} my={2}>
                                            <Card sx={{ maxWidth: 250, bgcolor: '#E0E3DE',  height:'100%' , display:'flex',flexDirection:'column',  justifyContent:'space-between' , boxShadow:5 , borderRadius:'10px' }}>
                                                <Box p={2}>
                                                    <CardActionArea sx={{ bgcolor: '#fff', borderRadius: '5px' }}>
                                                    {Loading ? (
                                                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                                                    ) : (
                                                        <CardMedia
                                                            component="video"
                                                            height="170"
                                                            width='100%'
                                                            src={i?.VirtualVideo}
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
                                                                    {i.AdminId}
                                                                </Typography>
                                                                <Stack spacing={1}>
                                                                    <Box display='flex' gap={1} flexDirection='row'>
                                                                    <Typography variant="body2" color="#455636" fontWeight={600}>Located:</Typography>
                                                                    <Typography variant="body2" color='#455636'>{i.AdminCity}, {i.AdminState}, {i.AdminCountry}</Typography>
                                                                    </Box>
                                                                    <Box display='flex' gap={1} flexDirection='row'>
                                                                    <Typography variant="body2" color="#455636" fontWeight={600}>Status:</Typography>
                                                                    <Typography variant="body2" color='#455636'> {i.AdminStatus}</Typography>
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
                                                                    <Button size="small" sx={{ color:'#D6A31E'}} onClick={() => handleOpenDialog(i)}>
                                                                View
                                                            </Button>


                                                                    <Button size="small" sx={{ color: '#D6A31E' }} onClick={() => movedtoEditPage(i.AdminId)}>
                                                                Update
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
    );

};
export default AdminUpdatedLands;