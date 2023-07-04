import { Box, Button, Grid, TextField, Stack , Autocomplete , Container , Typography } from "@mui/material";
import Header from '../../../Header';
import { get_admin, get_district, get_state, methodGet, methodPost, update_admin } from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";

interface AdminProfileData {
        UserId:string;
        AdminName:string;
        Email:string;
        MobileNum:string;
        AlternateMobile:string;
        AdminAddress1:string;
        AdminAddress2:string;
        AdminCity:any;
        AdminState:any;
        AdminPostalCode:string;
        AdminCountry:string;
        UserManagement:string;
        PlatformSettings:string;
        AccessControls:string;
        DataAnalytics:string;
        CreationDate:string;
        ProjectCommenceDate:string;
        AdminStatus:string;
        UserManagementFile: File | null;
        PlatformSettingsFile: File | null;
        AccessControlsFile: File | null;
        DataAnalyticsFile: File | null;
        Remarks: string;
        AdminId:string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface District {
  DistrictId: string;
  DistrictName: string;
}

export default function UpdateAdminForm() {

    const [adminname, setAdminName] =useState<string>('');
    const [email, setEmail] =useState<string>('');
    const [mobileNum, setMobileNum] =useState<string>('');
    const [alternateMobile, setAlternateMobile] =useState<string>('');
    const [adminAddress1, setAdminAddress1] =useState<string>('');
    const [adminAddress2, setAdminAddress2] =useState<string>('');
    const [adminCity, setAdminCity] = useState<District | null>(null);
    const [adminState, setAdminState] = useState<State | null>(null);
    const [adminPostalCode, setAdminPostalCode] =useState<string>('');
    const [adminCountry, setAdminCountry] =useState<string>('');
    const [userManagement, setUserManagement] =useState<string>('');
    const [platformSettings, setPlatformSettings] =useState<string>('');
    const [accessControls, setAccessControls] =useState<string>('');
    const [dataAnalytics, setDataAnalytics] =useState<string>('');
    const [adminStatus, setAdminStatus] =useState<string>('');
    const [userManagementFile, setUserManagementFile] = useState<File | null>(null);
    const [accessControlsFile, setAccessControlsFile] =useState<File | null>(null);
    const [platformSettingsFile, setPlatformSettingsFile] =useState<File | null>(null);
    const [dataAnalyticsFile, setDataAnalyticsFile] =useState<File | null>(null);
    const [creationDate, setCreationDate] =useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] =useState<string>('');
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
        if(adminState !== null ){
            const lData = new FormData()
            lData.append('StateId', adminState.StateId.toString());
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

    }, [adminState])


  useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('AdminId', id);
            axios({
                method: methodPost,
                url: get_admin,
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
                    setMessage(res.data.message);
                    setEmail(res.data.data.Email);
                    setMobileNum(res.data.data.MobileNum);
                    setAlternateMobile(res.data.data.AlternateMobile);
                    setCreationDate(res.data.data.CreationDate);
                    setProjectCommenceDate(res.data.data.ProjectCommenceDate);
                    setAdminName(res.data.data.AdminName);
                    setAdminAddress1(res.data.data.AdminAddress1);
                    setAdminAddress2(res.data.data.AdminAddress2);
                    // setAdminCity(res.data.data.AdminCity);
                    // setAdminState(res.data.data.AdminState);
                    setAdminPostalCode(res.data.data.AdminPostalCode);
                    setAdminCountry(res.data.data.AdminCountry);
                    setUserManagement(res.data.data.UserManagement);
                    setPlatformSettings(res.data.data.PlatformSettings);
                    setAccessControls(res.data.data.AccessControls);
                    setDataAnalytics(res.data.data.DataAnalytics);
                    setAdminStatus(res.data.data.AdminStatus);
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
        const obj: AdminProfileData = {
        UserId:UserId,
        AdminName:adminname, 
        AdminId:id,
        Email:email,
        MobileNum:mobileNum,
        AlternateMobile:alternateMobile,
        AdminAddress1:adminAddress1,
        AdminAddress2:adminAddress2,
        AdminCity:adminCity,
        AdminState:adminState,
        AdminPostalCode:adminPostalCode,
        AdminCountry:adminCountry,
        UserManagement:userManagement,
        PlatformSettings:platformSettings,
        AccessControls:accessControls,
        DataAnalytics:dataAnalytics,
        CreationDate:creationDate,
        ProjectCommenceDate:projectCommenceDate,
        AdminStatus:adminStatus,
        UserManagementFile:userManagementFile,
        PlatformSettingsFile:platformSettingsFile,
        AccessControlsFile:accessControlsFile,
        DataAnalyticsFile:dataAnalyticsFile,
        Remarks: Remarks,
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_admin,
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
                    navigate('/adminsubmittedlands');
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
                                <Box width='100%' textAlign='center' py={2}>
                                    <Typography variant="h5" color='#262626' sx={{ textDecoration: 'underline', lineHeight: 1 }} fontWeight={600} >Edit Submitted Form</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                
                <Box sx={{ px: 3, my: 2, mx: 3 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={3} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 2, pb: 2, pt: 2, borderColor: '#d2cbcb;', backgroundColor: '#daf6e8', borderRadius: '10px', ':hover': { boxShadow: 4 }, mt: 3 }}>
                                <Box sx={{ pb: 2, textAlign: 'left' }}>
                                    <h5>ADMINSTRATION DEPARTMENT</h5>
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
                                            value={adminname}
                                            onChange={(e) => setAdminName(e.target.value)}
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
                                            value={adminAddress1}
                                            onChange={(e) => setAdminAddress1(e.target.value)}
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
                                            value={adminAddress2}
                                            onChange={(e) => setAdminAddress2(e.target.value)}
                                        />
                                    </Grid>

                                    
                               <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setAdminState(prevState => {
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
                                         onChange={(event, value: string | District | null) => setAdminCity(prevCity => {
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
                                            value={adminCountry}
                                            onChange={(e) => setAdminCountry(e.target.value)}
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
                                            value={adminPostalCode}
                                            onChange={(e) => setAdminPostalCode(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="User Management"
                                            label="User Management"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={userManagement}
                                            onChange={(e) => setUserManagement(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="User Management"
                                            label="User Management"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                            const file = (e.target as HTMLInputElement).files?.[0];
                                            setUserManagementFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Platform Settings and Configuration"
                                            label="Platform Settings and Configuration"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={platformSettings}
                                            onChange={(e) => setPlatformSettings(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Platform Settings and Configuration"
                                            label="Platform Settings and Configuration"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setPlatformSettingsFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Access Controls and Permissions"
                                            label="Access Controls and Permissions"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={accessControls}
                                            onChange={(e) => setAccessControls(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Access Controls and Permissions"
                                            label="Access Controls and Permissions"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                               setAccessControlsFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Data Analytics and Reporting"
                                            label="Data Analytics and Reporting"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={dataAnalytics}
                                            onChange={(e) => setDataAnalytics(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Data Analytics and Reporting"
                                            label="Data Analytics and Reporting"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setDataAnalyticsFile(file || null);
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
                                            value={Remarks}
                                            onChange={(event, value)=>setAdminStatus(value || '')}
                                            options={['Active', 'Inactive', 'Suspended']}
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
