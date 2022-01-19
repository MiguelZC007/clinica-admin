import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				isAuthenticated ? <Redirect to='/home' /> : <Component {...props} />
			}
		/>
	);
};
