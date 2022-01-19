import axios from '../boot/axios';

class AuthService {
	login(data) {
		return new Promise((resolve, reject) => {
			axios
				.post('/v1/auth/login', data)
				.then((response) => {
					resolve(response);
				})
				.catch((e) => reject(e));
		});
	}

	logout(data) {
		return new Promise((resolve, reject) => {
			axios
				.post('/v1/auth/login', data)
				.then((response) => {
					resolve(response);
				})
				.catch((e) => reject(e));
		});
	}
}

export const authService = new AuthService();
