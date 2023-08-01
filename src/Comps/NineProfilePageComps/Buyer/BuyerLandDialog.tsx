import { Stack, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';

interface BuyerDialogProps {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    i: BuyerData | null;
}

interface BuyerData {
    BuyerId: string;
    BuyerName: string;
    BuyerAddress1: string;
    BuyerAddress2: string;
    BuyerCity: string;
    BuyerState: string;
    BuyerPostalCode: string;
    BuyerCountry: string;
    MobileNum: string;
    Longitude: string;
    Latitude: string;
    LandSize: string;
    VirtualVideo: string;
    Remarks: string;
    CreationDate: string;
    ProjectCommenceDate: string;
    BuyerStatus: string;
    LandId: string;
}

const BuyerLandDialog = ({ openDialog, setOpenDialog, i }: BuyerDialogProps) => {
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>{i?.BuyerId}</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="center">
                        <Card sx={{ maxWidth: 600 }}>
                            <CardMedia component="video" height="400" src={i?.VirtualVideo} controls />
                            <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{ marginTop: 2 }}>Buyer Information</Typography>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Buyer ID:</Typography>
                                        <Typography variant="body2">{i?.BuyerId}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Buyer Name:</Typography>
                                        <Typography variant="body2"> {i?.BuyerName}</Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Buyer Address:</Typography>
                                        <Typography variant="body2"> {i?.BuyerAddress1}, {i?.BuyerAddress2}, {i?.BuyerCity}, {i?.BuyerState}, {i?.BuyerCountry} </Typography>
                                    </Box>
                                    <Box display='flex' gap={1} flexDirection='row'>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>Buyer Ph:</Typography>
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
                                        <Typography variant="body2"> {i?.BuyerStatus}</Typography>
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

export default BuyerLandDialog;