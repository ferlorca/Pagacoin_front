import { Fab, Grid, Tooltip, Typography} from '@material-ui/core'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import Loading from '../../../components/loading';
import {useStyles} from "../../../styles/dashboard/reports/walletsStyles";
import WalletTable from "./tableWallets/walletTable";
import AddIcon from '@material-ui/icons/Add';
import AddOrUpdatePopup from "../walletPopup";


function Wallets({owner}) {
    const classes =useStyles();
    const loadingWallets = useSelector(state => state.wallet.loading)

    const [open, setOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
  

    const handleAddWallet =()=>{
        setItemSelected(null);
        setOpen(true);
    }

    const handleUpdateWallet= (wallet) => {
        setItemSelected(wallet);
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    };

    return( 
        <React.Fragment>
            <AddOrUpdatePopup open={open} handleClose={handleClose} item={itemSelected} />    
            <Grid container justify="center"  alignItems="center">
                <Grid item xs={12} sm={6}  >
                    <Typography className={classes.title} variant="h6" component="div">
                        Wallets
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                         If you want to remove a wallet, It must be in 0
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.add} >
                    <Grid container justify="flex-end">
                        <Tooltip title="Add new Wallet">
                            <Fab color="primary" aria-label="add" onClick={()=>handleAddWallet()}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>      
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes.margintop}> 
                {!loadingWallets ? 
                    <WalletTable updateWallet={handleUpdateWallet}/> : 
                    <Loading/> 
                }
            </Grid>   
        </React.Fragment>            
    )
}

export default Wallets