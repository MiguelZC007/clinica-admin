import Axios from 'axios';
import { authHeader } from '../helpers/auth_header';

const axios = Axios.create({
	// baseURL: 'http://localhost:3001',
	baseURL: 'http://194.195.208.156:3001',
	withCredentials: false,
	credentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

axios.interceptors.request.use(
	(config) => {
		if (authHeader()) {
			config.headers['Authorization'] = authHeader();
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	(config) => {
		return config;
	},
	(error) => {
		if (error.response.data.message === 'Unauthorized') {
			localStorage.clear();
			window.location.href = '/auth/login';
		}
		return Promise.reject(error);
	},
);

export default axios;
