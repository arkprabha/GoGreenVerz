import { Box, Button, Grid, TextField, Stack, Autocomplete, Typography, Container } from "@mui/material";
import Header from "../../../Header";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import { get_district, get_project_developer, get_state, methodGet, methodPost, update_project_developer } from "../../../API_Service/API_Service";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";

interface GoProjectFormData {
            UserId: string;
            DeveloperName:string;
            Email:string;
            MobileNum:string;
            AlternateMobile:string;
            DeveloperAddress1:string;
            DeveloperAddress2:string;
            DeveloperCity:any;
            DeveloperState:any;
            DeveloperPostalCode:string;
            DeveloperCountry:string;
            MetaversePlatform:string;
            CommunicationHistory:string;
            DevelopmentReport:string;
            CreationDate:string;
            ProjectCommenceDate:string;
            DeveloperStatus:string;
            CommunicationHistoryFile:File | null;
            DevelopmentReportFile:File | null;
             Remarks: string;
            DeveloperId:string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface District {
  DistrictId: string;
  DistrictName: string;
}



export default function UpdateGoProjectForm() {

    const [name, setName] =useState<string>('');
    const [email, setEmail] =useState<string>('');
    const [mobileNum, setMobileNum] =useState<string>('');
    const [alternateMobile, setAlternateMobile] =useState<string>('');
    const [developerAddress1, setDeveloperAddress1] =useState<string>('');
    const [developerAddress2, setDeveloperAddress2] =useState<string>('');
    const [developerCity, setDeveloperCity] = useState<District | null>(null);
    const [developerState, setDeveloperState] = useState<State | null>(null);
    const [developerPostalCode, setDeveloperPostalCode] =useState<string>('');
    const [developerCountry, setDeveloperCountry] =useState<string>('');
    const [metaversePlatform, setMetaversePlatform] =useState<string>('');
    const [communicationHistory, setCommunicationHistory] =useState<string>('');
    const [developmentReport, setDevelopmentReport] =useState<string>('');
    const [creationDate, setCreationDate] =useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] =useState<string>('');
    const [developerStatus, setDeveloperStatus] =useState<string>('');
    const [communicationHistoryFile, setCommunicationHistoryFile] =useState<File | null>(null);
    const [developmentReportFile, setDevelopmentReportFile] =useState<File | null>(null);
    const [Remarks, setRemarks] =useState<string>('');
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
        if(developerState !== null ){
            const lData = new FormData()
            lData.append('StateId', developerState.StateId);
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

    }, [developerState])


    
 // FETCH ALL DATA

    useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('DeveloperId', id);
            axios({
                method: methodPost,
                url: get_project_developer,
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
                    setDeveloperAddress1(res.data.data.DeveloperAddress1);
                    setDeveloperAddress2(res.data.data.DeveloperAddress2);
                    setDeveloperCity(res.data.data.DeveloperCity || null);
                    setDeveloperState(res.data.data.DeveloperState || null);
                    setDeveloperPostalCode(res.data.data.DeveloperPostalCode);
                    setDeveloperCountry(res.data.data.DeveloperCountry);
                    setMetaversePlatform(res.data.data.MetaversePlatform);
                    setCommunicationHistory(res.data.data.CommunicationHistory);
                    setDevelopmentReport(res.data.data.DevelopmentReport);
                    setDeveloperStatus(res.data.data.DeveloperStatus);
                    setRemarks(res.data.data.Remarks);
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
        const obj : GoProjectFormData = {
            UserId: UserId,
            DeveloperName:name,
            DeveloperId:id,
            Email:email,
            MobileNum:mobileNum,
            AlternateMobile:alternateMobile,
            DeveloperAddress1:developerAddress1,
            DeveloperAddress2:developerAddress2,
            DeveloperCity: developerCity?.DistrictName,
            DeveloperState: developerState?.StateName,
            DeveloperPostalCode:developerPostalCode,
            DeveloperCountry:developerCountry,
            MetaversePlatform:metaversePlatform,
            CommunicationHistory:communicationHistory,
            DevelopmentReport:developmentReport,
            CreationDate:creationDate,
            ProjectCommenceDate:projectCommenceDate,
            DeveloperStatus:developerStatus,
            CommunicationHistoryFile:communicationHistoryFile,
            DevelopmentReportFile:developmentReportFile,
            Remarks:Remarks,
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_project_developer,
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
                    navigate('/devsubmittedlands');
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
                                    <Typography className="FormheadingName" sx={{fontSize:'2rem' , fontWeight:700}} >Edit Go_Project Developer Form</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>


                <Box sx={{ px: 3, my: 2, mx: 3 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={3} >
                        <Grid item lg={12} xl={12} >

                            <Box className='borderAnimae' sx={{  px: 2, pb: 2, pt: 2, backgroundColor: '#daf6e8',  ':hover': { boxShadow: 10 }, mt: 3 }}>
                                <Box sx={{ pb: 2, textAlign: 'left' }}>
                                    <h5>GO GREEN PROJECT DEVELOPER</h5>
                                </Box>
                                <Grid container justifyContent='start' spacing={2}>
                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="outlined-size-small"
                                            label="Name"
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
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

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
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

                                    <Grid item lg={3} sm={4} xl={3} xs={12} md={3} sx={{ py: 1 }}  >
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


                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Address_1"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={developerAddress1}
                                            onChange={(e) => setDeveloperAddress1(e.target.value)}
                                        />
                                    </Grid>


                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Address_2"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={developerAddress2}
                                            onChange={(e) => setDeveloperAddress2(e.target.value)}
                                        />
                                    </Grid>

                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setDeveloperState(prevState => {
                                                if (typeof value === 'string') {
                                                return null;
                                                } else {
                                                return value ?? prevState;
                                                }
                                            })}
                                        options={state}
                                        value={developerState}
                                        getOptionLabel={(option) => (typeof option === 'object'  ? option.StateName : option)}
                                        renderInput={(params) => <TextField {...params} label="State" />}
                                    />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | District | null) => setDeveloperCity(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={districtList}
                                        value={developerCity}
                                        getOptionLabel={(option) => (typeof option === 'object' ? option.DistrictName : option)}
                                        renderInput={(params) => <TextField {...params} label="City" />}
                                    />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Country"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={developerCountry}
                                            onChange={(e) => setDeveloperCountry(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Postal Code"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={developerPostalCode}
                                            onChange={(e) => setDeveloperPostalCode(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Metaverse Platform Management"
                                            label="Metaverse Platform Management"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={metaversePlatform}
                                            onChange={(e) => setMetaversePlatform(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Communication History"
                                            label="Communication History"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={communicationHistory}
                                            onChange={(e) => setCommunicationHistory(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Communication History"
                                            label="Communication History"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setCommunicationHistoryFile(file || null);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Development Reports"
                                            label="Project Development Reports"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={developmentReport}
                                            onChange={(e) => setDevelopmentReport(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Development Reports"
                                            label="Project Development Reports"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            InputLabelProps={{
                                                shrink: true,
                                            }} 
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setDevelopmentReportFile(file || null);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Creation Date"
                                            label="Creation Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            color='secondary'
                                            value={creationDate}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => setCreationDate(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Commence Date"
                                            label="Project Commence Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            color='secondary'
                                            value={projectCommenceDate}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => setProjectCommenceDate(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
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

                                    <Grid item lg={3} sm={12} xl={3} xs={12} md={4} sx={{ py: 1 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            value={developerStatus}
                                            options={['Active', 'Inactive', 'Suspended']}
                                            onChange={(event, value) => setDeveloperStatus(value || '')}
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
                                        <Button fullWidth variant="outlined"
                                        onClick={handleSubmit}
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
