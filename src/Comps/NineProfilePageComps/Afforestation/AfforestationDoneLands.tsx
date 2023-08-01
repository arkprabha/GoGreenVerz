import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import { get_afforestation, methodPost } from '../../../API_Service/API_Service';
import SnackBar from '../../SnackBar/SnackBar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';

interface RowData {
  AfforestationId: string;
  CompanyName: string;
  CoordinationPerson: string;
  StateName: string;
  District: string;
  LandOwnership: string;
  LandType: string;
  SocialBenefits: string;
}

export default function AfforestationDoneLands() {

  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [data, setData] = useState<RowData[]>([]);
  const UserToken: string | null = localStorage.getItem('UserToken') ?? '';
  const UserId: string | null = localStorage.getItem('UserId') ?? '';

  const navigate = useNavigate();

  useEffect(() => {
    const lData = new FormData()
    lData.append('UserId', UserId);
    axios({
      method: methodPost,
      url: get_afforestation,
      data: lData,
      headers: {
        'Authorization': `Bearer ${UserToken}`,
      }
    }).then(res => {
      if (res.data.error) {
        setMessage(res.data.message)
        setOpen(true)
        setStatus(false)
        setColor(false)
      } else {
        setMessage(res.data.message)
        setOpen(true)
        setStatus(true)
        setColor(true)
        setData(res.data.data);
      }
    }).catch(err => {
      alert('Oops something went wrong ' + err)
    });
  }, [])

  
  return (
    <Box p={2}>
      <SnackBar open={open} setOpen={setOpen} message={message} color={color} status={status} />
      <TableContainer className='borderAnimae' component={Paper} sx={{ backgroundColor: '#daf6e8', ':hover': { boxShadow: 10 }, }}>
      <Table>
          <TableHead sx={{ bgcolor:'#dee4e1'}}>
          <TableRow>
            <TableCell sx={{fontWeight:600}} align='center'>Afforestation ID</TableCell>
              <TableCell sx={{fontWeight:600}} align='center'>Company Name</TableCell>
              <TableCell sx={{fontWeight:600}} align='center'>Location</TableCell>
              <TableCell sx={{fontWeight:600}} align='center'>LandOwnership</TableCell>
              <TableCell sx={{fontWeight:600}} align='center'>LandType</TableCell>
              <TableCell sx={{fontWeight:600}} align='center'>SocialBenefits</TableCell>
              <TableCell sx={{fontWeight:600}} align='center'>View</TableCell>
              <TableCell sx={{fontWeight:600}} align='center'>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row?.AfforestationId}>
              <TableCell align='center'>{row?.AfforestationId}</TableCell>
              <TableCell align='center'>{row?.CompanyName}</TableCell>
              <TableCell align='center'>{row?.District} {row?.StateName}</TableCell>
              <TableCell align='center'>{row?.LandOwnership}</TableCell>
              <TableCell align='center'>{row?.LandType}</TableCell>
              <TableCell align='center'>{row?.SocialBenefits}</TableCell>
              <TableCell align='center'><VisibilityIcon onClick={() => navigate('/viewafforestation', { state: {id:row?.AfforestationId}})} sx={{verticalAlign:'middle', color:'green' , cursor:'pointer'}} /></TableCell>
              <TableCell align='center'><BorderColorIcon onClick={() => navigate('/editafforestation', { state: { id: row?.AfforestationId }})} sx={{ verticalAlign: 'middle', color: 'red', cursor:'pointer'}}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}