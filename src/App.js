import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { connect } from "react-redux";
import Loader from './common/loader';
import AppConstant from "./constant/AppConstant.js";

import './App.css';
const DashboardComponent = lazy(() => import('./components/Dashboard'));
const Login = lazy(() => import('./shared/Login'));

const Page404 = props => (
	<div className="container">
		<div className="row">
			<div className="col-md-12">
				<div className="error-template">
					<h1>
						Oops!</h1>
					<h2>
						404 Not Found</h2>
					<div className="error-details">
						Sorry, an error has occured, Requested page not found!
					</div>
					<div className="error-actions">
						<button className="btn btn-info btn-lg" onClick={() => window.location.href = ""}>
							<i className="fa fa-home"></i>
							Take Me Home
						</button>
						<button className="btn btn-default btn-lg border-1">
							<span className="fa fa-envelope"></span>
							Contact Support
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const RedirectToLogin = ({ location }) => (
	<Redirect to={"/login?redirect=" + location.pathname + location.search} />
);
const App = props => {
	const { cookies } = props;
	const user = cookies.get("user");

	const renderComponent = (Component, routeProps, isRoute) => {
		if (user) {
			return <Component {...routeProps} />
		} else {
			return <RedirectToLogin {...routeProps} />
		}
	};
	return (
		<div className="">
			<Suspense fallback={<div><Loader /></div>}>
				<Switch>
					<Route
						exact
						path="/login"
						component={Login} 
					/>
					<Route
						exact
						path="/dashboard"
						render={routeProps => renderComponent(DashboardComponent, routeProps)}
					/>
					<Route
						exact
						path="/"
						render={routeProps => renderComponent(DashboardComponent, routeProps)}
					/>
					<Route component={Page404} />
				</Switch>
			</Suspense>
		</div>
	);
}

export default withRouter(
	withCookies(
		connect()(App)
	)
);
