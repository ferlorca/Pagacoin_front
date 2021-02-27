import { colors, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    root: {
      height: '100%'
    },
    incomming: {
      backgroundColor: colors.green[700],
      height: 56,
      width: 56
    },
    outcomming: {
      backgroundColor: colors.red[300],
      height: 56,
      width: 56
    }
  }));