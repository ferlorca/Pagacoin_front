import React from 'react';
import { Switch, Route } from 'react-router-dom';

//views
import Login from "./views/auth/login";
import Logout from "./views/auth/logout";
import Home from "./views/home/home";
import Dashboard from "./views/dashboard/dashboard";
import Logs from "./views/logs/logs";
import NoFoundComponent from "./views/errorsAndWarnings/noFoundComponent";
//hocs
import Layout from "./hoc/layout";
import Initializer from "./hoc/initializer";
import Styles from "./hoc/styles";
import Notifications from './components/notification';


export const actionRoutes = {
	home: "home",
	dashboard: "dashboard",	
	logout: "logout",
	login:"login",
	log: "log",
	noFoundPage:"noFoundPage"
}


function Routes() {
	return (
		<React.Fragment>
			<Initializer>
				<Switch>
					<Route path={"/"} exact component={()=>(<Layout><Home /></Layout>)} />
					<Route path={"/"+actionRoutes.logout} component={() => (<Logout />)} />							
					<Route path={"/"+actionRoutes.home} exact component={() => (<Layout><Home /></Layout>)} />							
					<Route path={"/"+actionRoutes.dashboard} exact component={()=>(<Layout><Dashboard /></Layout>)} />	
					<Route path={"/"+actionRoutes.log} exact component={()=>(<Layout><Logs /></Layout>)} />					
					<Route path={"/"+actionRoutes.login}  component={()=> (<Styles><Notifications /><Login /></Styles>)} />
					<Route to={"/"+actionRoutes.noFoundPage} component={() => (<Styles><NoFoundComponent /></Styles>)} />					
				</Switch>
			</Initializer>
		</React.Fragment>
	)
}

export default Routes;