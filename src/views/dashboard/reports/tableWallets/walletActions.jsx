import { Grid, IconButton,Button, Tooltip } from '@material-ui/core'
import React from 'react'
import {useDispatch} from "react-redux"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { setSelectedWallet } from '../../../../store/actions/wallet_action';

function WalletActions({update,remove , wallet}) {

    const dispatch = useDispatch();
    const addNewTransaction =()=>{
        dispatch(setSelectedWallet(wallet));
    }

    return (
        <Grid container spacing={2} direction="row" justify="flex-end" alignItems="center"> 
            <Grid>
                <Tooltip title="Update Wallet">
                    <IconButton aria-label="wallet" onClick={()=>update()}>
                        <CreateIcon/>
                    </IconButton>
                </Tooltip>                
            </Grid>
            <Grid>
                <Tooltip title="Delete Wallet">
                    <IconButton disabled ={wallet.balance !== 0} aria-label="wallet" onClick={()=>remove()}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>                
            </Grid>
            <Grid>
                <Tooltip title="Add new transaction">
                    <Button variant="contained" color="primary" onClick={()=>addNewTransaction()}>
                        New transaction
                    </Button>
                </Tooltip>    
            </Grid> 
        </Grid>
    )
}

export default WalletActions
