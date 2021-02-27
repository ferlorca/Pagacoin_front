import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Paper, Tooltip ,Typography} from '@material-ui/core';
import { useStyles } from "../../styles/dashboard/dashboardStyle";
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import UserReport from "./reports/userReport";
import useRouter from '../../hook/useRouter';
import { actionRoutes } from '../../routes';
import Wallets from './reports/wallets';
import Budget from "./reports/budget";
import TotalTransaction from "./reports/totalTransactions";
import { getAllWallets } from '../../store/actions/wallet_action';
import TransactionTable from './reports/tableTransaction/transactionTable';
import Loading from '../../components/loading';
import TransactionPopup from './transactionPopup';

function Wallet() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const routes = useRouter();
    const user = useSelector(state => state.user.userSelected)    
    const totalincoming = useSelector(state => state.transaction.totalIncoming)    
    const totaloutcoming = useSelector(state => state.transaction.totalOutcoming)    
    const transactionsloading = useSelector(state => state.transaction.loading)
    const selectedWalletToMakeATransaction = useSelector(state => state.wallet.selected)     
    const incoming = useSelector(state => state.transaction.transactions?.received)   
    const outcoming = useSelector(state => state.transaction.transactions?.delivered)   

    const [open, setOpen] = useState(false);  
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(selectedWalletToMakeATransaction){
            setOpen(true);
        }
    }, [selectedWalletToMakeATransaction])
    
    useEffect(() => {
        if(user)
            dispatch(getAllWallets(user.id))
    }, []) 

    

    return (
        user ? 
        <div className={classes.root}>
            <TransactionPopup  open={open} handleClose={handleClose} myWallet={selectedWalletToMakeATransaction}/>
            <Grid container spacing={3}>
                <Grid item xs={6}>  
                    <Tooltip title="Return to User List">
                        <IconButton aria-label="delete" color="primary" onClick={()=> routes.history.push(`/${actionRoutes.home}`)}>
                            <ArrowBackIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>                   
                </Grid>
                <Grid item xs={12}>  
                    <Grid container spacing={3}  direction="row" justify="space-between"  alignItems="stretch">
                        <Grid item xs={12} sm={3}>
                            <UserReport user={user}/>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}><Budget/></Grid>
                                <Grid item xs={12} sm={4}><TotalTransaction total={totalincoming} isIncoming={true}/></Grid>
                                <Grid item xs={12} sm={4}><TotalTransaction total={totaloutcoming} isIncoming={false}/></Grid>                                
                                <Grid item xs={12}>{user ? <Wallets owner={user}/> : <Paper className={classes.paper}>No wallets</Paper>}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>                   
                    <Typography className={classes.title} variant="h6" component="div">
                        Incoming Transactions
                    </Typography>  
                    <Grid container justify="center" className={classes.margintop}> 
                        {!transactionsloading ? 
                            <TransactionTable isIncoming={true} transactions={incoming}/>
                                : 
                            <Loading/> 
                        }
                    </Grid>   
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.title} variant="h6" component="div">
                        Outcoming Transactions
                    </Typography>   
                    <Grid container justify="center" className={classes.margintop}> 
                        {!transactionsloading ? 
                            <TransactionTable isIncoming={false} transactions={outcoming}/>
                                : 
                            <Loading/> 
                        }
                    </Grid>   
                </Grid>              
            </Grid>
        </div> : null 

    )
}

export default Wallet
