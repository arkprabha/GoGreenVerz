import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GGV from '../../assets/GGVLOGO.png';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { get_all_user_profile_type, user_sign_up } from '../../API_Service/API_Service';
import axios from 'axios';
import { Autocomplete } from '@mui/material';
import { appendData } from "../../Variables/ProcessVariable";
import SnackBar from "../SnackBar/SnackBar";
import pngwing3 from '../../assets/pngwing-3.png'

interface UserProfile {
    UserProfileTypeId: string;
    UserProfileType: string;
}

interface FormUserData {
    UserName: any;
    UserPhone: any;
    UserMail: any;
    UserAddress: any;
    UserCity: any;
    UserState: any;
    UserPostalCode: any;
    UserCountry: any;
    UserPassword: any;
    UserProfileTypeId: string;
}



export default function SignUpForm() {
 
    const [options, setOptions] = useState < UserProfile[] > ([]);
    const [open, setOpen] = useState < boolean > (false);
    const [status, setStatus] = useState < boolean > (false);
    const [color, setColor] = useState < boolean > (false);
    const [message, setMessage] = useState < string > ('');
    const [profile, setProfile] = useState < string > ('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormUserData>({
        UserName: '',
        UserPhone: '',
        UserMail: '',
        UserAddress: '',
        UserCity: '',
        UserState: '',
        UserPostalCode: '',
        UserCountry: '',
        UserPassword: '',
        UserProfileTypeId: '',
    });

    useEffect(() => {
        axios({
            method: 'GET',
            url: get_all_user_profile_type, // Replace with your API URL
        })
            .then((res) => {
                if (res.data.error) {
                    setMessage(res.data.message);
                    setOpen(true);
                    setStatus(false);
                    setColor(false);
                } else {
                    setMessage(res.data.message);
                    setOptions(res.data.data);
                    setOpen(true);
                    setStatus(true);
                    setColor(true);
                }
            })
            .catch((err) => {
                alert('Oops something went wrong ' + err);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const obj: FormUserData = {
            UserName: formData.UserName,
            UserPhone: formData.UserPhone,
            UserMail: formData.UserMail,
            UserAddress: formData.UserAddress,
            UserCity: formData.UserCity,
            UserState: formData.UserState,
            UserPostalCode: formData.UserPostalCode,
            UserCountry: formData.UserCountry,
            UserPassword: formData.UserPassword,
            UserProfileTypeId: profile,
        };
        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: user_sign_up, // Replace with your API URL
            data: sendData,
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
                    navigate('/');
                }
            })
            .catch((err) => {
                alert('Oops something went wrong ' + err);
            });
    };


    return (
        <div className='loginback'>
            <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
            <Container component="main" maxWidth="xs">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} className='glassCard' mt={1}>
                <Box
                    sx={{
                        px:4,
                        py:1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                            <Box sx={{ mx: 1 }}>
                                <img src={GGV} alt='logo' style={{ width: 100, height: 75, objectFit: 'contain' }} />
                            </Box>
                            <Typography 
                                color='#7bc54c'
                                fontSize={{
                                    lg: 28,
                                    md: 26,
                                    sm: 23,
                                    xs: 20,
                                }}
                                variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" id='form1' noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="UserName"
                                    fullWidth
                                    id="firstName"
                                    label="Your Full Name"
                                    autoFocus
                                    size='small'
                                    onChange={handleChange}
                                />
                            </Grid>
                                    <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="UserMail"
                                    autoComplete="email"
                                    size='small'
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="phno"
                                    label="Phone Number"
                                    name="UserPhone"
                                    type='tel'
                                    size='small'
                                    onChange={handleChange}
                                />
                            </Grid>
{/* Address */}

                            <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="combo-box-demo"
                                size="small"
                                options={options}
                                onChange={(event, value) => setProfile(value?.UserProfileTypeId ?? '')}
                                getOptionLabel={(option) => option.UserProfileType}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Profile"
                                        name="UserProfileTypeId"
                                        fullWidth
                                        size="small"
                                    />
                                )}
                            />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="Address"
                                    label="Address_Line"
                                    name="UserAddress"
                                    type="text"
                                    variant="outlined"
                                    size='small'
                                    color='secondary'
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="Address"
                                    label="City"
                                    name='UserCity'
                                    type="text"
                                    variant="outlined"
                                    size='small'
                                    color='secondary'
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="Address"
                                    label="State"
                                    name='UserState'
                                    type="text"
                                    variant="outlined"
                                    size='small'
                                    color='secondary'
                                    onChange={handleChange}
                                />
                            </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="Address"
                                            label="Country"
                                            name='UserCountry'
                                            type="text"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={handleChange}
                                        />
                                    </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="postal"
                                    label="PostalCode"
                                    name="Postal"
                                    type='tel'
                                    size='small'
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="UserPassword"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    size='small'
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            form='form1'
                            variant="contained"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={()=>navigate('/')}>
                                    Already have an account? Sign in
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
        </div>
    );
}