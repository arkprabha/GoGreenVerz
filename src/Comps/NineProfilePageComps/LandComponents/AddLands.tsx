import { Box, Button, Grid, TextField, Stack, Autocomplete, Typography, Container } from "@mui/material";
import Header from '../../../Header';
import { appendData } from "../../../Variables/ProcessVariable";
import { add_land_owner, get_city, get_district, get_state, methodGet, methodPost } from "../../../API_Service/API_Service";
import axios from "axios";
import { useEffect, useState } from "react";
import SnackBar from "../../SnackBar/SnackBar";
import { useNavigate } from "react-router-dom";

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
    Remarks: string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface District {
  DistrictId: string;
  DistrictName: string;
}

export default function AddLands() {


    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobileNum, setMobileNum] = useState<string>('');
    const [alternateMobile, setAlternateMobile] = useState<string>('');
    const [landAddress1, setLandAddress1] = useState<string>('');
    const [landAddress2, setLandAddress2] = useState<string>('');
    const [landCity, setLandCity] = useState<District | null>(null);
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
    const [districtList, setDistrictList] = useState<District[]>([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [color, setColor] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';


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

 // POST FETCH
    useEffect(() => {
        if(landState !== null ){
            const lData = new FormData()
            lData.append('StateId', landState.StateId.toString());
            axios({
                method: methodPost,
                url: get_district,
                data: lData,
                headers: {
                'Authorization': `Bearer ${UserToken}`,
            }
            }).then(res => {
                if (res.data.error) {
                    setMessage(res.data.message)
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                    setDistrictList([])
                } else {
                    setMessage(res.data.message)
                    setDistrictList(res.data.data)
                    setOpen(true)
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

    //ALL CITY FETCH
    useEffect(() => {
        axios({
            method: methodGet,
            url: get_city,
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
                setOpen(true)
                setStatus(true)
                setColor(true)

            }
        }).catch(err => {
            alert('Oops something went wrong ' + err)
        });
    }, [])


    const handleSubmit = () => {
        const obj: LandOwnerData = {
            UserId: UserId,
            LandOwnerName: name,
            Email: email,
            MobileNum: mobileNum,
            AlternateMobile: alternateMobile,
            LandAddress1: landAddress1,
            LandAddress2: landAddress2,
            LandCity: landCity?.DistrictName,
            LandState: landState?.StateName,
            LandPostalCode: landPostalCode,
            LandCountry: landCountry,
            LandSize: landSize,
            Latitude: latitude,
            Longitude: longitude,
            TermsAndConditions: termsAndConditions,
            CreationDate: creationDate,
            ProjectCommenceDate: projectCommenceDate,
            LandStatus: landStatus,
            VirtualVideo: VirtualVideo,
            TermsAndConditionsFile: termsAndConditionsFile,
            Remarks: Remarks,
        };

        const sendData = appendData(obj);

        axios({
            method: 'POST',
            url: add_land_owner,
            data: sendData,
            headers: {
                'Authorization': `Bearer ${UserToken}`,
            },
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
                    navigate('/listedlands');
                }
            })
            .catch((err) => {
                alert('Oops something went wrong ' + err);
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
                        <Grid container mt={2}>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Box width='100%' textAlign='center' py={2} className="text-container">
                                    <Typography className="FormheadingName" sx={{fontSize:'2rem'}} >Add Your Lands</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box sx={{ px: 4, backgroundColor: '#daf6e8', borderRadius: '10px', mx: 4, my: 2, boxShadow: 11 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={2} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ px: 4, py: 1, mt: 2 }}>
                                <Box sx={{ pb: 3, pt: 1, textAlign: 'left' }}>
                                    <h5>ADD YOUR LANDS INFORMATION</h5>
                                </Box>

                                <Grid container justifyContent='start' spacing={2}>
                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Name"
                                            label="Name"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Ph No"
                                            label="Ph No"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setMobileNum(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Ph No"
                                            label="Alternate Ph No"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setAlternateMobile(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Email"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>


                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Address_Line 1"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLandAddress1(e.target.value)}
                                        />
                                    </Grid>


                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Address_Line 2"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLandAddress2(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
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
                                        getOptionLabel={(option) => (typeof option === 'object'  ? option.StateName : '')}
                                        renderInput={(params) => <TextField {...params} label="State" />}
                                    />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | District | null) => setLandCity(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={districtList}
                                        getOptionLabel={(option) => (typeof option === 'object' ? option.DistrictName : '')}
                                        renderInput={(params) => <TextField {...params} label="City" />}
                                    />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Country"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLandCountry(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Postal Code"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLandPostalCode(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Land Size"
                                            label="Land Size"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLandSize(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Longtitude"
                                            label="Longtitude"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLongitude(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Lattitude"
                                            label="Lattitude"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLatitude(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Lease T&C"
                                            label="Lease Terms & Conditions"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setTermsAndConditions(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
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

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
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

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Creation Date"
                                            label="Creation Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            onChange={(e) => setCreationDate(e.target.value)}
                                            color='secondary'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Commence Date"
                                            label="Project Commence Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setProjectCommenceDate(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Remarks"
                                            label="Remarks"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setRemarks(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
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

                                        <Button fullWidth variant="outlined" onClick={Cancel}
                                         sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828', ':hover': { borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>
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
