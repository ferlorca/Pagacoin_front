import { Grid, IconButton, Tooltip } from '@material-ui/core'
import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import AssignmentIcon from '@material-ui/icons/Assignment';

function UserActions({update,setSelected}) {
    return (
        <Grid container spacing={2} direction="row" justify="flex-end" alignItems="center">           
            <Grid>
                <Tooltip title="View Data">
                    <IconButton aria-label="view"  onClick={()=>setSelected()}>
                        <AssignmentIcon/>
                    </IconButton>
                </Tooltip>                
            </Grid>
            <Grid>
                <Tooltip title="Update User">
                    <IconButton aria-label="user" onClick={()=>update()}>
                        <CreateIcon/>
                    </IconButton>
                </Tooltip>                
            </Grid>
        </Grid>
    )
}

export default UserActions
