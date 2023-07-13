import { Box, Button, Grid, TextField, Stack, Autocomplete, Typography, Container } from "@mui/material";
import Header from '../../../Header';
import {get_city, get_state, get_vvb, methodGet, methodPost, update_vvb } from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";


interface VVBFormData {
        UserId:string;
        VVBName:string;
        Email:string;
        MobileNum:string;
        AlternateMobile:string;
        VVBAddress1:string;
        VVBAddress2:string;
        VVBCity:any;
        VVBState:any;
        VVBPostalCode:string;
        VVBCountry:string;
        AccreditationInformation:string;
        ProjectVerify:string;
        InspectionFindings:string;
        CarbonCredit:string;
        CreationDate:string;
        ProjectCommenceDate:string;
        VVBStatus:string;
        AccreditationInformationFile:File | null;
        ProjectVerifyFile:File | null;
        InspectionFindingsFile:File | null;
        VVBId:string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface City {
  CityId: string;
  CityName: string;
}



export default function UpdateVVBForm() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobileNum, setMobileNum] = useState<string>('');
    const [alternateMobile, setAlternateMobile] = useState<string>('');
    const [VVBAddress1, setVVBAddress1] = useState<string>('');
    const [VVBAddress2, setVVBAddress2] = useState<string>('');
    const [VVBCity, setVVBCity] = useState<City | null>(null);
    const [VVBState, setVVBState] = useState<State | null>(null);
    const [VVBPostalCode, setVVBPostalCode] = useState<string>('');
    const [VVBCountry, setVVBCountry] = useState<string>('');
    const [AccreditationInformation, setAccreditationInformation] = useState<string>('');
    const [ProjectVerify, setProjectVerify] = useState<string>('');
    const [InspectionFindings, setInspectionFindings] = useState<string>('');
    const [CarbonCredit, setCarbonCredit] = useState<string>('');
    const [creationDate, setCreationDate] = useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] = useState<string>('');
    const [AccreditationInformationFile, setAccreditationInformationFile] = useState<File | null>(null);
    const [ProjectVerifyFile, setProjectVerifyFile] =useState<File | null>(null);
    const [InspectionFindingsFile, setInspectionFindingsFile] = useState<File | null>(null);
    const [VVBStatus, setVVBStatus] = useState<string>('');
    const [state, setState] = useState<State[]>([]);
    const [CityList, setCityList] = useState<City[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [color, setColor] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';
    const location = useLocation();
    const {id} = location.state;
    const navigate = useNavigate();

    
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
        if(VVBState !== null ){
            const lData = new FormData()
            lData.append('StateId', VVBState.StateId.toString());
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

    }, [VVBState])



 // FETCH ALL DATA

    useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('VVBId', id);
            axios({
                method: methodPost,
                url: get_vvb,
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
                    setVVBAddress1(res.data.data.VVBAddress1);
                    setVVBAddress2(res.data.data.VVBAddress2);
                    setVVBCity(res.data.data.VVBCity || null);
                    setVVBState(res.data.data.VVBState || null);
                    setVVBPostalCode(res.data.data.VVBPostalCode);
                    setVVBCountry(res.data.data.VVBCountry);
                    setAccreditationInformation(res.data.data.AccreditationInformation);
                    setProjectVerify(res.data.data.ProjectVerify);
                    setInspectionFindings(res.data.data.InspectionFindings);
                    setCarbonCredit(res.data.data.CarbonCredit);
                    setVVBStatus(res.data.data.VVBStatus);
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
        const obj : VVBFormData ={
        UserId:UserId,
        VVBName:name,
        VVBId:id,
        Email:email,
        MobileNum:mobileNum,
        AlternateMobile:alternateMobile,
        VVBAddress1:VVBAddress1,
        VVBAddress2:VVBAddress2,
            VVBCity: VVBCity?.CityName,
            VVBState: VVBState?.StateName,
        VVBPostalCode:VVBPostalCode,
        VVBCountry:VVBCountry,
        AccreditationInformation:AccreditationInformation,
        ProjectVerify:ProjectVerify,
        InspectionFindings:InspectionFindings,
        CarbonCredit:CarbonCredit,
        CreationDate:creationDate,
        ProjectCommenceDate:projectCommenceDate,
        VVBStatus:VVBStatus,
        AccreditationInformationFile: AccreditationInformationFile,
        ProjectVerifyFile:ProjectVerifyFile,
        InspectionFindingsFile:InspectionFindingsFile
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_vvb,
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
                    navigate('/vvblandsubmissions');
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
                                    <Typography className="FormheadingName" sx={{fontSize:'2rem' , fontWeight:700}} >Edit Submitted Form</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box sx={{ px: 3, my: 2, mx: 3 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={3} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 2, pb: 2, pt: 2, borderColor: '#d2cbcb;', backgroundColor: '#daf6e8', borderRadius: '10px', ':hover': { boxShadow: 4 }, mt: 7}}>
                                <Box sx={{ pb: 4, textAlign: 'left' }}>
                                    <h5>UPDATE VVB INFORMATION</h5>
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
                                            value={VVBAddress1}
                                            onChange={(e) => setVVBAddress1(e.target.value)}
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
                                            value={VVBAddress2}
                                            onChange={(e) => setVVBAddress2(e.target.value)}
                                        />
                                    </Grid>

                                  
                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setVVBState(prevState => {
                                                if (typeof value === 'string') {
                                                return null;
                                                } else {
                                                return value ?? prevState;
                                                }
                                            })}
                                        options={state}
                                        value={VVBState}
                                        getOptionLabel={(option) => (typeof option === 'object'  ? option.StateName : option)}
                                        renderInput={(params) => <TextField {...params} label="State" />}
                                    />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | City | null) => setVVBCity(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={CityList}
                                        value={VVBCity}
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
                                            value={VVBCountry}
                                            onChange={(e) => setVVBCountry(e.target.value)}
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
                                            value={VVBPostalCode}
                                            onChange={(e) => setVVBPostalCode(e.target.value)}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Accreditation Information "
                                            label="Accreditation Information "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={AccreditationInformation}
                                            onChange={(e) => setAccreditationInformation(e.target.value)}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Accreditation Information "
                                            label="Accreditation Information "
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setAccreditationInformationFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Verification Reports "
                                            label="Project Verification Reports "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={ProjectVerify}
                                            onChange={(e) => setProjectVerify(e.target.value)}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Verification Reports "
                                            label="Project Verification Reports "
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setProjectVerifyFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="On-site Inspection Findings "
                                            label="On-site Inspection Findings "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={InspectionFindings}
                                            onChange={(e) => setInspectionFindings(e.target.value)}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="On-site Inspection Findings "
                                            label="On-site Inspection Findings "
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setInspectionFindingsFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                      <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Calculation Methodology"
                                            label="Carbon Credit Calculation Methodology"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={CarbonCredit}
                                            onChange={(e) => setCarbonCredit(e.target.value)}
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
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            value={VVBStatus}
                                            onChange={(event, value) => setVVBStatus(value || '')}
                                            options={['Verified', 'In Progress', 'Rejected', 'Pending']}
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
