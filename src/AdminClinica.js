import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import WraperUtilities from './hoc/globalComponenst';
import { BrowserRouter } from 'react-router-dom';

export const AdminClinica = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<WraperUtilities>
					<AppRouter />
				</WraperUtilities>
			</BrowserRouter>
		</Provider>
	);
};
