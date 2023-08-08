import { Box, Button, Grid, TextField, Autocomplete, Stack, Typography, Container } from "@mui/material";
import Header from "../../../Header";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import {get_city, get_land_by_profile_users, get_state, methodGet, methodPost, update_land_owner } from "../../../API_Service/API_Service";
import axios from "axios";
import { useLocation, useNavigate} from "react-router-dom";
import SnackBar from "../../SnackBar/SnackBar";

interface LandOwnerData {
    UserId: string;
    LandOwnerName: string;
    Email: string;
    MobileNum: string;
    AlternateMobile: string;
    LandAddress1: string;
    LandAddress2: string;
    LandCity: any;
    LandState: any;
    LandPostalCode: string;
    LandCountry: string;
    LandSize: string;
    Latitude: string;
    Longitude: string;
    TermsAndConditions: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    LandStatus: string;
    VirtualVideo: File | null;
    TermsAndConditionsFile: File | null;
    LandRemarks: string;
    LandId:string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface City {
  CityId: string;
  CityName: string;
}


export default function UpdateAddedLands() {


    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobileNum, setMobileNum] = useState<string>('');
    const [alternateMobile, setAlternateMobile] = useState<string>('');
    const [landAddress1, setLandAddress1] = useState<string>('');
    const [landAddress2, setLandAddress2] = useState<string>('');
    const [landCity, setLandCity] = useState<City | null>(null);
    const [landState, setLandState] = useState<State | null>(null);
    const [landPostalCode, setLandPostalCode] = useState<string>('');
    const [landCountry, setLandCountry] = useState<string>('');
    const [landSize, setLandSize] = useState<string>('');
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [termsAndConditions, setTermsAndConditions] = useState<string>('');
    const [termsAndConditionsFile, setTermsAndConditionsFile] = useState<File | null>(null);
    const [creationDate, setCreationDate] = useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] = useState<string>('');
    const [landStatus, setLandStatus] = useState<string>('');
    const [VirtualVideo, setVirtualVideo] = useState<File | null>(null);
    const [Remarks, setRemarks] = useState<string>('');
    const [state, setState] = useState<State[]>([]);
    const [CityList, setCityList] = useState<City[]>([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [color, setColor] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';
    const UserProfileTypeId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';
    const location = useLocation();
    const {id} = location.state;

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
                    setOpen(false)
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


 // POST FETCH
    useEffect(() => {
        if(landState !== null){
            const lData = new FormData()
            lData.append('StateId', landState.StateId);
            axios({
                method: methodPost,
                url: get_city,
                data: lData,
                headers: {
                'Authorization': `Bearer ${UserToken}`,
            }
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(false)
                    setStatus(false)
                    setColor(false)
                    setCityList([])
                } else {
                    setMessage(res.data.message)
                    setCityList(res.data.data)
                    setOpen(false)
                    setStatus(true)
                    setColor(true)
                
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }
        else{
            setMessage('Select a State First');
        }

    }, [landState])


    useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('LandId', id);
            lData.append('UserId', UserId);
            lData.append('UserProfileTypeId', UserProfileTypeId);
            axios({
                method: methodPost,
                url: get_land_by_profile_users,
                data: lData,
                headers: {
                'Authorization': `Bearer ${UserToken}`,
            }
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(false)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setName(res.data.data.LandOwnerName);
                    setEmail(res.data.data.Email);
                    setMobileNum(res.data.data.MobileNum);
                    setAlternateMobile(res.data.data.AlternateMobile);
                    setLandAddress1(res.data.data.LandAddress1);
                    setLandAddress2(res.data.data.LandAddress2);
                    setLandPostalCode(res.data.data.LandPostalCode);
                    setLandCountry(res.data.data.LandCountry);
                    setLandState(res.data.data.LandState || null); 
                    setLandCity(res.data.data.LandCity || null); 
                    setLandSize(res.data.data.LandSize);
                    setLatitude(res.data.data.Latitude);
                    setLongitude(res.data.data.Longitude);
                    setTermsAndConditions(res.data.data.TermsAndConditions);
                    setCreationDate(res.data.data.CreationDate);
                    setProjectCommenceDate(res.data.data.ProjectCommenceDate);
                    setLandStatus(res.data.data.LandStatus);
                    setRemarks(res.data.data.Remarks);
                    setOpen(true)
                    setStatus(true)
                    setColor(true)
                
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }
    }, [id])

    

    const handleSubmit = () => {
        const obj : LandOwnerData = {
        UserId: UserId,
        LandOwnerName: name,
        LandId:id,
        Email: email,
        MobileNum: mobileNum,
        AlternateMobile:alternateMobile,
        LandAddress1:landAddress1,
        LandAddress2:landAddress2,
        LandCity: landCity?.CityName, 
        LandState:landState?.StateName,
        LandPostalCode: landPostalCode,
        LandCountry: landCountry,
        LandSize: landSize,
        Latitude: latitude,
        Longitude: longitude,
        TermsAndConditions: termsAndConditions,
        CreationDate: creationDate,
        ProjectCommenceDate: projectCommenceDate,
        LandStatus: landStatus,
        VirtualVideo:VirtualVideo,
        TermsAndConditionsFile: termsAndConditionsFile,
        LandRemarks: Remarks
        }
        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_land_owner,
            data: sendData,
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
                    navigate('/listedlands')
                }
            })
            .catch((err) => {
                alert("Oops something went wrong " + err);
            });
    };

 
    const Cancel = () =>{
        navigate(-1);
    }


    return (
        <Box>
             <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
           <Header isConnectedWallet={isConnectedWallet} />
            <Box display="flex" flexDirection='column' alignItems="center">

                <Container>
                    <Box mb={1}>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Box width='100%' textAlign='center' py={2} className="text-container">
                                                                            <Typography className="FormheadingName" sx={{fontSize:'2.5rem' , fontWeight:700 ,letterSpacing:'0.3rem' ,textTransform:'uppercase' }} >Edit Added Lands Information</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box sx={{ px: 4, backgroundColor: '#E0E3DE', mx: 4, my: 2, boxShadow: 10 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={2} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ px: 4 , py:1 , mt:2}}>
                                <Box sx={{ pb: 3, pt:1,  textAlign: 'left' }}>
                                    <h5>EDIT LANDS INFORMATION</h5>
                                </Box>

                                <Grid container justifyContent='start' spacing={2}>
                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Name"
                                            label="Name"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={name}
                                            onChange={(e)=>setName(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Ph No"
                                            label="Ph No"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={mobileNum}
                                            onChange={(e) => setMobileNum(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Ph No"
                                            label="Alternate Ph No"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={alternateMobile}
                                            onChange={(e) => setAlternateMobile(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Email"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Address_Line 1"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={landAddress1}
                                            onChange={(e) => setLandAddress1(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Address_Line 2"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={landAddress2}
                                            onChange={(e) => setLandAddress2(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                     
                               <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setLandState(prevState => {
                                                if (typeof value === 'string') {
                                                return null;
                                                } else {
                                                return value ?? prevState;
                                                }
                                            })}
                                        options={state}
                                        value={landState}
                                        getOptionLabel={(option) => (typeof option === 'object' ? option.StateName : option)}
                                        renderInput={(params) => <TextField {...params} label="State" />}
                                    />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | City | null) => setLandCity(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={CityList}
                                        value={landCity}
                                        getOptionLabel={(option) => (typeof option === 'object' ? option.CityName : option)}
                                        renderInput={(params) => <TextField {...params} label="City" />}
                                    />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Country"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={landCountry}
                                            onChange={(e) => setLandCountry(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Postal Code"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={landPostalCode}
                                            onChange={(e) => setLandPostalCode(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Land Size"
                                            label="Land Size"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={landSize}
                                            onChange={(e) => setLandSize(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Longtitude"
                                            label="Longtitude"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={longitude}
                                            onChange={(e) => setLongitude(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Lattitude"
                                            label="Lattitude"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={latitude}
                                            onChange={(e) => setLatitude(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Lease T&C"
                                            label="Lease Terms & Conditions"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={termsAndConditions}
                                            onChange={(e) => setTermsAndConditions(e.target.value)}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Lease Terms & Conditions"
                                            label="Lease Terms & Conditions"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setTermsAndConditionsFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Video"
                                            label="Virtual Tour/Video "
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setVirtualVideo(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Creation Date"
                                            label="Creation Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            value={creationDate}
                                            onChange={(e) => setCreationDate(e.target.value)}
                                            color='secondary'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Commence Date"
                                            label="Project Commence Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            color='secondary'
                                            value={projectCommenceDate}
                                            onChange={(e) => setProjectCommenceDate(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Remarks"
                                            label="Remarks"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={Remarks}
                                             InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => setRemarks(e.target.value)}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            value={landStatus}
                                            onChange={(event, value) => setLandStatus(value || '')}
                                            options={['Active', 'In Review', 'Expired', 'On Hold', 'Sold']}
                                            renderInput={(params) => <TextField {...params} label="Status" />}
                                        />
                                    </Grid>

                                </Grid>
                            </Box>


                        </Grid >
                    </Grid>

                    {/* {buttons}  */}

                    <Grid container justifyContent='center' sx={{ textAlign: 'center' }}>
                        <Grid item lg={6} xl={6} xs={12} >
                            <Grid container justifyContent='space-evenly' alignItems='center'>
                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }} >
                                    <Stack spacing={2} direction="row" >
                                        <Button fullWidth variant="outlined" onClick={handleSubmit}
                                       sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': { borderColor: '#7bc54c', color: '#000000' } }}>Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                        <Button fullWidth variant="outlined"
                                            onClick={Cancel} sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828', ':hover': { borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>


                                    </Stack>

                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>



            </Box >

            </Box>
        </Box>
    )
}
