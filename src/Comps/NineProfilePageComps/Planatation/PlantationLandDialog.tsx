import { Stack, Dialog, DialogTitle,DialogContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box} from '@mui/material';
import { LandOwnerFiles} from '../../../API_Service/API_Service';

interface PlanatationDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  i: PlantationData | null;
}

interface PlantationData {
  PlantationPartnerId: string;
  PlantationPartnerName: string;
  PlantationPartnerAddress1:string;
  PlantationPartnerAddress2:string;
  PlantationPartnerCity:string;
  PlantationPartnerState:string;
  PlantationPartnerPostalCode:string;
  PlantationPartnerCountry:string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  PlantationPartnerStatus:String;
}

const PlantationLandDialog = ({ openDialog, setOpenDialog, i } : PlanatationDialogProps) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
           <Box>
             <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>{i?.PlantationPartnerId}</DialogTitle>
            <DialogContent>
            <Box display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 600 }}>
            <CardMedia component="video" height="400" src={`${LandOwnerFiles}${i?.VirtualVideo}`} controls />
            <CardContent>
            <Stack spacing={1}>
            <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{marginTop:2}}>PlantationPartner Information</Typography>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>PlantationPartner ID:</Typography>
            <Typography variant="body2">{i?.PlantationPartnerId}</Typography>
            </Box>
             <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>PlantationPartner Name:</Typography>
            <Typography variant="body2"> {i?.PlantationPartnerName}</Typography>
            </Box>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>PlantationPartner Address:</Typography>
            <Typography variant="body2"> {i?.PlantationPartnerAddress1}, {i?.PlantationPartnerAddress2}, {i?.PlantationPartnerCity}, {i?.PlantationPartnerState}, {i?.PlantationPartnerCountry} </Typography>
            </Box>
            <Box display='flex' gap={1} flexDirection='row'>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>PlantationPartner Ph:</Typography>
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
            <Typography variant="body2"> {i?.PlantationPartnerStatus}</Typography>
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

export default PlantationLandDialog;