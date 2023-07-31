import { Stack, Dialog, DialogTitle,DialogContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
interface LandItem {
  LandId: string;
  VirtualVideo: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  LandOwnerName: string;
  LandAddress1: string;
  LandAddress2: string;
  LandCity: string;
  LandState: string;
  LandCountry: string;
  MobileNum: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  LandStatus: string;
  LandRemarks: string;
}



interface LandDataDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  i: LandItem | null;
}

const LandDataDialog = ({ openDialog, setOpenDialog, i } : LandDataDialogProps) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{i?.LandId}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia component="video" height="400" src={i?.VirtualVideo} controls />
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" color="#84cb25" fontWeight={600} sx={{ marginTop: 2 }}>
                    Land Information
                  </Typography>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Land ID:
                    </Typography>
                    <Typography variant="body2">{i?.LandId}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Longitude:
                    </Typography>
                    <Typography variant="body2"> {i?.Longitude}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Latitude:
                    </Typography>
                    <Typography variant="body2"> {i?.Latitude}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Land Size:
                    </Typography>
                    <Typography variant="body2"> {i?.LandSize}</Typography>
                  </Box>
                  <Typography variant="h6" color="#84cb25" fontWeight={600}>
                    Land Owner Information
                  </Typography>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Land Owner Name:
                    </Typography>
                    <Typography variant="body2"> {i?.LandOwnerName}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Land Owner Address:
                    </Typography>
                    <Typography variant="body2">
                      {' '}
                      {i?.LandAddress1}, {i?.LandAddress2}, {i?.LandCity}, {i?.LandState}, {i?.LandCountry}
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Land Owner Ph:
                    </Typography>
                    <Typography variant="body2"> {i?.MobileNum}</Typography>
                  </Box>
                  <Typography variant="h6" color="#84cb25" fontWeight={600}>
                    Project Information
                  </Typography>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Creation Date:
                    </Typography>
                    <Typography variant="body2"> {i?.CreationDate}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Project Commence Date:
                    </Typography>
                    <Typography variant="body2"> {i?.ProjectCommenceDate}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Status:
                    </Typography>
                    <Typography variant="body2"> {i?.LandStatus}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Remarks:
                    </Typography>
                    <Typography variant="body2"> {i?.LandRemarks}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LandDataDialog;
