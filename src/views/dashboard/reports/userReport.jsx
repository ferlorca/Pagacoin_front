import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';
import EmailIcon from '@material-ui/icons/Email';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import {useStyles} from "../../../styles/dashboard/reports/userStyle";


const User = ({user}) => {
  const classes = useStyles();  

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
       <Avatar
            className={classes.avatar}
            src={user.avatar}
          /> 
      
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {user.name}
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MobileFriendlyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Phone" secondary={user.phone} />
            </ListItem>            
          </List>
        </Box>
      </CardContent>      
    </Card>
  );
};

User.propTypes = {
  className: PropTypes.string
};

export default User;
