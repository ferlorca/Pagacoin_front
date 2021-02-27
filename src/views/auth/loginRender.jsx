import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormField from "../../components/formField";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "../../styles/auth/loginRenderStyle";

function LoginRender({formData,loading,submitForm,updateForm,error}) {
	const classes = useStyles();
	const showError = () => {
		if (error){
			return <div>{error.message} </div>
		}
		else return null
	}

	return (
		<main className={classes.main}>		
			<CssBaseline />
			<Paper className={classes.paper}>
				<Avatar src="/assets/PagacoinLogo.png" >
				</Avatar>
				<Typography component="h1" variant="h5">
					Pagacoin
				</Typography>
				<form className={classes.form}>
					<FormField formdata={formData.email}
						change={(element) => updateForm(element)} />

					<FormField formdata={formData.password}
						change={(element) => updateForm(element)} />
					
					{formData.isSignUp.value ? 
						<FormField formdata={formData.repassword}
						change={(element) => updateForm(element)} />
					:
						null
					}
					<FormField formdata={formData.isSignUp}
						change={(element) => updateForm(element)} />

					{loading === true ?  <CircularProgress className={classes.loading}/> : null}

					<Grid container className={classes.buttonsGrid} spacing={8} direction="row" justify="center" alignItems="center">
						
						<Grid item xs={6} >
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								onClick={(event) => submitForm(event)}
							>
								{formData.isSignUp.value ? 
									"Sign up"
								:
									"Sign in"
								}
							</Button>
						</Grid>						
					</Grid>
				</form>			

				{showError()}
			</Paper>
		</main>
	);
}

export default LoginRender;