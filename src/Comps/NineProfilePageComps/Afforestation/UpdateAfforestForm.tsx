import { Box, Button, Grid, TextField, Stack, Autocomplete } from "@mui/material";
import Header from '../../../Header';
import {  get_afforestation, get_city, get_district, get_state, methodGet, methodPost, update_afforestation } from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";


interface AfforestData {
  UserId: string;
  CompanyName: string;
  CoordinationPerson: string;
  MobileNum: string;
  Email: string;
  Village: any;
  District: any;
  StateName: any;
  GISMapping: string;
  LandOwnership: string;
  LandType: string;
  LandActivity: string;
  IsForestLand: string;
  TemperatureClimate: string;
  Soil: string;
  Water: string;
  Biodiversity: string;
  PlannedPlantation: string;
  SpeciesQty: string;
  PlantationDensity: string;
  PlannedSpecies: string;
  TreeSpacing: string;
  TreeHarvestingPeriod: string;
  TreeHarvestCriteria: string;
  HarvestedTreesUsage: string;
  SocialBenefits: string;
  AfforestationId:string;
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

export default function UpdateAfforestForm() {

  const [companyName, setCompanyName] = useState<string>('');
  const [coordinationPerson, setCoordinationPerson] = useState<string>('');
  const [mobileNum, setMobileNum] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [village, setVillage] = useState<Village | null>(null);
  const [district, setDistrict] = useState<District | null>(null);
  const [stateName, setStateName] = useState<State | null>(null);
  const [gisMapping, setGISMapping] = useState<string>('');
  const [landOwnership, setLandOwnership] = useState<string>('');
  const [landType, setLandType] = useState<string>('');
  const [landActivity, setLandActivity] = useState<string>('');
  const [isForestLand, setIsForestLand] = useState<string>('');
  const [temperatureClimate, setTemperatureClimate] = useState<string>('');
  const [soil, setSoil] = useState<string>('');
  const [water, setWater] = useState<string>('');
  const [biodiversity, setBiodiversity] = useState<string>('');
  const [plannedPlantation, setPlannedPlantation] = useState<string>('');
  const [speciesQty, setSpeciesQty] = useState<string>('');
  const [plantationDensity, setPlantationDensity] = useState<string>('');
  const [plannedSpecies, setPlannedSpecies] = useState<string>('');
  const [treeSpacing, setTreeSpacing] = useState<string>('');
  const [treeHarvestingPeriod, setTreeHarvestingPeriod] = useState<string>('');
  const [treeHarvestCriteria, setTreeHarvestCriteria] = useState<string>('');
  const [harvestedTreesUsage, setHarvestedTreesUsage] = useState<string>('');
  const [socialBenefits, setSocialBenefits] = useState<string>('');
  const [state, setState] = useState<State[]>([]);
  const [districtList, setDistrictList] = useState<District[]>([]);
  const [villageList, setVillageList] = useState<Village[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
  const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  const UserId: string | null = localStorage.getItem('UserId') ?? '';

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;



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

  // POST CITY FETCH
  useEffect(() => {
    if (stateName !== null) {
      const lData = new FormData()
      lData.append('StateId', stateName.StateId.toString());
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
    else {
      setMessage('Select a State First');
    }

  }, [stateName])


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
        setVillageList(res.data.data)
      }
    }).catch(err => {
      alert('Oops something went wrong ' + err)
    });
  }, [])


  // FETCH AFFOREST DATA
  useEffect(() => {
    if (id !== '') {
      const lData = new FormData()
      lData.append('AfforestationId', id);
    axios({
      method: methodPost,
      url: get_afforestation,
      headers: {
        'Authorization': `Bearer ${UserToken}`,
      },
      data:lData,
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
        setCompanyName(res.data.data.CompanyName)
        setCoordinationPerson(res.data.data.CoordinationPerson)
        setMobileNum(res.data.data.MobileNum)
        setEmail(res.data.data.MobileNum)
        setVillage(res.data.data.Village || null)
        setDistrict(res.data.data.District || null)
        setStateName(res.data.data.StateName || null)
        setGISMapping(res.data.data.GISMapping)
        setLandOwnership(res.data.data.LandOwnership)
        setLandType(res.data.data.LandType)
        setLandActivity(res.data.data.LandActivity)
        setIsForestLand(res.data.data.IsForestLand)
        setTemperatureClimate(res.data.data.TemperatureClimate)
        setSoil(res.data.data.Soil)
        setWater(res.data.data.Water)
        setBiodiversity(res.data.data.Biodiversity)
        setPlannedPlantation(res.data.data.PlannedPlantation)
        setSpeciesQty(res.data.data.SpeciesQty)
        setPlantationDensity(res.data.data.PlantationDensity)
        setPlannedSpecies(res.data.data.PlannedSpecies)
        setTreeSpacing(res.data.data.TreeSpacing)
        setTreeHarvestingPeriod(res.data.data.TreeHarvestingPeriod)
        setTreeHarvestCriteria(res.data.data.TreeHarvestCriteria)
        setHarvestedTreesUsage(res.data.data.HarvestedTreesUsage)
        setSocialBenefits(res.data.data.SocialBenefits)
      }
    }).catch(err => {
      alert('Oops something went wrong ' + err)
    });
  }
  }, [])


  const handleSubmit = () => {
    const obj: AfforestData = {
      UserId: UserId,
      CompanyName: companyName,
      CoordinationPerson: coordinationPerson,
      MobileNum: mobileNum,
      Email: email,
      Village: village?.CityName,
      District: district?.DistrictName,
      StateName: stateName?.StateName,
      GISMapping: gisMapping,
      LandOwnership: landOwnership,
      LandType: landType,
      LandActivity: landActivity,
      IsForestLand: isForestLand,
      TemperatureClimate: temperatureClimate,
      Soil: soil,
      Water: water,
      Biodiversity: biodiversity,
      PlannedPlantation: plannedPlantation,
      SpeciesQty: speciesQty,
      PlantationDensity: plantationDensity,
      PlannedSpecies: plannedSpecies,
      TreeSpacing: treeSpacing,
      TreeHarvestingPeriod: treeHarvestingPeriod,
      TreeHarvestCriteria: treeHarvestCriteria,
      HarvestedTreesUsage: harvestedTreesUsage,
      SocialBenefits: socialBenefits,
      AfforestationId:id,
    }

    const sendData = appendData(obj);
    axios({
      method: 'POST',
      url: update_afforestation,
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
          navigate('/afforestation')
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
      <Box sx={{ height: '90%' }} display="flex" alignItems="center">

        <Box py={4} sx={{ px: 5, backgroundColor: '#daf6e8', borderRadius: '10px', mx: 3, my: 4, boxShadow: 11 }}>

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
                      value={stateName}
                      getOptionLabel={(option) => (typeof option === 'object' ? option.StateName : option)}
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
                      value={district}
                      getOptionLabel={(option) => (typeof option === 'object' ? option.DistrictName : option)}
                      renderInput={(params) => <TextField {...params} label="City" />}
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
                      value={village}
                      getOptionLabel={(option) => (typeof option === 'object' ? option.CityName : option)}
                      renderInput={(params) => <TextField {...params} label="Village/City" />}
                    />
                  </Grid>

                  <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }} borderTop='1px solid silver' >
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
                      value={gisMapping}
                      onChange={(e) => setGISMapping(e.target.value)}
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
                      value={landOwnership}
                      onChange={(e) => setLandOwnership(e.target.value)}
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
                      onChange={(event, value) => setLandType(value || '')}
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
                      onChange={(event, value) => setLandActivity(value || '')}
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
                      onChange={(event, value) => setIsForestLand(value || '')}
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
                      value={temperatureClimate}
                      onChange={(e) => setTemperatureClimate(e.target.value)}
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
                      value={soil}
                      onChange={(e) => setSoil(e.target.value)}
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
                      value={water}
                      onChange={(e) => setWater(e.target.value)}
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
                      value={biodiversity}
                      onChange={(e) => setBiodiversity(e.target.value)}
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
                      value={plannedPlantation}
                      onChange={(e) => setPlannedPlantation(e.target.value)}
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
                      value={speciesQty}
                      onChange={(e) => setSpeciesQty(e.target.value)}
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
                      value={plantationDensity}
                      onChange={(e) => setPlantationDensity(e.target.value)}
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
                      value={plannedSpecies}
                      onChange={(e) => setPlannedSpecies(e.target.value)}
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
                      value={treeSpacing}
                      onChange={(e) => setTreeSpacing(e.target.value)}
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
                      value={treeHarvestingPeriod}
                      onChange={(e) => setTreeHarvestingPeriod(e.target.value)}
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
                      value={treeHarvestCriteria}
                      onChange={(e) => setTreeHarvestCriteria(e.target.value)}
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
                      value={harvestedTreesUsage}
                      onChange={(e) => setHarvestedTreesUsage(e.target.value)}
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
                      onChange={(event, value) => setSocialBenefits(value || '')}
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
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
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
                      value={coordinationPerson}
                      onChange={(e) => setCoordinationPerson(e.target.value)}
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
                      value={mobileNum}
                      onChange={(e) => setMobileNum(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
