import { Box, Button, Grid, TextField, Stack, Autocomplete, Typography, Container } from "@mui/material";
import Header from '../../../Header';
import { get_cri, get_district, get_state, methodGet, methodPost, update_cri} from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";


interface CRIFormData {
            UserId:string;
            CRIName: string;
            Email: string;
            MobileNum: string;
            AlternateMobile: string;
            CreationDate: string;
            ProjectCommenceDate: string;
            CRIAddress1:string;
            CRIAddress2:string;
            CRICity:any;
            CRIState:any;
            CRIPostalCode:string;
            CRICountry:string;
            CCRegistry:string;
            CCReport:string;
            CCTradingHistory:string;
            CRIStatus:string;
            CCRegistryFile:File | null;
            CCReportFile:File | null;
            CCTradingHistoryFile:File | null;
            Remarks: string;
            CRIId: string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface District {
  DistrictId: string;
  DistrictName: string;
}


export default function UpdateCRICarbonForm() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] =useState<string>('');
    const [mobileNum, setMobileNum] =useState<string>('');
    const [alternateMobile, setAlternateMobile] =useState<string>('');
    const [CRIAddress1, setCRIAddress1] =useState<string>('');
    const [CRIAddress2, setCRIAddress2] =useState<string>('');
    const [CRICity, setCRICity] = useState<District | null>(null);
    const [CRIState, setCRIState] = useState<State | null>(null);
    const [CRIPostalCode, setCRIPostalCode] =useState<string>('');
    const [CRICountry, setCRICountry] =useState<string>('');
    const [CCRegistry, setCCRegistry] =useState<string>('');
    const [CCReport, setCCReport] =useState<string>('');
    const [CCTradingHistory, setCCTradingHistory] =useState<string>('');
    const [creationDate, setCreationDate] =useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] =useState<string>('');
    const [CRIStatus, setCRIStatus] =useState<string>('');
    const [CCRegistryFile, setCCRegistryFile] = useState<File | null>(null);
    const [CCReportFile, setCCReportFile] =  useState<File | null>(null);
    const [CCTradingHistoryFile, setCCTradingHistoryFile] =  useState<File | null>(null);
    const [Remarks, setRemarks] = useState<string>('');
    const [state, setState] = useState<State[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [color, setColor] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';

    const navigate = useNavigate();
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
        if(CRIState !== null ){
            const lData = new FormData()
            lData.append('StateId', CRIState.StateId.toString());
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

    }, [CRIState])


// FETCH ALL DATA

    useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('CRIId', id);
            axios({
                method: methodPost,
                url: get_cri,
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
                    setName(res.data.data.VVBName);
                    setEmail(res.data.data.Email);
                    setMobileNum(res.data.data.MobileNum);
                    setAlternateMobile(res.data.data.AlternateMobile);
                    setCreationDate(res.data.data.CreationDate);
                    setProjectCommenceDate(res.data.data.ProjectCommenceDate);
                    setCRIAddress1(res.data.data.CRIAddress1);
                    setCRIAddress2(res.data.data.CRIAddress2);
                    // setCRICity(res.data.data.CRICity);
                    // setCRIState(res.data.data.CRIState);
                    setCRIPostalCode(res.data.data.CRIPostalCode);
                    setCRICountry(res.data.data.CRICountry);
                    setCCRegistry(res.data.data.CCRegistry);
                    setCCReport(res.data.data.CCReport);
                    setCCTradingHistory(res.data.data.CCTradingHistory);
                    setCRIStatus(res.data.data.CRIStatus);
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

    }, [id])


    const handleSubmit = () => {
        const obj : CRIFormData = {
            UserId: UserId,
            CRIName: name,
            CRIId:id,
            Email: email,
            MobileNum: mobileNum,
            AlternateMobile: alternateMobile,
            CreationDate: creationDate,
            ProjectCommenceDate: projectCommenceDate,
            CRIAddress1:CRIAddress1,
            CRIAddress2:CRIAddress2,
            CRICity: CRICity?.DistrictName,
            CRIState: CRIState?.StateName,
            CRIPostalCode:CRIPostalCode,
            CRICountry:CRICountry,
            CCRegistry:CCRegistry,
            CCReport:CCReport,
            CCTradingHistory:CCTradingHistory,
            CRIStatus:CRIStatus,
            CCRegistryFile:CCRegistryFile,
            CCReportFile:CCReportFile,
            CCTradingHistoryFile:CCTradingHistoryFile,
            Remarks: Remarks,
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_cri,
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
                    navigate('/crisubmissions');
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
            <Box display="flex" alignItems="center" flexDirection='column' fontSize={15}>

                <Container>
                    <Box mb={1}>
                        <Grid container mt={2}>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Box width='100%' textAlign='center' py={2} className="text-container">
                                    <Typography className="FormheadingName" sx={{fontSize:'2rem'}} >Edit CRI Submission Form</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box sx={{ px: 3, my: 2, mx: 3 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={3} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 2, pb: 2, pt: 2, borderColor: '#d2cbcb;', backgroundColor: '#daf6e8', borderRadius: '10px', ':hover': { boxShadow: 4 }, mt: 7 }}>
                                <Box sx={{ pb: 2, textAlign: 'left' }}>
                                    <h5>UPDATE CRI CARBON DETAILS</h5>
                                </Box>

                                <Grid container justifyContent='start' spacing={2}>
                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Name"
                                            label="Name"
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            value={name}
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
                                            value={mobileNum}
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
                                            value={alternateMobile}
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
                                            value={email}
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
                                            value={CRIAddress1}
                                            onChange={(e) => setCRIAddress1(e.target.value)}
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
                                            value={CRIAddress2}
                                            onChange={(e) => setCRIAddress2(e.target.value)}
                                        />
                                    </Grid>

                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setCRIState(prevState => {
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
                                         onChange={(event, value: string | District | null) => setCRICity(prevCity => {
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

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Country"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={CRICountry}
                                            onChange={(e) => setCRICountry(e.target.value)}
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
                                            value={CRIPostalCode}
                                            onChange={(e) => setCRIPostalCode(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Registry "
                                            label="Carbon Credit Registry "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={CCRegistry}
                                            onChange={(e) => setCCRegistry(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Registry "
                                            label="Carbon Credit Registry "
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setCCRegistryFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Generation Reports"
                                            label="Carbon Credit Generation Reports"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={CCReport}
                                            onChange={(e) => setCCReport(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Generation Reports"
                                            label="Carbon Credit Generation Reports"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setCCReportFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Trading History"
                                            label="Carbon Credit Trading History"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={CCTradingHistory}
                                            onChange={(e) => setCCTradingHistory(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Trading History"
                                            label="Carbon Credit Trading History"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setCCTradingHistoryFile(file || null);
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
                                            color='secondary'
                                            value={creationDate}
                                            onChange={(e) => setCreationDate(e.target.value)}
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
                                            onChange={(e) => setRemarks(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            value={CRIStatus}
                                            onChange={(event, value) => setCRIStatus(value || '')}
                                            options={['Active', 'Inactive', 'Expired']}
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
                                            sx={{
                                                color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c',
                                                ':hover': { borderColor: '#7bc54c', color: '#000000' }
                                            }}
                                        >Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                        <Button fullWidth variant="outlined" onClick={Cancel}
                                            sx={{
                                                color: 'white', backgroundColor: '#c62828', borderColor: '#c62828',
                                                ':hover': { borderColor: '#c62828', color: '#000000' }
                                            }}
                                        >Cancel</Button>
                                    </Stack>

                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>

                </Box>


            </Box>
        </Box>
    )
}
