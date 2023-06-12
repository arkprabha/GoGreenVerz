import { Box, Button, Grid, TextField, Stack } from "@mui/material";
import Header from '../../Header';


export default function AddLands() {

    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';

    return (
        <Box>
            <Header isConnectedWallet={isConnectedWallet} />
            <Box display="flex" alignItems="center" className='pageSizeandBack'>

                <Box py={4} sx={{ px: 5, backgroundColor: '#EDF4F4', borderRadius: '10px', mx: 3, my: 4, boxShadow: 11 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={4} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 4, pb: 5, pt: 4, borderColor: '#d2cbcb;', borderRadius: '4px', ':hover': { boxShadow: 2 }, mt: 5 }}>
                                <Box sx={{ pb: 5, textAlign: 'left' }}>
                                    <h5>ADD YOUR LANDS INFORMATION</h5>
                                </Box>

                                <Grid container justifyContent='space-evenly' spacing={2}  >
                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Name"
                                            label="Name"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Ph No"
                                            label="Ph No"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
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
                                        />
                                    </Grid>


                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Address"
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Land Size"
                                            label="Land Size"
                                            type="tel"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Longtitude"
                                            label="Longtitude"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Lattitude"
                                            label="Lattitude"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Lease T&C"
                                            label="Lease Terms & Conditions"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Video"
                                            label="Virtual Tour/Video "
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Creation Date"
                                            label="Creation Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            color='secondary'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Project Commence Date"
                                            label="Project Commence Date"
                                            variant="outlined"
                                            type='date'
                                            size='small'
                                            color='secondary'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="Remarks"
                                            label="Remarks"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
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
                                       sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', 
                                       ':hover': { borderColor: '#7bc54c', color: '#000000' } }}
                                       >Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                    <Button fullWidth variant="outlined"
                                     sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828', 
                                     ':hover': { borderColor: '#c62828', color: '#000000' } }}
                                     >Cancel</Button>
                                    </Stack>

                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>

                </Box>

            </Box >


        </Box>
    )
}
