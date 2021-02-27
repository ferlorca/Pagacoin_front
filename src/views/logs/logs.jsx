import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import React, { useEffect } from 'react'
import moment from "moment"
import Loading from '../../components/loading';
import { useSelector ,useDispatch } from 'react-redux';
import {getAllLogs} from "../../store/actions/log_action"
import { useStyles } from "../../styles/log/log";


function Logs() {
    const logs = useSelector(state => state.log.logs)
    const loading = useSelector(state => state.log.loading)
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllLogs())       
    }, [])

    const renderLogs =()=>{
        return logs.map(item => [<ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FindInPageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.message + "   Date:"+ moment(item.createDate).format("HH:MM on DD/MM/YYYY") } secondary={item.stacktrace} />
                                </ListItem>
                                ,
                                <Divider variant="inset" component="li" />])
    }
    
    return (
        <Paper className={classes.root}>
        {loading ? 
            <Loading/>
        :
            logs && logs.length>0 ?      
            <List>
                {renderLogs()}
            </List>
            :
            <Typography variant="body" component="div">
                We dont have any log! It's a mystery
            </Typography>}
            </Paper>
        )
}

export default Logs
