import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import {useStyles } from "../../../styles/dashboard/reports/totalTransaction"
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';

const TotalTransaction = ({isIncoming,total}) => {
  const classes = useStyles();

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
              TOTAL {isIncoming? "INCOMING" :  "OUTCOMING"}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {total} €
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={isIncoming ? classes.incomming :classes.outcomming  }>
              <EuroSymbolIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalTransaction;