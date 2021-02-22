import React from 'react';
import { Switch, Route } from 'react-router-dom';

//views
import Login from "./views/auth/login";
import Logout from "./views/auth/logout";
import NoFoundComponent from "./views/errorsAndWarnings/noFoundComponent";
//hocs
import Layout from "./hoc/layout";
import Initializer from "./hoc/initializer";
import Styles from "./hoc/styles";
import Notifications from './components/notification';


export const actionRoutes = {
	user: "user",
	wallet: "wallet",	
	logout: "logout",
	login:"login",
	noFoundPage:"noFoundPage"
}


function Routes() {
	return (
		<React.Fragment>
			<Initializer>
				<Switch>
					<Route path={"/"} exact component={()=>(<Layout><NoFoundComponent /></Layout>)} />
					<Route path={"/"+actionRoutes.logout} component={() => (<Logout />)} />							
					<Route path={"/"+actionRoutes.user} exact component={() => (<Layout><NoFoundComponent /></Layout>)} />							
					<Route path={"/"+actionRoutes.wallet} exact component={()=>(<Layout><NoFoundComponent /></Layout>)} />					
					<Route path={"/"+actionRoutes.login}  component={()=> (<Styles><Notifications /><Login /></Styles>)} />
					<Route to={"/"+actionRoutes.noFoundPage} component={() => (<Styles><NoFoundComponent /></Styles>)} />					
				</Switch>
			</Initializer>
		</React.Fragment>
	)
}

export default Routes;