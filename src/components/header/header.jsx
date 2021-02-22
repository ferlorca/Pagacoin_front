import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useRouter from "../../hook/useRouter";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { actionRoutes } from "../../routes";

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { logout } from '../../store/actions/auth_action';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => {
	return {
		title: {
			flexGrow: 1,
		},
		appbar: {
			backgroundColor: theme.palette.secondary.main,
			zIndex: theme.zIndex.drawer + 1
		},
		button: {
			backgroundColor: theme.palette.secondary.main,
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			marginRight: theme.spacing(2),
			marginLeft: 20,
			width: 'auto',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: '15%',
			},
		},
		searchIcon: {
			height: '100%',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	}
});


function Header() {
	const dispatch = useDispatch();
	const routes = useRouter();
	const classes = useStyles();
	const [value, setValue] = useState(actionRoutes.scheduler);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (routes) {
			let action = routes.location.pathname.replace("/", "");
			setValue(action === "" ? "user" : action);
		}
	}, [routes])


	const logoutHandler = () => {
		dispatch(logout());
	}


	const changeRoute = (e, value) => {
		setValue(value);
		routes.history.push(`/${value}`)
	}

	return (

		<AppBar position="fixed" className={classes.appbar}>
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					PAGACOINS 
                </Typography>

				<BottomNavigation
					value={value}
					onChange={(event, newValue) => { changeRoute(event, newValue) }}
					showLabels
					className={classes.button}
				>
					<BottomNavigationAction key={actionRoutes.user} value={actionRoutes.user} label={"User"} icon={<RestoreIcon />} />
					<BottomNavigationAction key={actionRoutes.wallet} value={actionRoutes.wallet} label={"Wallet"} icon={<FavoriteIcon />} />,

				</BottomNavigation>
				<IconButton
					aria-label={"more"}
					aria-controls="long-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					keepMounted
					open={open}
					onClose={handleClose}
				>
					<MenuItem onClick={logoutHandler}>{"Logout"}</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>

	)
}

export default Header
