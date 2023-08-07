import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Autocomplete , Box} from "@mui/material";
import axios from 'axios';
import { verify_profile_by_developer } from '../../../../API_Service/API_Service';
import { appendData } from '../../../../Variables/ProcessVariable';

interface PropType {
    openVerifyDialog: boolean;
    setOpenVerifyDialog: React.Dispatch<React.SetStateAction<boolean>>;
    options:any;
    selectedStatus : string | null;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>;
    setMessage: (open: string) => void;
    setOpen: (open: boolean) => void;
    setStatus: (open: boolean) => void;
    setColor: (open: boolean) => void;
    LandId:string,
    UserProfileTypeId: string;
    getNotVerifiedLands: () => void;
}



export default function VerifyDialog({ getNotVerifiedLands , UserProfileTypeId , LandId, openVerifyDialog,  setMessage, setOpen, setStatus, setColor, setOpenVerifyDialog, options, selectedStatus, setSelectedStatus } : PropType) {

    const handleClose = () => {
        setOpenVerifyDialog(false);
        getNotVerifiedLands();
        setSelectedStatus('');
    };
    const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
    const UserId: string | null = localStorage.getItem('UserId') ?? '';

    const handleSubmit = () => {
        const obj = {
            LandId: LandId,
            UserProfileTypeId: UserProfileTypeId,
            UserId:UserId,
            IsGGVVerify: selectedStatus === 'GGV Verified' ? '1' : '0',
        }

        const sendData = appendData(obj);
        axios({
            method: 'POST',
            url: verify_profile_by_developer,
            data: sendData,
            headers: {
                'Authorization': `Bearer ${UserToken}`,
            }
        })
            .then((res) => {
                if (res.data.error) {
                    setMessage(res.data.message);
                    setOpen(true);
                    setStatus(false);
                    setColor(false);
                } else {
                    setMessage(res.data.message);
                    setOpen(true);
                    setStatus(true);
                    setColor(true);
                    handleClose();
                }
            })
            .catch((err) => {
                alert("Oops something went wrong " + err);
            });
    };

    return (
        <div>
            <Dialog open={openVerifyDialog} onClose={handleClose}>
                <DialogTitle>Move To Next Milestone</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box mt={1}>
                            To Move this to Next Profile , Select Status and Click Verify.
                        </Box>
                    </DialogContentText>
                    <Box p={2}>
                    <Autocomplete
                        id="combo-box-demo"
                        size="small"
                        onChange={(event, value) => setSelectedStatus(value || '')}
                        options={options}
                        value={selectedStatus}
                        renderInput={(params) => <TextField {...params} label="Status" />}
                    />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error' variant='outlined'>CANCEL</Button>
                    <Button onClick={handleSubmit} color='success' variant='outlined'>VERIFY</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
