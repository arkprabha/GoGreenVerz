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
                        <Typography color="#F9F9F8">Added Lands</Typography>
                            <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">New Land</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                            onClick={() => navigate('/addyourlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Update Lands
                        </Typography>
                        <Typography color="#ACE1AF">
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
                        <Typography color="#F9F9F8">Invested Lands</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">New Invest</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Edit Invest Information
                        </Typography>
                        <Typography color="#ACE1AF">
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
                    <Typography color="#F9F9F8" onClick={() => navigate('/devsubmittedlands')}>GGV Dev Form Filled</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">Update GoProject Form</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Edit Information
                        </Typography>
                        <Typography color="#ACE1AF">
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
                        <Typography color="#F9F9F8">Plantation Form Filled</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">Update Plantation Form</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Edit Plantation Form
                        </Typography>
                        <Typography color="#ACE1AF">
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
                            <Typography color="#F9F9F8">VVB Form Filled</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">Update VVB Form</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Edit VVB Form
                        </Typography>
                        <Typography color="#ACE1AF">
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
                            <Typography color="#F9F9F8" >CRI Form Filled</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">Update CRI LandForm</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Edit CRI LandForm
                        </Typography>
                        <Typography color="#ACE1AF">
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
                    <Typography color="#F9F9F8" onClick={() => navigate('/govtsubmissions')}>GovtAgency Form Filled</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">Update GovtAgency Form</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#ACE1AF">
                            Edit GovtAgency Form
                        </Typography>
                        <Typography color="#ACE1AF">
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
                            <Typography color="#F9F9F8">Admin Form Filled</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">Update Form</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Edit Form
                        </Typography>
                        <Typography color="#ACE1AF">
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
                        <Typography color="#F9F9F8">Bought Lands</Typography>
                        <Typography color="#ACE1AF">{totalFormCount}</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">Buy Lands</Typography>
                        <Typography color="#ACE1AF">
                            <AddCircleOutlineIcon
                                    onClick={() => navigate('/listedlands')}
                            />
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography color="#F9F9F8">
                            Edit Purchase Information
                        </Typography>
                        <Typography color="#ACE1AF">
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
