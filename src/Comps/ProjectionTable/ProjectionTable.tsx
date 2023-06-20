import React from 'react';
import {
    Box,
    Card,
} from '@mui/material';
import TimberProjectExpense from './Timber/TimberProjectExpense';
import CarbonProjectExpense from './Carbon/CarbonProjectExpense';
import TimberCuttingExpense from './Timber/TimberCuttingExpense';
import TimberRevenue from './Timber/TimberRevenue';
import CarbonRevenue from './Carbon/CarbonRevenue';

const ProjectionTable: React.FC = () => {
    return (
        <Box p={3}>
            <Card sx={{boxShadow:3}}>
                <TimberProjectExpense />
                <CarbonProjectExpense />
                <TimberCuttingExpense />
                <TimberRevenue />
                <CarbonRevenue />
            </Card>
        </Box>
    );
};

export default ProjectionTable;
