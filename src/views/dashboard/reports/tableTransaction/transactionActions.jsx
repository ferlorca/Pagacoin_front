import { Grid, IconButton, Tooltip } from '@material-ui/core'
import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

function WalletActions({update,remove , wallet}) {
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
        </Grid>
    )
}

export default WalletActions
