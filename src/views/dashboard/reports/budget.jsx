import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import {useStyles } from "../../../styles/dashboard/reports/budget"
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useSelector } from 'react-redux';

const Budget = () => {
  const classes = useStyles();
  const total = useSelector(state => state.wallet.totalBalance)

    
  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL BUDGED
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {total} €
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Budget;