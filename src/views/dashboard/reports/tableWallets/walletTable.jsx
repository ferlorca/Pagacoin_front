
import React from 'react'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import Row from "./walletRow";


function WalletTable({ updateWallet }) {
    const wallets = useSelector(state => state.wallet.wallets)

    return <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow style={{ backgroundColor: "#d3e0ea" }}>
                    <TableCell>Alias</TableCell>
                    <TableCell>Balance</TableCell>                
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {wallets.length > 0 ? wallets.map((row) => (
                    <Row key={row.id} wallet={row} updateWallet={updateWallet} />
                )) :
                    <Grid container >
                        <Typography variant="body" component="div">
                            You dont have wallets! Add a new one
                        </Typography>
                    </Grid>  
                    }
            </TableBody>
        </Table>
    </TableContainer>
}

export default WalletTable
