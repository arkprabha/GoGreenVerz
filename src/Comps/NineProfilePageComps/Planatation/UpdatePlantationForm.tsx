import { Box, Button, Grid, TextField, Stack, Autocomplete, Typography, Container } from "@mui/material";
import Header from '../../../Header';
import { get_city, get_land_by_profile_users, get_state, methodGet, methodPost, update_plantation_partner} from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";

interface PlantationFormData {
            UserId: string;
            PlantationPartnerName: string;
            Email: string;
            MobileNum: string;
            AlternateMobile: string;
            CreationDate: string;
            ProjectCommenceDate: string;
            PlantationPartnerAddress1:string;
            PlantationPartnerAddress2:string;
            PlantationPartnerCity:any;
            PlantationPartnerState:any;
            PlantationPartnerPostalCode:string;
            PlantationPartnerCountry:string;
            PlantTypes:string;
            Species:string;
            DistanceOfPlanting:string;
            MaintenancePeriod:string;
            WaterManagement:string;
            FertilizerManagement:string;
            TotalLand:string;
            Recommendation:string;
            PlantationPartnerStatus:string;
            WaterManagementFile:File | null;
            FertilizerManagementFile:File | null;
            RecommendationFile:File | null;
            PlantationPartnerId:string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface City {
  CityId: string;
  CityName: string;
}


export default function UpdatePlantationForm() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobileNum, setMobileNum] = useState<string>('');
    const [alternateMobile, setAlternateMobile] = useState<string>('');
    const [PlantationPartnerAddress1, setPlantationPartnerAddress1] = useState<string>('');
    const [PlantationPartnerAddress2, setPlantationPartnerAddress2] = useState<string>('');
    const [PlantationPartnerCity, setPlantationPartnerCity] = useState<City | null>(null);
    const [PlantationPartnerState, setPlantationPartnerState] =useState<State | null>(null);
    const [PlantationPartnerPostalCode, setPlantationPartnerPostalCode] = useState<string>('');
    const [PlantationPartnerCountry, setPlantationPartnerCountry] = useState<string>('');
    const [PlantTypes, setPlantTypes] = useState<string>('');
    const [Species, setSpecies] = useState<string>('');
    const [DistanceOfPlanting, setDistanceOfPlanting] = useState<string>('');
    const [MaintenancePeriod, setMaintenancePeriod] = useState<string>('');
    const [WaterManagement, setWaterManagement] = useState<string>('');
    const [FertilizerManagement, setFertilizerManagement] = useState<string>('');
    const [TotalLand, setTotalLand] = useState<string>('');
    const [Recommendation, setRecommendation] = useState<string>('');
    const [PlantationPartnerStatus, setPlantationPartnerStatus] = useState<string>('');
    const [WaterManagementFile, setWaterManagementFile] =useState<File | null>(null);
    const [FertilizerManagementFile, setFertilizerManagementFile] =useState<File | null>(null);
    const [RecommendationFile, setRecommendationFile] = useState<File | null>(null);
    const [creationDate, setCreationDate] = useState<string>('');
    const [projectCommenceDate, setProjectCommenceDate] = useState<string>('');
    const [state, setState] = useState<State[]>([]);
    const [CityList, setCityList] = useState<City[]>([]);
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
        if(PlantationPartnerState !== null ){
            const lData = new FormData()
            lData.append('StateId', PlantationPartnerState.StateId);
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

    }, [PlantationPartnerState])


// FETCH ALL DATA

    useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('PlantationPartnerId', id);
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
                    setOpen(true)
                    setStatus(false)
                    setColor(false)
                } else {
                    setMessage(res.data.message)
                    setName(res.data.data.PlantationPartnerName);
                    setEmail(res.data.data.Email);
                    setMobileNum(res.data.data.MobileNum);
                    setAlternateMobile(res.data.data.AlternateMobile);
                    setCreationDate(res.data.data.CreationDate);
                    setProjectCommenceDate(res.data.data.ProjectCommenceDate);
                    setPlantationPartnerAddress1(res.data.data.PlantationPartnerAddress1);
                    setPlantationPartnerAddress2(res.data.data.PlantationPartnerAddress2);
                    setPlantationPartnerCity(res.data.data.PlantationPartnerCity || null);
                    setPlantationPartnerState(res.data.data.PlantationPartnerState || null);
                    setPlantationPartnerPostalCode(res.data.data.PlantationPartnerPostalCode);
                    setPlantationPartnerCountry(res.data.data.PlantationPartnerCountry);
                    setPlantTypes(res.data.data.PlantTypes);
                    setSpecies(res.data.data.Species);
                    setDistanceOfPlanting(res.data.data.DistanceOfPlanting);
                    setMaintenancePeriod(res.data.data.MaintenancePeriod);
                    setWaterManagement(res.data.data.WaterManagement);
                    setFertilizerManagement(res.data.data.FertilizerManagement);
                    setTotalLand(res.data.data.TotalLand);
                    setRecommendation(res.data.data.Recommendation);
                    setPlantationPartnerStatus(res.data.data.PlantationPartnerStatus);
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



// SUBMIT FORM DATA

    const handleSubmit = () => {
        const obj : PlantationFormData = {
            UserId: UserId,
            PlantationPartnerName: name,
            PlantationPartnerId:id,
            Email: email,
            MobileNum: mobileNum,
            AlternateMobile: alternateMobile,
            CreationDate: creationDate,
            ProjectCommenceDate: projectCommenceDate,
            PlantationPartnerAddress1:PlantationPartnerAddress1,
            PlantationPartnerAddress2:PlantationPartnerAddress2,
            PlantationPartnerCity: PlantationPartnerCity?.CityName,
            PlantationPartnerState: PlantationPartnerState?.StateName,
            PlantationPartnerPostalCode:PlantationPartnerPostalCode,
            PlantationPartnerCountry:PlantationPartnerCountry,
            PlantTypes:PlantTypes,
            Species:Species,
            DistanceOfPlanting:DistanceOfPlanting,
            MaintenancePeriod:MaintenancePeriod,
            WaterManagement:WaterManagement,
            FertilizerManagement:FertilizerManagement,
            TotalLand:TotalLand,
            Recommendation:Recommendation,
            PlantationPartnerStatus:PlantationPartnerStatus,
            WaterManagementFile:WaterManagementFile,
            FertilizerManagementFile:FertilizerManagementFile,
            RecommendationFile:RecommendationFile
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_plantation_partner,
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
                    navigate('/myfilledlands');
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
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Box width='100%' textAlign='center' py={2} className="text-container">
                                                                            <Typography className="FormheadingName" sx={{fontSize:'2.5rem' , fontWeight:700 ,letterSpacing:'0.3rem' ,textTransform:'uppercase' }} >Edit Planatation Information</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box sx={{ px: 3, my:2,  mx: 3 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={3} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 2, pb: 2, pt: 2, borderColor: '#d2cbcb;', backgroundColor: '#E0E3DE', borderRadius: '10px',  boxShadow: 5, mt: 2 }}>
                                <Box sx={{ pb: 4, textAlign: 'left' }}>
                                    <h5>UPDATE PLANTATION DETAILS</h5>
                                </Box>

                                <Grid container justifyContent='space-evenly' spacing={2}>
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
                                            value={PlantationPartnerAddress1}
                                            onChange={(e) => setPlantationPartnerAddress1(e.target.value)}
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
                                            value={PlantationPartnerAddress2}
                                            onChange={(e) => setPlantationPartnerAddress2(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setPlantationPartnerState(prevState => {
                                                if (typeof value === 'string') {
                                                return null;
                                                } else {
                                                return value ?? prevState;
                                                }
                                            })}
                                        options={state}
                                        value={PlantationPartnerState}
                                        getOptionLabel={(option) => (typeof option === 'object'  ? option.StateName : option)}
                                        renderInput={(params) => <TextField {...params} label="State" />}
                                    />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | City | null) => setPlantationPartnerCity(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={CityList}
                                        value={PlantationPartnerCity}
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
                                            value={PlantationPartnerCountry}
                                            onChange={(e) => setPlantationPartnerCountry(e.target.value)}
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
                                            value={PlantationPartnerPostalCode}
                                            onChange={(e) => setPlantationPartnerPostalCode(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Plant Types"
                                            label="Plant Types"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={PlantTypes}
                                            onChange={(e) => setPlantTypes(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Species "
                                            label="Species "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={Species}
                                            onChange={(e) => setSpecies(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Distance of Planting "
                                            label="Distance of Planting "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={DistanceOfPlanting}
                                            onChange={(e) => setDistanceOfPlanting(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Maintenance Period"
                                            label="Maintenance Period"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={MaintenancePeriod}
                                            onChange={(e) => setMaintenancePeriod(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Water Management"
                                            label="Water Management"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={WaterManagement}
                                            onChange={(e) => setWaterManagement(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Water Management"
                                            label="Water Management"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setWaterManagementFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Fertilizer Management"
                                            label="Fertilizer Management"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={FertilizerManagement}
                                            onChange={(e) => setFertilizerManagement(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Fertilizer Management"
                                            label="Fertilizer Management"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setFertilizerManagementFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Total Land "
                                            label="Total Land "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={TotalLand}
                                            onChange={(e) => setTotalLand(e.target.value)}
                                        />
                                    </Grid>
                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Recommendations"
                                            label="Recommendations"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={Recommendation}
                                            onChange={(e) => setRecommendation(e.target.value)}
                                        />
                                    </Grid>

                                     <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Recommendations"
                                            label="Recommendations"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                 setRecommendationFile(file || null);
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
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            value={PlantationPartnerStatus}
                                            onChange={(event, value) => setPlantationPartnerStatus(value || '')}
                                            options={['Active', 'In Active', 'Completed']}
                                            renderInput={(params) => <TextField {...params} label="Status" />}
                                        />
                                    </Grid>

                                </Grid>
                            </Box>


                        </Grid >
                    </Grid>

                    {/* {buttons}  */}

                    <Grid container justifyContent='center' sx={{ textAlign: 'center'}}>
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
