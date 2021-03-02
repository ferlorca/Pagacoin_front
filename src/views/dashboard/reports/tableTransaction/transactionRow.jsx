import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import moment from "moment";
import {useStyles} from "../../../../styles/dashboard/reports/rowStyle";
import { Grid, Typography } from "@material-ui/core";

const Row = ({transaction,isIncoming}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}> 
        <TableCell>{transaction.wallet.alias}</TableCell>            
        <TableCell>{transaction.wallet.balance} €</TableCell>   
        <TableCell component="th" scope="row" align="right">
          <Grid container>
            {isIncoming?
              <ArrowUpwardIcon color="#4caf50"/>
            :
              <ArrowDownward color="error"/>
            }            
            <Typography className={classes.amount} variant="body1" component="div">
              {transaction.amount} €  
            </Typography>           
          </Grid> 
        </TableCell>
        <TableCell>
          {moment(transaction.date).format("HH:MM | DD/MM/YYYY")}
        </TableCell>        
      </TableRow>    
    </React.Fragment>
  );
}

export default Row;