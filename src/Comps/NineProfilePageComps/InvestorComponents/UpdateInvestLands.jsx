import { Box, Button, Grid, TextField, Stack, Autocomplete } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { appendData } from "../Variables/ProcessVariable";
import {add_investor } from "../API_Service/API_Service";
import axios from "axios";


export default function UpdateInvestLands() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNum, setMobileNum] = useState('');
    const [alternateMobile, setAlternateMobile] = useState('');
    const [InvestorAddress1, setInvestorAddress1] = useState('');
    const [InvestorAddress2, setInvestorAddress2] = useState('');
    const [InvestorCity, setInvestorCity] = useState('');
    const [InvestorState, setInvestorState] = useState('');
    const [InvestorPostalCode, setInvestorPostalCode] = useState('');
    const [InvestorCountry, setInvestorCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [projectCommenceDate, setProjectCommenceDate] = useState('');
    const [InvestorStatus, setInvestorStatus] = useState('');
    const [InvestmentPortfolio, setInvestmentPortfolio] = useState('');
    const [ProgressTracking, setProgressTracking] = useState('');
    const [ProgressTrackingFile, setProgressTrackingFile] = useState('');
    const [InvestmentPortfolioFile, setInvestmentPortfolioFile] = useState('');
    const [VirtualVideo, setVirtualVideo] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState('');
    const [termsAndConditionsFile, setTermsAndConditionsFile] = useState('');
    const [landSize, setLandSize] = useState('');
    const [Remarks, setRemarks] = useState('');
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");

    const UserToken = localStorage.getItem('UserToken');
    const UserId = localStorage.getItem('UserProfileTypeId');

    const handleSubmit = () => {
        const obj = {
            UserId: 2,
            InvestorName: name,
            Email: email,
            MobileNum: mobileNum,
            AlternateMobile: alternateMobile,
            InvestorAddress1: InvestorAddress1,
            InvestorAddress2: InvestorAddress2,
            InvestorCity: InvestorCity,
            InvestorState: InvestorState,
            InvestorPostalCode: InvestorPostalCode,
            InvestorCountry: InvestorCountry,
            Latitude: latitude,
            Longitude: longitude,
            CreationDate: creationDate,
            ProjectCommenceDate: projectCommenceDate,
            InvestorStatus: InvestorStatus,
            InvestmentPortfolio: InvestmentPortfolio,
            ProgressTracking: ProgressTracking,
            ProgressTrackingFile: ProgressTrackingFile,
            InvestmentPortfolioFile: InvestmentPortfolioFile,
            VirtualVideo: VirtualVideo,
            TermsAndConditionsFile: termsAndConditionsFile,
            Remarks: Remarks,
            TermsAndConditions: termsAndConditions,
            LandSize: landSize,
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
                }
            })
            .catch((err) => {
                alert("Oops something went wrong " + err);
            });
    };


    return (
        <Box>
        <Header />
        
            <Box sx={{ height: '90%' }} display="flex" alignItems="center">

                <Box py={4} sx={{ px: 5, backgroundColor: '#e5f4eb', borderRadius: '10px', mx: 3, my: 4, boxShadow: 11 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={4} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 4, pb: 5, pt: 4, borderColor: '#d2cbcb;', borderRadius: '4px', ':hover': { boxShadow: 2 }, mt: 5 }}>
                                <Box sx={{ pb: 5, textAlign: 'left' }}>
                                    <h5>EDIT INVESTOR INFORMATION</h5>
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

                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                            <TextField
                                                fullWidth
                                                id="Address"
                                                label="City"
                                                type="text"
                                                variant="outlined"
                                                size='small'
                                                color='secondary'
                                                onChange={(e) => setInvestorCity(e.target.value)}
                                            />
                                        </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }} >
                                            <TextField
                                                fullWidth
                                                id="Address"
                                                label="State"
                                                type="text"
                                                variant="outlined"
                                                size='small'
                                                color='secondary'
                                                onChange={(e) => setInvestorState(e.target.value)}
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
                                            onChange={(e) => setInvestmentPortfolioFile(e.target.files[0])}
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
                                            onChange={(e) => setProgressTrackingFile(e.target.files[0])}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
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
                                            value='L1D2'
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
                                                onChange={(e) => setLandSize(e.target.value)}
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
                                                onChange={(e) => setLongitude(e.target.value)}
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
                                                onChange={(e) => setLatitude(e.target.value)}
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
                                                onChange={(e) => setTermsAndConditions(e.target.value)}
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
                                                onChange={(e) => setTermsAndConditionsFile(e.target.files[0])}
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
                                                onChange={(e) => setVirtualVideo(e.target.files[0])}
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
                                                onChange={(e) => setRemarks(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                            <Autocomplete
                                                id="combo-box-demo"
                                                size="small"
                                                onChange={(event, value) => setInvestorStatus(value)}
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

                                        <Button fullWidth variant="outlined"
                                            type='cancel' sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828', ':hover': { borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>


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
