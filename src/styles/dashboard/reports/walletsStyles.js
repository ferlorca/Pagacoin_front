import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    title: {
        flex: '1 1 100%',
        fontWeight :"bold"
    },
    root: {
        padding: theme.spacing(3, 2),
    },
    margintop:{
        marginTop:theme.spacing(3, 2),
    },
    add: {
        marginBottom: theme.spacing(2),
    }
  }));
  