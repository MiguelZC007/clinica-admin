import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { DashboardRoutes } from './Dashboard';
export const AppRouter = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						isAuthenticated={isAuthenticated}
						path='/auth'
						component={AuthRouter}
					/>
					<PrivateRoute
						isAuthenticated={isAuthenticated}
						path='/'
						component={DashboardRoutes}
					/>
					<Redirect to='/auth/login' />
				</Switch>
			</div>
		</Router>
	);
};
