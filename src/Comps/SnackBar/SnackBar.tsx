import { Alert, Grow, Snackbar } from '@mui/material';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function GrowTransition(props: any) {
    return <Grow {...props} direction="up" />;
}

interface SnackBarProps {
    open: boolean;
    message: string;
    setOpen: (open: boolean) => void;
    status: boolean;
    color: boolean;
}

const SnackBar = ({ open, message, setOpen, status, color } : SnackBarProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={1500}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
            onClose={() => setOpen(false)}
            TransitionComponent={GrowTransition}
        >
            <Alert
                icon={status ? <TaskOutlinedIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}
                severity={color ? 'success' : 'error'}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
