import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import { CRIFiles } from "../../../API_Service/API_Service";

interface CRIDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  i: CRIData | null;
}

interface CRIData {
  CRIId: string;
  CRIName: string;
  CRIAddress1: string;
  CRIAddress2: string;
  CRICity: string;
  CRIState: string;
  CRIPostalCode: string;
  CRICountry: string;
  MobileNum: string;
  Longitude: string;
  Latitude: string;
  LandSize: string;
  VirtualVideo: string;
  Remarks: string;
  CreationDate: string;
  ProjectCommenceDate: string;
  CRIStatus: String;
}

const CRILandDialog = ({ openDialog, setOpenDialog, i }: CRIDialogProps) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{i?.CRIId}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                component="video"
                height="400"
                src={`${CRIFiles}${i?.VirtualVideo}`}
                controls
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography
                    variant="h6"
                    color="#84cb25"
                    fontWeight={600}
                    sx={{ marginTop: 2 }}
                  >
                    CRI Information
                  </Typography>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      CRI ID:
                    </Typography>
                    <Typography variant="body2">{i?.CRIId}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      CRI Name:
                    </Typography>
                    <Typography variant="body2"> {i?.CRIName}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      CRI Address:
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      {i?.CRIAddress1}, {i?.CRIAddress2}, {i?.CRICity},{" "}
                      {i?.CRIState}, {i?.CRICountry}{" "}
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      CRI Ph:
                    </Typography>
                    <Typography variant="body2"> {i?.MobileNum}</Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    color="#84cb25"
                    fontWeight={600}
                    sx={{ marginTop: 2 }}
                  >
                    Land Information
                  </Typography>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Longitude:
                    </Typography>
                    <Typography variant="body2"> {i?.Longitude}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Latitude:
                    </Typography>
                    <Typography variant="body2"> {i?.Latitude}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Land Size:
                    </Typography>
                    <Typography variant="body2"> {i?.LandSize}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Remarks:
                    </Typography>
                    <Typography variant="body2"> {i?.Remarks}</Typography>
                  </Box>

                  <Typography variant="h6" color="#84cb25" fontWeight={600}>
                    Investment Information
                  </Typography>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Creation Date:
                    </Typography>
                    <Typography variant="body2"> {i?.CreationDate}</Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Project Commence Date:
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      {i?.ProjectCommenceDate}
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1} flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Status:
                    </Typography>
                    <Typography variant="body2"> {i?.CRIStatus}</Typography>
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

export default CRILandDialog;
