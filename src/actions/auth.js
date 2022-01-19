import { types } from '../types/types';
import { authService } from '../service/auth-service';
import { setError, removeError, startLoading, finishLoading } from './ui';
import Swal from 'sweetalert2';

export const loginform = (email, password) => {
	return (dispatch) => {
		authService
			.login({
				email: email,
				password: password,
			})
			.then((response) => {
				dispatch(removeError());
				dispatch(login(response.data));
			})
			.catch((e) => {
				dispatch(setError(e.response.data.message));
				Swal.fire({
					title: 'Error!',
					text: e.response.data.message,
					icon: 'error',
					confirmButtonText: 'ok',
					color: 'red',
				});
			})
			.finally(() => {});
	};
};

export const login = (user) => {
	localStorage.setItem('auth', JSON.stringify(user));
	return { type: types.login, payload: user };
};

export const logout = () => {
	localStorage.clear();
	return { type: types.logout };
};
