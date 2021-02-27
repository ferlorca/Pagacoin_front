import React from "react";
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Actions from "./walletActions";
import {useStyles} from "../../../../styles/home/users/rowStyle";
import { useDispatch } from "react-redux";
import { removeWallet } from "../../../../store/actions/wallet_action";

const Row = ({wallet,updateWallet}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const update =()=>{
    updateWallet(wallet,wallet.id)
  }

  const remove =()=>{
    dispatch(removeWallet(wallet))
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>       
        <TableCell component="th" scope="row">
          {wallet.alias}
        </TableCell>
        <TableCell>{wallet.balance}</TableCell>      
        <TableCell align="right">
            <Actions wallet={wallet} update={update} remove={remove}/>
        </TableCell>
      </TableRow>    
    </React.Fragment>
  );
}

Row.propTypes = {
  wallet: PropTypes.shape({
        id: PropTypes.string.isRequired,
        alias: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired
  }).isRequired,
};

export default Row;