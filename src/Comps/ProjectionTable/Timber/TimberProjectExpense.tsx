import { useState } from 'react';
import {
    Box,
    Table,
    TextField,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
} from '@mui/material';

interface ExpenseRow {
    item: string;
    description: string;
    cost: string | number;
    qty: string | number;
    total: number;
}

const TimberProjectExpense = () => {
    const [rows, setRows] = useState < ExpenseRow[] > ([]);

    // const handleCostChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    //     const newRows = [...rows];
    //     newRows[index].cost = parseFloat(event.target.value);
    //     setRows(newRows);
    // };

    // const handleQtyChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    //     const newRows = [...rows];
    //     newRows[index].qty = parseInt(event.target.value);
    //     setRows(newRows);
    // };

    const calculateTotal = (cost: number, qty: number): number => {
        if (!cost || !qty) {
            return 0;
        }
        return cost * qty;
    };

    const calculateOverallTotal = (): string => {
        const overallTotal = rows.reduce((total, row) => total + calculateTotal(row.cost as number, row.qty as number), 0);
        return overallTotal.toFixed(2);
    };

    const handleCellChange = (index: number, property: keyof ExpenseRow, value: ExpenseRow[keyof ExpenseRow]) => {
        const newRows: ExpenseRow[] = [...rows];
        newRows[index] = { ...newRows[index], [property]: value };
        setRows(newRows);
    };

    const handleBlur = (index: number) => {
        const row = rows[index];
        const cost = row.cost as number;
        const qty = row.qty as number;
        const total = calculateTotal(cost, qty);
        handleCellChange(index, 'total', total);
    };

    const addRow = () => {
        setRows([...rows, { item: '', description: '', cost: '', qty: '', total: 0 }]);
    };

    return (
        <Box p={3}>
            <Typography variant="h6" textAlign="left" mb={2}>
                Timber Cutting Expenses
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#7bc54c' }}>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 600, borderRight: '1px solid white', color: '#FFFFFF' }}>
                                Item
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, borderRight: '1px solid white', color: '#FFFFFF' }}>
                                Description
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, borderRight: '1px solid white', color: '#FFFFFF' }}>
                                Cost
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, borderRight: '1px solid white', color: '#FFFFFF' }}>
                                Qty
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, borderRight: '1px solid white', color: '#FFFFFF' }}>
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" sx={{ borderRight: '1px solid silver' }}>
                                    <TextField
                                        value={row.item}
                                        size="small"
                                        type="text"
                                        onChange={(event) => handleCellChange(index, 'item', event.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ borderRight: '1px solid silver' }}>
                                    <TextField
                                        value={row.description}
                                        size="small"
                                        type="text"
                                        onChange={(event) => handleCellChange(index, 'description', event.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ borderRight: '1px solid silver' }}>
                                    <TextField
                                        type="number"
                                        value={row.cost}
                                        size="small"
                                        onChange={(event) => handleCellChange(index, 'cost', parseFloat(event.target.value))}
                                        onBlur={() => handleBlur(index)}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ borderRight: '1px solid silver' }}>
                                    <TextField
                                        type="number"
                                        value={row.qty}
                                        size="small"
                                        onChange={(event) => handleCellChange(index, 'qty', parseInt(event.target.value))}
                                        onBlur={() => handleBlur(index)}
                                    />
                                </TableCell>
                                <TableCell align="center">{row.total}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={4} align="right" sx={{ fontWeight: 600, borderRight: '1px solid silver' }}>
                                Overall Total
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                                {calculateOverallTotal()}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Box p={2}>
                    <Button onClick={addRow} variant="contained">
                        Add Row
                    </Button>
                </Box>
            </TableContainer>
        </Box>
    );
};

export default TimberProjectExpense;
