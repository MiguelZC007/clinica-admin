import { Route, Redirect } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				isAuthenticated ? (
					<MainLayout>
						<Component {...props} />
					</MainLayout>
				) : (
					<Redirect to='/auth/login' />
				)
			}
		/>
	);
};
