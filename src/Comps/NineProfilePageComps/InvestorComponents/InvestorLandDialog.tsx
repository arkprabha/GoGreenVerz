import { Stack, Dialog, DialogTitle,DialogContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box} from '@mui/material';
import { LandOwnerFiles} from '../../../API_Service/API_Service';

interface InvestorDataDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  i: InvestorData | null;
}

interface InvestorData {
  InvestorId: string;
  VirtualVideo: string;
  InvestorName: string;
  InvestorAddress1: string;
  InvestorAddress2: string;
  InvestorCity: string;
  InvestorState: string;
  InvestorCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  InvestorStatus: string;
}

const InvestorLandDialog = ({ openDialog, setOpenDialog, i } : InvestorDataDialogProps) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
           <Box>
             <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>{i?.InvestorId}</DialogTitle>
            <DialogContent>
            <Box display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 600 }}>
            <CardMedia component="video" height="400" src={`${LandOwnerFiles}${i?.VirtualVideo}`} controls />
            <CardContent>
            <Stack spacing={1}>
            <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{marginTop:2}}>Investor Information</Typography>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Investor ID:</Typography>
            <Typography variant="body2">{i?.InvestorId}</Typography>
            </Box>
             <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Investor Name:</Typography>
            <Typography variant="body2"> {i?.InvestorName}</Typography>
            </Box>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Investor Address:</Typography>
            <Typography variant="body2"> {i?.InvestorAddress1}, {i?.InvestorAddress2}, {i?.InvestorCity}, {i?.InvestorState}, {i?.InvestorCountry}  </Typography>
            </Box>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>Investor Ph:</Typography>
            <Typography variant="body2"> {i?.MobileNum}</Typography>
            </Box>

           <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{marginTop:2}}>Land Information</Typography>
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

             <Typography variant="h6" color="#84cb25" fontWeight={600}>Investment Information</Typography>
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
            <Typography variant="body2"> {i?.InvestorStatus}</Typography>
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

export default InvestorLandDialog;