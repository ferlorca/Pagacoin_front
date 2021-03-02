
import React from 'react'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Row from "./transactionRow";


function TransactionTable({ isIncoming , transactions }) {    

    return <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow style={{ backgroundColor: "#d3e0ea" }}>
                    <TableCell>Wallet</TableCell>
                    <TableCell>Wallet Total</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions && transactions.length > 0 ? transactions.map((row) => (
                    <Row key={row.destiny+row.origin} transaction={row} isIncoming={isIncoming} />
                )) :
                <TableRow>
                    <TableCell colSpan={4}> 
                        <Grid container>
                            <Typography variant="body1" component="div">
                                You dont have transactions!
                            </Typography>
                        </Grid> 
                    </TableCell>
                </TableRow>                   
                    }
            </TableBody>
        </Table>
    </TableContainer>
}

export default TransactionTable
