import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GGV from '../../assets/GGVLOGO.png';
import {
    Stack, IconButton,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import SnackBar from "../SnackBar/SnackBar";
import pngwing3 from '../../assets/pngwing-3.png'

export default function ForgotPassword() {


    const navigate = useNavigate();
    const [open, setOpen] = useState < boolean > (false);
    const [status, setStatus] = useState < boolean > (false);
    const [color, setColor] = useState < boolean > (false);
    const [message, setMessage] = useState < string > ('');
    const [showPassword, setShowPassword] = useState < boolean > (false);


    const handleSubmit = () => {
        setMessage('Password Reset Successfully');
        setOpen(true);
        setStatus(false);
        setColor(false);
    };



    return (
        <div className='loginback'>
            <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
                <Container component="main" maxWidth="xs">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} className='glassCard' mt={2}>
                    <Box
                        sx={{
                            py:2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: '#ffff'
                        }}
                    >
                            <Box sx={{ mx: 1 }}>
                                <img src={GGV} alt='logo' style={{ width: 100, height: 90, objectFit: 'contain' }} />
                            </Box>

                            <Typography
                             py={1}
                                color='#7bc54c'
                                fontSize={{
                                    lg: 28,
                                    md: 26,
                                    sm: 23,
                                    xs: 20,
                                }}
                                variant="h5">
                            Forgot Password
                        </Typography>
                        <Box mt={1}>
                            <Stack textAlign='left' spacing={2}>
                                <Box sx={{ py: 2 }} >
                                    <TextField
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            size='small'
                                            sx={{ width: { xs: 150, sm: 200, md: 300, lg: 300 } }}
                                    />
                                </Box>
                            <Box sx={{ py: 2 }} >
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    size='small'
                                />
                            </Box>
                            <Box sx={{ py: 2 }}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    variant="outlined"
                                    autoComplete="off"
                                    type={showPassword ? 'password' : 'text'}
                                    label="Confirm Password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'black' }}>
                                                    {showPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            </Stack>
                            <Button
                                fullWidth
                                onClick={handleSubmit}
                                variant="contained"
                                    sx={{ mt: 3, mb: 2, bgcolor: '#7bc54c', ':hover': { bgcolor: '#84cb25' } }}
                            >
                                Create New Password
                            </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="#" variant="body2" onClick={()=>navigate('/')}>
                                           Go Back To Sign_In
                                        </Link>
                                    </Grid>
                                </Grid>
                        </Box>
                    </Box>
                    </Grid>
                    <img className="treeImage" src={pngwing3} alt='pngwing' />
                    <img className="treeImage2" src={pngwing3} alt='pngwing' />
                </Grid>
                </Container>
        </div >
    );
}
