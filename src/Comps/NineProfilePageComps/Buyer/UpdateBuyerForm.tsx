import { Box, Button, Grid, TextField, Stack, Autocomplete , Container , Typography } from "@mui/material";
import Header from '../../../Header';
import { get_buyer, get_district, get_state, methodGet, methodPost, update_buyer} from "../../../API_Service/API_Service";
import { useEffect, useState } from "react";
import { appendData } from "../../../Variables/ProcessVariable";
import axios from "axios";
import SnackBar from "../../SnackBar/SnackBar";
import { useLocation, useNavigate } from "react-router-dom";


interface BuyerFormData {
        UserId:string;
        BuyerName:string;
        Email:string;
        MobileNum:string;
        AlternateMobile:string;
        BuyerAddress1:string;
        BuyerAddress2:string;
        BuyerCity:any;
        BuyerState:any;
        BuyerPostalCode:string;
        BuyerCountry:string;
        CCTrading:string;
        Contracts:string;
        Purchase:string;
        PaymentHistory:string;
        BuyerStatus:string;
        CCTradingFile: File | null;
        ContractsFile: File | null;
        PurchaseFile: File | null;
        PaymentHistoryFile: File | null;
        CreationDate:string;
        ProjectCommenceDate:string;
        Remarks: string;
        BuyerId: string;
}

interface State {
  StateId: string;
  StateName: string;
}

interface District {
  DistrictId: string;
  DistrictName: string;
}


export default function UpdateBuyerForm() {

  const [buyerName, setBuyerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNum, setMobileNum] = useState<string>('');
  const [alternateMobile, setAlternateMobile] = useState<string>('');
  const [buyerAddress1, setBuyerAddress1] = useState<string>('');
  const [buyerAddress2, setBuyerAddress2] = useState<string>('');
  const [buyerCity, setBuyerCity] = useState<District | null>(null);
  const [buyerState, setBuyerState] = useState<State | null>(null);
  const [buyerPostalCode, setBuyerPostalCode] = useState<string>('');
  const [buyerCountry, setBuyerCountry] = useState<string>('');
  const [ccTrading, setCCTrading] = useState<string>('');
  const [contracts, setContracts] = useState<string>('');
  const [purchase, setPurchase] = useState<string>('');
  const [paymentHistory, setPaymentHistory] = useState<string>('');
  const [buyerStatus, setBuyerStatus] = useState<string>('');
  const [ccTradingFile, setCCTradingFile] = useState<File | null>(null);
  const [contractsFile, setContractsFile] = useState<File | null>(null);
  const [purchaseFile, setPurchaseFile] = useState<File | null>(null);
  const [paymentHistoryFile, setPaymentHistoryFile] = useState<File | null>(null);
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
        if(buyerState !== null ){
            const lData = new FormData()
            lData.append('StateId', buyerState.StateId);
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

    }, [buyerState])
 


      useEffect(() => {
        if(id !== ''){
            const lData = new FormData()
            lData.append('BuyerId', id);
            axios({
                method: methodPost,
                url: get_buyer,
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
                    setBuyerName(res.data.data.BuyerName);
                    setBuyerAddress1(res.data.data.BuyerAddress1);
                    setBuyerAddress2(res.data.data.BuyerAddress2);
                    setBuyerCity(res.data.data.BuyerCity || null);
                    setBuyerState(res.data.data.BuyerState || null);
                    setBuyerPostalCode(res.data.data.BuyerPostalCode);
                    setBuyerCountry(res.data.data.BuyerCountry);
                    setCCTrading(res.data.data.CCTrading);
                    setContracts(res.data.data.Contracts);
                    setPurchase(res.data.data.Purchase);
                    setPaymentHistory(res.data.data.PaymentHistory);
                    setBuyerStatus(res.data.data.BuyerStatus);
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
        const obj :BuyerFormData = {
        UserId:UserId,
        BuyerName:buyerName,
        BuyerId:id,
        Email:email,
        MobileNum:mobileNum,
        AlternateMobile:alternateMobile,
        BuyerAddress1:buyerAddress1,
        BuyerAddress2:buyerAddress2,
            BuyerCity: buyerCity?.DistrictName,
            BuyerState: buyerState?.StateName,
        BuyerPostalCode:buyerPostalCode,
        BuyerCountry:buyerCountry,
        CCTrading:ccTrading,
        Contracts:contracts,
        Purchase:purchase,
        PaymentHistory:paymentHistory,
        BuyerStatus:buyerStatus,
        CCTradingFile:ccTradingFile,
        ContractsFile:contractsFile,
        PurchaseFile:purchaseFile,
        PaymentHistoryFile:paymentHistoryFile,
        CreationDate:creationDate,
        ProjectCommenceDate:projectCommenceDate,
         Remarks: Remarks,
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: update_buyer,
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
                    navigate('/yourlands');
                }
            })
            .catch((err: string) => {
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
                                    <Typography className="FormheadingName" sx={{fontSize:'2rem' , fontWeight:700}} >Edit Purchase Information</Typography>                  </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

                <Box sx={{ px: 3, my: 2, mx: 3 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={3} >
                        <Grid item lg={12} xl={12} >

                            <Box className='borderAnimae' sx={{  px: 2, pb: 2, pt: 2, backgroundColor: '#daf6e8',  ':hover': { boxShadow: 10 }, mt: 3 }}>
                                <Box sx={{ pb: 2, textAlign: 'left' }}>
                                    <h5>EDIT PURCHASE/CONTRACT INFORMATION</h5>
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
                                            value={buyerName}
                                            onChange={(e) => setBuyerName(e.target.value)}
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
                                            value={buyerAddress1}
                                            onChange={(e) => setBuyerAddress1(e.target.value)}
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
                                            value={buyerAddress2}
                                            onChange={(e) => setBuyerAddress2(e.target.value)}
                                        />
                                    </Grid>

                                       <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                          onChange={(event, value: string | State | null) => setBuyerState(prevState => {
                                                if (typeof value === 'string') {
                                                return null;
                                                } else {
                                                return value ?? prevState;
                                                }
                                            })}
                                        options={state}
                                        value={buyerState}
                                        getOptionLabel={(option) => (typeof option === 'object'  ? option.StateName : option)}
                                        renderInput={(params) => <TextField {...params} label="State" />}
                                    />
                                    </Grid>

                                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        size="small"
                                        freeSolo
                                         onChange={(event, value: string | District | null) => setBuyerCity(prevCity => {
                                            if (typeof value === 'string') {
                                            return null;
                                            } else {
                                            return value ?? prevCity;
                                            }
                                        })}
                                        options={districtList}
                                        value={buyerCity}
                                        getOptionLabel={(option) => (typeof option === 'object' ? option.DistrictName : option)}
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
                                            value={buyerCountry}
                                            onChange={(e) => setBuyerCountry(e.target.value)}
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
                                            value={buyerPostalCode}
                                            onChange={(e) => setBuyerPostalCode(e.target.value)}
                                        />
                                    </Grid>
                                         <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Trading History "
                                            label="Carbon Credit Trading History "
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={ccTrading}
                                            onChange={(e) => setCCTrading(e.target.value)}
                                        />
                                    </Grid>

                                   <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Carbon Credit Trading History "
                                            label="Carbon Credit Trading History "
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setCCTradingFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                   <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Payment History"
                                            label="Payment History"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={paymentHistory}
                                            onChange={(e) => setPaymentHistory(e.target.value)}
                                        />
                                    </Grid>

                                   <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Payment History"
                                            label="Payment History"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setPaymentHistoryFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                   <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Contract Details"
                                            label="Contract Details"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={contracts}
                                            onChange={(e) => setContracts(e.target.value)}
                                        />
                                    </Grid>

                                   <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Contract Details"
                                            label="Contract Details"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setContractsFile(file || null);
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                   <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Purchase Orders"
                                            label="Purchase Orders"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            value={purchase}
                                            onChange={(e) => setPurchase(e.target.value)}
                                        />
                                    </Grid>

                                   <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{ py: 1 }}  >
                                        <TextField
                                            fullWidth
                                            id="Purchase Orders"
                                            label="Purchase Orders"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                             onChange={(e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                setPurchaseFile(file || null);
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
                                            value={buyerStatus}
                                            onChange={(event , value)=> setBuyerStatus(value || '')}
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
