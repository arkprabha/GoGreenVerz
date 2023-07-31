import { Stack, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';

interface AdminDialogProps {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    i: AdminData | null;
}

interface AdminData {
    AdminId: string;
    AdminName: string;
    AdminAddress1: string;
    AdminAddress2: string;
    AdminCity: string;
    AdminState: string;
    AdminPostalCode: string;
    AdminCountry: string;
    MobileNum: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    VirtualVideo: string;
    Remarks: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    AdminStatus: String;
}

const AdminLandDialog = ({ openDialog, setOpenDialog, i }: AdminDialogProps) => {
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>{i?.AdminId}</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="center">
                        <Card sx={{ maxWidth: 600 }}>
                            <CardMedia component="video" height="400" src={i?.VirtualVideo} controls />
                            <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{ marginTop: 2 }}>Admin Information</Typography>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Admin ID:</Typography>
                                        <Typography variant="body2">{i?.AdminId}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Admin Name:</Typography>
                                        <Typography variant="body2"> {i?.AdminName}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Admin Address:</Typography>
                                        <Typography variant="body2"> {i?.AdminAddress1}, {i?.AdminAddress2}, {i?.AdminCity}, {i?.AdminState}, {i?.AdminCountry} </Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Admin Ph:</Typography>
                                        <Typography variant="body2"> {i?.MobileNum}</Typography>
                                    </Box>

                                    <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{ marginTop: 2 }}>Land Information</Typography>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Longitude:</Typography>
                                        <Typography variant="body2"> {i?.Longitude}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Latitude:</Typography>
                                        <Typography variant="body2"> {i?.Latitude}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Land Size:</Typography>
                                        <Typography variant="body2"> {i?.LandSize}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Remarks:</Typography>
                                        <Typography variant="body2"> {i?.Remarks}</Typography>
                                    </Box>

                                    <Typography variant="h6" color="#84cb25" fontWeight={600}>Project Information</Typography>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Creation Date:</Typography>
                                        <Typography variant="body2"> {i?.CreationDate}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Project Commence Date:</Typography>
                                        <Typography variant="body2"> {i?.ProjectCommenceDate}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Status:</Typography>
                                        <Typography variant="body2"> {i?.AdminStatus}</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default AdminLandDialog;