import { colors, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    root: {
      height: '100%'
    },
    avatar: {
      backgroundColor: colors.indigo[600],
      height: 56,
      width: 56
    }
  }));