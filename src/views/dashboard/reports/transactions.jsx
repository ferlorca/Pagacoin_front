import {  Grid,  Typography} from '@material-ui/core'
import React, { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/loading';
import { getAllTransactions } from '../../../store/actions/transaction_action';
import {useStyles} from "../../../styles/dashboard/reports/walletsStyles";
import TransactionTable from "./tableTransaction/transactionTable";


function Transactions() {
    const dispatch = useDispatch();
    const classes =useStyles();
    const wallets = useSelector(state => state.wallet.wallets)
    const loading = useSelector(state => state.transaction.loading)

    
    useEffect(() => {
        if(wallets.lenght > 0)
            dispatch(getAllTransactions())
    }, [wallets])
  

    return( 
        <React.Fragment>            
            <Grid container justify="center"  alignItems="center">
                <Grid item xs={12} sm={6}  >
                    <Typography className={classes.title} variant="h6" component="div">
                        Incoming transactions
                    </Typography>
                </Grid>             
            </Grid>
            <Grid container justify="center" className={classes.margintop}> 
                {!loading ? 
                    <TransactionTable/> : 
                    <Loading/> 
                }
            </Grid>   
        </React.Fragment>            
    )
}

export default Transactions