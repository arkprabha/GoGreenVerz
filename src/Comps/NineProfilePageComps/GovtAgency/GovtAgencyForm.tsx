import { Box, Button, Grid, TextField, Stack, Autocomplete, Typography, Container } from "@mui/material";
import Header from '../../../Header';
import { add_government_agency, get_district,  get_state, methodGet, methodPost} from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";

interface GovtFormData {
            UserId: string;
            GovAgencyName: string;
            Email: string;
            MobileNum: string;
            AlternateMobile: string;
            CreationDate: string;
            ProjectCommenceDate: string;
            GovAgencyAddress1:string;
            GovAgencyAddress2:string;
            GovAgencyCity:any;
            GovAgencyState:any;
            GovAgencyPostalCode:string;
            GovAgencyCountry:string;
            RegulatoryGuidelines:string;
            AuditReport:string;
            ComplianceRecord:string;
            GovAgencyStatus:string;
            RegulatoryGuidelinesFile:File | null;
            AuditReportFile:File | null;
            ComplianceRecordFile:File | null;
            Remarks: string;
            LandId:string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface District {
  DistrictId: string;
  DistrictName: string;
}
interface LocationState {
    id: string;
}



export default function GovtAgencyForm() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobileNum, setMobileNum] = useState<string>('');
    const [alternateMobile, setAlternateMobile] = useState<string>('');
    const [GovAgencyAddress1, setGovAgencyAddress1] = useState<string>('');
    const [GovAgencyAddress2, setGovAgencyAddress2] = useState<string>('');
    const [GovAgencyCity, setGovAgencyCity] = useState<District | null>(null);
    const [GovAgencyState, setGovAgencyState] =useState<State | null>(null);
    const [GovAgencyPostalCode, setGovAgencyPostalCode] = useState<string>('');
    const [GovAgencyCountry, setGovAgencyCountry] = useState<string>('');
    const [RegulatoryGuidelines, setRegulatoryGuidelines] = useState<string>('');
    const [AuditReport, setAuditReport] = useState<string>('');
    const [ComplianceRecord, setComplianceRecord] = useState<string>('');
    const [GovAgencyStatus, setGovAgencyStatus] = useState<string>('');
    const [RegulatoryGuidelinesFile, setRegulatoryGuidelinesFile] = useState<File | null>(null);
    const [AuditReportFile, setAuditReportFile] = useState<File | null>(null);
    const [ComplianceRecordFile, setComplianceRecordFile] = useState<File | null>(null);
    const [creationDate, setCreationDate] = useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] = useState<string>('');
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
    const locationState = location.state as LocationState;
    const { id } = locationState;


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
        if(GovAgencyState !== null ){
            const lData = new FormData()
            lData.append('StateId', GovAgencyState.StateId.toString());
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

    }, [GovAgencyState])



    const handleSubmit = () => {
        const obj : GovtFormData = {
            UserId: UserId,
            GovAgencyName: name,
            LandId:id,
            Email: email,
            MobileNum: mobileNum,
            AlternateMobile: alternateMobile,
            CreationDate: creationDate,
            ProjectCommenceDate: projectCommenceDate,
            GovAgencyAddress1:GovAgencyAddress1,
            GovAgencyAddress2:GovAgencyAddress2,
            GovAgencyCity: GovAgencyCity?.DistrictName,
            GovAgencyState: GovAgencyState?.StateName,
            GovAgencyPostalCode:GovAgencyPostalCode,
            GovAgencyCountry:GovAgencyCountry,
            RegulatoryGuidelines:RegulatoryGuidelines,
            AuditReport:AuditReport,
            ComplianceRecord:ComplianceRecord,
            GovAgencyStatus:GovAgencyStatus,
            RegulatoryGuidelinesFile:RegulatoryGuidelinesFile,
            AuditReportFile:AuditReportFile,
            ComplianceRecordFile:ComplianceRecordFile,
            Remarks: Remarks
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: add_government_agency,
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
                    navigate('/govtsubmissions');
                }
            })
            .catch((err) => {
                alert("Oops something went wrong " + err);
            });
    };

    const Cancel = () => {
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
                                    <Typography className="FormheadingName" sx={{fontSize:'2rem'}} >Govt Agency Form</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box sx={{ px: 3, my: 2, mx: 3 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={3} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 2, pb: 2, pt: 2, borderColor: '#d2cbcb;', backgroundColor: '#daf6e8', borderRadius: '10px', ':hover': { boxShadow: 4 }, mt: 7 }}>
                                <Box sx={{ pb: 4, textAlign: 'left' }}>
                                    <h5>GOVERNMENT AGENCY ANALYSIS</h5>
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
                                            onChange={(e) => setGovAgencyAddress1(e.target.value)}
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
                                            onChange={(e) => setGovAgencyAddress2(e.target.value)}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setGovAgencyState(prevState => {
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
                                         onChange={(event, value: string | District | null) => setGovAgencyCity(prevCity => {
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
                                            onChange={(e) => setGovAgencyCountry(e.target.value)}
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
                                            onChange={(e) => setGovAgencyPostalCode(e.target.value)}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Regulatory Guidelines and Policies"
                                            label="Regulatory Guidelines and Policies"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setRegulatoryGuidelines(e.target.value)}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Regulatory Guidelines and Policies"
                                            label="Regulatory Guidelines and Policies"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                              onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setRegulatoryGuidelinesFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Audit Reports"
                                            label="Audit Reports"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setAuditReport(e.target.value)}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Audit Reports"
                                            label="Audit Reports"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                              onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setAuditReportFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Compliance Records"
                                            label="Compliance Records"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setComplianceRecord(e.target.value)}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Compliance Records"
                                            label="Compliance Records"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                              onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setComplianceRecordFile(file || null);
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
                                            onChange={(event, value) => setGovAgencyStatus(value || '')}
                                            options={['Active', 'Inactive']}
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
