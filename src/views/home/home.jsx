import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from "../../styles/home/homeStyle";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "./users/userTable";
import Loading from "../../components/loading";
import { getAllUser } from '../../store/actions/user_action';
import AddOrUpdatePopup from "./addOrUpdatePopup";

function Home() {
    const classes = useStyles();    
    const [open, setOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading)

    useEffect(() => {
        dispatch(getAllUser())
    }, [])

    
  const handleAddUser = () => {   
    setItemSelected(null);
    setOpen(true);  
  };

  const handleUpdateUser = (user) => {
    setItemSelected(user);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <React.Fragment>
            <AddOrUpdatePopup open={open} handleClose={handleClose} item={itemSelected} />
            <Paper className={classes.root}>
                <Grid container justify="center"  alignItems="center">
                    <Grid item xs={12} sm={6}  >
                        <Typography variant="h4">
                            User List
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify="flex-end">
                            <Button id="add_new_user" variant="contained" color="primary" onClick={()=>handleAddUser()}>
                                Add New user
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>           
            <Grid container justify="center" className={classes.margintop}>
                {loading ? <Loading /> : <UserTable updateUser={handleUpdateUser}/>}
            </Grid>
        </React.Fragment>
    )
}

export default Home
