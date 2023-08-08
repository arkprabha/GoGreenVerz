import { Box, Button, Grid, TextField, Stack, Autocomplete, Typography, Container } from "@mui/material";
import Header from "../../../Header";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import { add_investor, get_land_by_profile_users } from "../../../API_Service/API_Service";
import axios from "axios";
import { get_city, get_state, methodGet, methodPost } from "../../../API_Service/API_Service";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";

interface InvestorData {
            UserId: string;
            InvestorName: string;
            Email: string;
            MobileNum: string;
            AlternateMobile:string;
            InvestorAddress1: string;
            InvestorAddress2:string;
            InvestorCity: any;
            InvestorState:any;
            InvestorPostalCode: string;
            InvestorCountry: string;
            CreationDate: string;
            ProjectCommenceDate: string;
            InvestorStatus: string;
            InvestmentPortfolio:string;
            ProgressTracking:string;
            ProgressTrackingFile: File | null;
            InvestmentPortfolioFile:  File | null;
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
interface LocationState {
    id: string;
}
export default function InvestForm() {


    const [name, setName] =  useState<string>('');
    const [email, setEmail] =  useState<string>('');
    const [mobileNum, setMobileNum] =  useState<string>('');
    const [alternateMobile, setAlternateMobile] =  useState<string>('');
    const [InvestorAddress1, setInvestorAddress1] =  useState<string>('');
    const [InvestorAddress2, setInvestorAddress2] =  useState<string>('');
    const [InvestorCity, setInvestorCity] = useState<City | null>(null);
    const [InvestorState, setInvestorState] =  useState<State | null>(null);
    const [InvestorPostalCode, setInvestorPostalCode] =  useState<string>('');
    const [InvestorCountry, setInvestorCountry] =  useState<string>('');
    const [latitude, setLatitude] =  useState<string>('');
    const [longitude, setLongitude] =  useState<string>('');
    const [LandcreationDate, setLandCreationDate] =  useState<string>('');
    const [LandprojectCommenceDate, setLandProjectCommenceDate] =  useState<string>('');
    const [creationDate, setCreationDate] = useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] = useState<string>('');
    const [InvestorStatus, setInvestorStatus] =  useState<string>('');
    const [InvestmentPortfolio, setInvestmentPortfolio] =  useState<string>('');
    const [ProgressTracking, setProgressTracking] =  useState<string>('');
    const [ProgressTrackingFile, setProgressTrackingFile] = useState<File | null>(null);
    const [InvestmentPortfolioFile, setInvestmentPortfolioFile] =  useState<File | null>(null);
    const [termsAndConditions, setTermsAndConditions] =  useState<string>('');
    const [termsAndConditionsFile, setTermsAndConditionsFile] = useState<string>('');
    const [landSize, setLandSize] =  useState<string>('');
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
    const [Remarks, setRemarks] = useState<string>('');
    const [landStatus, setLandStatus] = useState<string>('');
    const location = useLocation();
    const locationState = location.state as LocationState;
    const { id } = locationState;
    const UserProfileTypeId: string | null = localStorage.getItem('UserProfileTypeId') ?? '';

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

 // POST FETCH
    useEffect(() => {
        if(InvestorState !== null ){
            const lData = new FormData()
            lData.append('StateId', InvestorState.StateId);
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
                    setOpen(true)
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

    }, [InvestorState])


        useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('LandId', id);
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
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setLandSize(res.data.data.LandSize);
                    setLatitude(res.data.data.Latitude);
                    setLongitude(res.data.data.Longitude);
                    setTermsAndConditions(res.data.data.TermsAndConditions);
                    setLandCreationDate(res.data.data.CreationDate);
                    setLandProjectCommenceDate(res.data.data.ProjectCommenceDate);
                    setLandStatus(res.data.data.LandStatus);
                    setInvestorStatus(res.data.data.InvestorStatus);
                    setTermsAndConditionsFile(res.data.data.TermsAndConditionsFile)
                    setRemarks(res.data.data.LandRemarks);
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

    }, [id])



    const handleSubmit = () => {
        const obj : InvestorData =  {
            UserId: UserId,
            InvestorName: name,
            Email: email,
            MobileNum: mobileNum,
            AlternateMobile: alternateMobile,
            InvestorAddress1: InvestorAddress1,
            InvestorAddress2: InvestorAddress2,
            InvestorCity: InvestorCity?.CityName,
            InvestorState: InvestorState?.StateName,
            InvestorPostalCode: InvestorPostalCode,
            InvestorCountry: InvestorCountry,
            CreationDate: creationDate,
            ProjectCommenceDate: projectCommenceDate,
            InvestorStatus: InvestorStatus,
            InvestmentPortfolio: InvestmentPortfolio,
            ProgressTrackingFile: ProgressTrackingFile,
            InvestmentPortfolioFile: InvestmentPortfolioFile,
            ProgressTracking: ProgressTracking,
            LandId:id,
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: add_investor,
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
                    navigate('/investedlands')
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
            <Box sx={{ height: '90%' }} display="flex" flexDirection='column' alignItems="center">

                <Container>
                    <Box mb={1}>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Box width='100%' textAlign='center' py={2} className="text-container">
                                                                            <Typography className="FormheadingName" sx={{fontSize:'2.5rem' , fontWeight:700 ,letterSpacing:'0.3rem' ,textTransform:'uppercase' }} >Land Investment Form</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box py={4} sx={{ px: 5, backgroundColor: '#E0E3DE', mx: 3, my: 4,  boxShadow: 10 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={4} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 4, pb: 5, pt: 4, borderColor: '#d2cbcb;', borderRadius: '4px', ':hover': { boxShadow: 2 }, mt: 5 }}>
                                <Box sx={{ pb: 5, textAlign: 'left' }}>
                                    <h5>INVESTOR INFORMATION</h5>
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
                                                onChange={(e) => setName(e.target.value)}
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
                                                onChange={(e) => setMobileNum(e.target.value)}
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
                                                onChange={(e) => setAlternateMobile(e.target.value)}
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
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                onChange={(e) => setInvestorAddress1(e.target.value)}
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
                                            onChange={(e) => setInvestorAddress2(e.target.value)}
                                            />
                                        </Grid>

                                         <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setInvestorState(prevState => {
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

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | City | null) => setInvestorCity(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={CityList}
                                        getOptionLabel={(option) => (typeof option === 'object' ? option.CityName : '')}
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
                                                onChange={(e) => setInvestorCountry(e.target.value)}
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
                                                onChange={(e) => setInvestorPostalCode(e.target.value)}
                                            />
                                        </Grid>


                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Investment"
                                            label="Investment Portfolio"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setInvestmentPortfolio(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Investment"
                                            label="Investment Portfolio"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setInvestmentPortfolioFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Progress Tracking"
                                            label="Progress Tracking"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setProgressTracking(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Progress Tracking"
                                            label="Progress Tracking"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setProgressTrackingFile(file || null);
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
                                             onChange={(e) => setProjectCommenceDate(e.target.value)}
                                            value={projectCommenceDate}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            value={InvestorStatus}
                                            // onChange={(event, value) => setInvestorStatus(value || '')}
                                            options={['Active', 'In Review', 'Expired', 'On Hold', 'Sold']}
                                            renderInput={(params) => <TextField {...params} label="Status" />}
                                        />
                                    </Grid>

                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }}  >
                                    <Box sx={{ pb: 3, pt:1, textAlign: 'left' }}>
                                        <h5>SELECTED LAND INFORMATION</h5>
                                    </Box>
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="LandID"
                                            label="Land ID"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={id}
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
                                                // onChange={(e) => setLandSize(e.target.value)}
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
                                                // onChange={(e) => setLongitude(e.target.value)}
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
                                                // onChange={(e) => setLatitude(e.target.value)}
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
                                                // onChange={(e) => setTermsAndConditions(e.target.value)}
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
                                               value={LandcreationDate}
                                                // onChange={(e) => setCreationDate(e.target.value)}
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
                                               value={LandprojectCommenceDate}
                                                // onChange={(e) => setProjectCommenceDate(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>


                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <Box>
                                            <Typography>Terms & Conditions</Typography>
                                            {termsAndConditionsFile ? (
                                                <a href={termsAndConditionsFile} target="_blank" rel="noopener noreferrer">
                                                    <Typography variant="subtitle2" sx={{ wordWrap: 'break-word' }}>
                                                        {termsAndConditionsFile}
                                                    </Typography>
                                                </a>
                                            ) : (
                                                <Typography variant="subtitle2" sx={{ wordWrap: 'break-word' }}>
                                                    No file available
                                                </Typography>
                                            )}
                                        </Box>
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
                                                // onChange={(e) => setRemarks(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                            <Autocomplete
                                                id="combo-box-demo"
                                                size="small"
                                                value={landStatus}
                                                // onChange={(event, value) => setInvestorStatus(value || '')}
                                                options={['Active', 'In Review', 'Expired', 'On Hold', 'Sold']}
                                                renderInput={(params) => <TextField {...params} label="Status" />}
                                            />
                                        </Grid>

                                </Grid>
                            </Box>


                        </Grid >
                    </Grid>

                    {/* {buttons}  */}

                    <Grid container justifyContent='center' sx={{ textAlign: 'center', mt: 3 }}>
                        <Grid item lg={6} xl={6} xs={12} >
                            <Grid container justifyContent='space-evenly' alignItems='center'>
                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }} >
                                    <Stack spacing={2} direction="row" >
                                        <Button fullWidth variant="outlined"
                                        onClick={handleSubmit}
                                            sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': { borderColor: '#7bc54c', color: '#000000' } }}>Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">
                                        <Button fullWidth variant="outlined" onClick={Cancel}
                                        sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828', ':hover': { borderColor: '#c62828', color: '#000000' } }} >Cancel</Button>
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
