import { useState } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from '../../assets/removebg-preview-1.png';
import './Login.styles.css';
import SnackBar from '../SnackBar/SnackBar';

function LoginPage() {

    const navigate = useNavigate();


    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [color, setColor] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(true);

    // const onSubmit = (data) => {
    //     const serverData = new FormData()
    //     serverData.append('MobileNum', data.MobileNum);
    //     serverData.append('Password', data.Password);
    //     serverData.append('Device', 'Website');
    //     if (!navigator.onLine) {
    //         setMessage('Your internet is in Offline')
    //         setOpen(true)
    //         setStatus(false)
    //         setColor(false)
    //     } else {
    //         axios({
    //             method: methodPost,
    //             url: login,
    //             data: serverData,
    //         }).then(res => {
    //             if (res.data.error) {
    //                 setMessage(res.data.message)
    //                 setOpen(true)
    //                 setStatus(false)
    //                 setColor(false)
    //             } else {
    //                 localStorage.setItem('auth', true);
    //                 navigate(`/home`)
    //                 setMessage(res.data.message)
    //                 setOpen(true)
    //                 setStatus(false)
    //                 setColor(false)
    //             }
    //         }).catch(err => {
    //             alert('Oops something went wrong ' + err);
    //             console.log("", err);
    //         });
    //     }

    // }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/home');
        localStorage.setItem('UserAuth', String(true));
        setMessage('Logged In Successfully');
        setOpen(true);
        setStatus(false);
        setColor(false);
    };

    return (
        <Box sx={{
            height: "100vh",
        }}>
            <SnackBar
                open={open}
                message={message}
                setOpen={setOpen}
                status={status}
                color={color}
            />
            <>
                <Box component="div" className='loginback'>
                    <Grid container sx={{ height: "100vh" }} alignItems={"center"} justifyContent="center">
                        <Grid className="glassCard" item xs={10} sm={10} md={10} lg={4} xl={4} sx={{ textAlign: 'center' }}>
                            <Box sx={{ px: 4, py: 4 }}>
                                <Box>
                                    <img src={logo} style={{width:150 , height:150 , objectFit:'contain' , verticalAlign:'middle'}} alt="gogreen logo" />
                                </Box>
                                <form onSubmit={onSubmit} id='form1'>
                                <Box sx={{ py: 2, color: '#7bc54c' }}>
                                    <Typography
                                        fontSize={{
                                            lg: 30,
                                            md: 26,
                                            sm: 23,
                                            xs: 20,
                                        }}
                                        variant="h5"
                                    >
                                        Welcome
                                    </Typography>
                                </Box>
                               
                                    <Box sx={{ py: 2 }} >
                                        <TextField
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#000000',
                                                    background: '#FFFFFF',
                                                    borderColor: 'silver',
                                                },
                                            }}
                                            fullWidth
                                            label="User Name"
                                            variant="outlined"
                                            autoComplete="off"
                                            InputLabelProps={{ shrink: true }}
                                        />

                                    </Box>
                                    <Box sx={{ py: 2 }}>
                                        <TextField
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#000000',
                                                    background: '#FFFFFF',
                                                    borderColor: 'silver',
                                                },
                                            }}
                                            variant="outlined"
                                            autoComplete="off"
                                            InputLabelProps={{ shrink: true }}
                                            type={showPassword ? "password" : "text"}
                                            label="Password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                setShowPassword(!showPassword)
                                                            }
                                                            edge="end"
                                                            sx={{ color: '#262626' }}
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff sx={{color:'#262626'}} />
                                                            ) : (
                                                                <Visibility sx={{ color: '#262626' }} />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            type='submit'
                                            form='form1'
                                            sx={{ p: 2, color: 'white', bgcolor: '#84cb25', ':hover': { bgColor:'#7bc54c'}}}
                                            fullWidth
                                            variant="contained"
                                        >
                                            Login
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>

                    <Outlet />
                </Box>
            </>
        </Box>
    );
}

export default LoginPage;
