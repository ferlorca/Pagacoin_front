import React from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Actions from "./userActions";
import {useStyles} from "../../../styles/home/users/rowStyle";
import {selectUser} from "../../../store/actions/user_action";
import useRouter from "../../../hook/useRouter";
import { actionRoutes } from "../../../routes";

const Row = ({user,updateUser}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routes = useRouter();
  const userSelected = useSelector(state => state.user.userSelected)    


  const update =()=>{
    updateUser(user,user.id)
  }

  const setSelected = ()=>{
    if(userSelected.id !== user.id)
      dispatch(selectUser(user));
    routes.history.push(`/${actionRoutes.dashboard}`)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>       
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell align="right">
            <Actions user={user} update={update} setSelected={setSelected} />
        </TableCell>
      </TableRow>    
    </React.Fragment>
  );
}

Row.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,   
  }).isRequired,
};

export default Row;