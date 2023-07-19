import { Box, Button, Grid, TextField, Stack, Autocomplete } from "@mui/material";
import { add_afforestation, get_city, get_district, get_state, methodGet, methodPost } from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";


interface AfforestData {
        UserId:string;
        CompanyName:string;
        CoordinationPerson:string;
        MobileNum:string;
        Email:string;
        Village: any;
        District:any;
        StateName:any;
        GISMapping:string;
        LandOwnership:string;
        LandType:string;
        LandActivity:string;
        IsForestLand:string;
        TemperatureClimate:string;
        Soil:string;
        Water:string;
        Biodiversity:string;
        PlannedPlantation:string;
        SpeciesQty:string;
        PlantationDensity:string;
        PlannedSpecies:string;
        TreeSpacing:string;
        TreeHarvestingPeriod:string;
        TreeHarvestCriteria:string;
        HarvestedTreesUsage:string;
        SocialBenefits:string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface District {
  DistrictId: string;
  DistrictName: string;
}

interface Village {
    CityId: string;
    CityName: string;
}

interface SetValueProps {
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function AfforestationForm({setValue}:SetValueProps) {

    const [companyName, setCompanyName] = useState<string>('');
    const [coordinationPerson, setCoordinationPerson] =useState<string>('');
    const [mobileNum, setMobileNum] =useState<string>('');
    const [email, setEmail] =useState<string>('');
    const [village, setVillage] = useState<Village | null>(null);
    const [district, setDistrict] = useState<District | null>(null);
    const [stateName, setStateName] = useState<State | null>(null);
    const [gisMapping, setGISMapping] =useState<string>('');
    const [landOwnership, setLandOwnership] =useState<string>('');
    const [landType, setLandType] =useState<string>('');
    const [landActivity, setLandActivity] =useState<string>('');
    const [isForestLand, setIsForestLand] =useState<string>('');
    const [temperatureClimate, setTemperatureClimate] =useState<string>('');
    const [soil, setSoil] =useState<string>('');
    const [water, setWater] =useState<string>('');
    const [biodiversity, setBiodiversity] =useState<string>('');
    const [plannedPlantation, setPlannedPlantation] =useState<string>('');
    const [speciesQty, setSpeciesQty] =useState<string>('');
    const [plantationDensity, setPlantationDensity] =useState<string>('');
    const [plannedSpecies, setPlannedSpecies] =useState<string>('');
    const [treeSpacing, setTreeSpacing] =useState<string>('');
    const [treeHarvestingPeriod, setTreeHarvestingPeriod] =useState<string>('');
    const [treeHarvestCriteria, setTreeHarvestCriteria] =useState<string>('');
    const [harvestedTreesUsage, setHarvestedTreesUsage] =useState<string>('');
    const [socialBenefits, setSocialBenefits] =useState<string>('');
    const [state, setState] = useState<State[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [villageList, setVillageList] = useState<Village[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [color, setColor] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

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
        if(stateName !== null ){
            const lData = new FormData()
            lData.append('StateId', stateName.StateId);
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

    }, [stateName])


//ALL CITY FETCH
    useEffect(() => {
        if (stateName !== null) {
            const lData = new FormData()
            lData.append('StateId', stateName.StateId);
        axios({
            method: methodPost,
            url: get_city,
            headers: {
                'Authorization': `Bearer ${UserToken}`,
            },
            data:lData
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
                setVillageList(res.data.data)
            }
        }).catch(err => {
            alert('Oops something went wrong ' + err)
        });
    }
    }, [stateName])


    const handleSubmit = () => {
        const obj : AfforestData = {
        UserId:UserId,
        CompanyName:companyName,
        CoordinationPerson:coordinationPerson,
        MobileNum:mobileNum,
        Email:email,
        Village:village?.CityName,
        District:district?.DistrictName,
        StateName:stateName?.StateName,
        GISMapping:gisMapping,
        LandOwnership:landOwnership,
        LandType:landType,
        LandActivity:landActivity,
        IsForestLand:isForestLand,
        TemperatureClimate:temperatureClimate,
        Soil:soil,
        Water:water,
        Biodiversity:biodiversity,
        PlannedPlantation:plannedPlantation,
        SpeciesQty:speciesQty,
        PlantationDensity:plantationDensity,
        PlannedSpecies:plannedSpecies,
        TreeSpacing:treeSpacing,
        TreeHarvestingPeriod:treeHarvestingPeriod,
        TreeHarvestCriteria:treeHarvestCriteria,
        HarvestedTreesUsage:harvestedTreesUsage,
        SocialBenefits:socialBenefits,
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: add_afforestation,
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
                    setValue(0);
                }
            })
            .catch((err) => {
                alert("Oops something went wrong " + err);
            });
    };


    return (
        <Box>
        <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
            <Box display="flex" alignItems="center">

                <Box py={2} className='borderAnimae' sx={{ px: 5, backgroundColor: '#daf6e8', mx: 3, my: 4, ':hover': { boxShadow: 10 }, }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={4} >
                        <Grid item lg={12} xl={12}>

                            <Box sx={{ border: "1px solid black", px: 4, pb: 5, pt: 4, borderColor: '#d2cbcb;', borderRadius: '4px', ':hover': { boxShadow: 2 }, mt: 5 }}>
                                <Box sx={{ pb: 5, textAlign: 'left' }}>
                                    <h5>Location of Land</h5>
                                </Box>

                                <Grid container spacing={2} display='flex' justifyContent='start'>
                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 2 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setStateName(prevState => {
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

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 2 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | District | null) => setDistrict(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={districtList}
                                        getOptionLabel={(option) => (typeof option === 'object' ? option.DistrictName : '')}
                                        renderInput={(params) => <TextField {...params} label="District" />}
                                    />
                                    </Grid>


                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 2 }}>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            freeSolo
                                            onChange={(event, value: string | Village | null) => setVillage(prevVillage => {
                                                if (typeof value === 'string') {
                                                    return null;
                                                } else {
                                                    return value ?? prevVillage;
                                                }
                                            })}
                                            options={villageList}
                                            getOptionLabel={(option) => (typeof option === 'object' ? option.CityName : '')}
                                            renderInput={(params) => <TextField {...params} label="Village/City" />}
                                        />
                                    </Grid>

                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }}  borderTop= '1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>GIS Mapping Details</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="GIS Mapping Details"
                                            label="GIS Mapping Details"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            onChange={(e)=>setGISMapping(e.target.value)}
                                            color='secondary'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Right of Land (Ownership)</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Right of Land (Ownership)"
                                            label="Right of Land (Ownership)"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setLandOwnership(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Type of Land</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            onChange={(event, value)=>setLandType(value || '')}
                                            options={['Public', 'Private', 'Government', 'Forest', 'Waste land']}
                                            renderInput={(params) => <TextField {...params} label="Type of Land" InputLabelProps={{
                                                shrink: true,
                                            }} />}
                                        />
                                    </Grid>

                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Activity</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            onChange={(event, value)=>setLandActivity(value || '')}
                                            options={['Pasture and Non-Pasture', 'Forest land', 'Village land for cattle land', 'Mine area']}
                                            renderInput={(params) => <TextField {...params} label="Activity" InputLabelProps={{
                                                shrink: true,
                                            }} />}
                                        />
                                    </Grid>


                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Any forest on the land before the project? </h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            options={['YES', 'NO']}
                                            onChange={(event, value)=>setIsForestLand(value || '')}
                                            renderInput={(params) => <TextField {...params} label="Any forest on the land before the project?"
                                             InputLabelProps={{
                                                shrink: true,
                                            }} />}
                                        />
                                    </Grid>

                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Prevailing Environment Condition</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Temperature and Climate Change"
                                            label="Temperature and Climate Change"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setTemperatureClimate(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Soil"
                                            label="Soil"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setSoil(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Water"
                                            label="Water"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setWater(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Biodiversity"
                                            label="Biodiversity"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setBiodiversity(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Plantation Details</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Total Number of Tree’s planned for plantation"
                                            label="Total Number of Tree’s planned for plantation"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setPlannedPlantation(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Qty of Species"
                                            label="Qty of Species"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setSpeciesQty(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Density of Plantation"
                                            label="Density of Plantation"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setPlantationDensity(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Species planned"
                                            label="Species planned"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setPlannedSpecies(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Spacing between the trees"
                                            label="Spacing between the trees"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setTreeSpacing(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Harvesting</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Harvesting period of trees"
                                            label="Harvesting period of trees"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setTreeHarvestingPeriod(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Harvest Criteria of the Trees"
                                            label="Harvest Criteria of the Trees"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setTreeHarvestCriteria(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="End use of harvested Trees"
                                            label="End use of harvested Trees"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setHarvestedTreesUsage(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver'>
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Social Benefits attached with Project</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            onChange={(event, value)=>setSocialBenefits(value || '')}
                                            options={['No Poverty', 'Soil Erosion Control', 'Poverty Alleviation', 'Decent Work and Economic Growth ']}
                                            renderInput={(params) => <TextField {...params} label="Social Benefits" InputLabelProps={{
                                                shrink: true,
                                            }} />}
                                        />
                                    </Grid>


                                    <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
                                        <Box sx={{ pb: 3, textAlign: 'left' }}>
                                            <h5>Contact Details</h5>
                                        </Box>
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Name of Company"
                                            label="Name of Company"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setCompanyName(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Name of Coordination person"
                                            label="Name of Coordination person"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setCoordinationPerson(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Phone"
                                            label="Phone"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setMobileNum(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Email"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setEmail(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
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
                                        <Button fullWidth variant="outlined" onClick={handleSubmit}
                                            sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': { borderColor: '#7bc54c', color: '#000000' } }}>Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                        <Button fullWidth variant="outlined"
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
