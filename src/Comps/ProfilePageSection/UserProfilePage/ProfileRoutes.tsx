import {
    Box,
    Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useNavigate } from 'react-router-dom';

interface totalprop{
 totalFormCount : number
}

export default function ProfileRoutes({totalFormCount} : totalprop) {
    const navigate = useNavigate();
    const UserProfileType: string | null = localStorage.getItem('UserProfileType') ?? '';

    return (
        <div>
            {
                UserProfileType === 'Land owner' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                    <Box textAlign="center" onClick={() => navigate('/listedlands')}>
                        <Typography color="#455636">Added Lands</Typography>
                            <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">New Land</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                            onClick={() => navigate('/addyourlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Update Lands
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                </Box>
                
            }
            {
                UserProfileType === 'Investor' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                    <Box textAlign="center" onClick={() => navigate('/investedlands')}>
                        <Typography color="#455636">Invested Lands</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">New Invest</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Edit Invest Information
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/investedlands')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            {
                UserProfileType === 'GoGreenverz or Project Developer' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                    <Box textAlign="center">
                    <Typography color="#455636" onClick={() => navigate('/devsubmittedlands')}>GGV Dev Form Filled</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">Update GoProject Form</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Edit Information
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/devsubmittedlands')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            {
                UserProfileType === 'Plantation Partner' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                        <Box textAlign="center" onClick={() => navigate('/myfilledlands')}>
                        <Typography color="#455636">Plantation Form Filled</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">Update Plantation Form</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Edit Plantation Form
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/myfilledlands')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            {
                UserProfileType === 'Verification and Validation Body' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                        <Box textAlign="center" onClick={() => navigate('/vvblandsubmissions')}>
                            <Typography color="#455636">VVB Form Filled</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">Update VVB Form</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Edit VVB Form
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/vvblandsubmissions')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            {
                UserProfileType === 'Carbon Registry of India' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                        <Box textAlign="center" onClick={() => navigate('/crisubmissions')}>
                            <Typography color="#455636" >CRI Form Filled</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">Update CRI LandForm</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Edit CRI LandForm
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/crisubmissions')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            {
                UserProfileType === 'Government Agencies' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                    <Box textAlign="center">
                    <Typography color="#455636" onClick={() => navigate('/govtsubmissions')}>GovtAgency Form Filled</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">Update GovtAgency Form</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#808000">
                            Edit GovtAgency Form
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/govtsubmissions')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            {
                UserProfileType === 'Admin' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                        <Box textAlign="center" onClick={() => navigate('/adminsubmittedlands')}>
                            <Typography color="#455636">Admin Form Filled</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">Update Form</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Edit Form
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/adminsubmittedlands')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
            {
                UserProfileType === 'Buyers' && 
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    justifyContent="space-around"
                >
                        <Box textAlign="center" onClick={() => navigate('/yourlands')}>
                        <Typography color="#455636">Bought Lands</Typography>
                        <Typography color="#808000">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">Buy Lands</Typography>
                        <Typography color="#808000">
                            <AddCircleOutlineIcon
                                    onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#455636">
                            Edit Purchase Information
                        </Typography>
                        <Typography color="#808000">
                            <UpgradeIcon
                                onClick={() => navigate('/yourlands')}
                            />
                        </Typography>
                    </Box>
                </Box>
            }
        </div>
    )
}
