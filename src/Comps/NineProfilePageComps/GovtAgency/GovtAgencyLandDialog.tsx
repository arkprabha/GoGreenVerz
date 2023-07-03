import { Stack, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
import { GOVTFiles } from '../../../API_Service/API_Service';

interface GovAgencyDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  i: GovAgencyData | null;
}

interface GovAgencyData {
  GovAgencyId: string;
  GovAgencyName: string;
  GovAgencyAddress1: string;
  GovAgencyAddress2: string;
  GovAgencyCity: string;
  GovAgencyState: string;
  GovAgencyPostalCode: string;
  GovAgencyCountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  GovAgencyStatus: String;
}

const GovtAgencyLandDialog = ({ openDialog, setOpenDialog, i }: GovAgencyDialogProps) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{i?.GovAgencyId}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia component="video" height="400" src={`${GOVTFiles}${i?.VirtualVideo}`} controls />
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{ marginTop: 2 }}>GovAgency Information</Typography>
                  <Box display='flex' gap={1} flexDirection='row'>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>GovAgency ID:</Typography>
                    <Typography variant="body2">{i?.GovAgencyId}</Typography>
                  </Box>
                  <Box display='flex' gap={1} flexDirection='row'>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>GovAgency Name:</Typography>
                    <Typography variant="body2"> {i?.GovAgencyName}</Typography>
                  </Box>
                  <Box display='flex' gap={1} flexDirection='row'>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>GovAgency Address:</Typography>
                    <Typography variant="body2"> {i?.GovAgencyAddress1}, {i?.GovAgencyAddress2}, {i?.GovAgencyCity}, {i?.GovAgencyState}, {i?.GovAgencyCountry} </Typography>
                  </Box>
                  <Box display='flex' gap={1} flexDirection='row'>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>GovAgency Ph:</Typography>
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
                    <Typography variant="body2"> {i?.GovAgencyStatus}</Typography>
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

export default GovtAgencyLandDialog;