import axios from '../boot/axios';

class AuthService {
	create(data) {
		return new Promise((resolve, reject) => {
			axios
				.post('/v1/products', data)
				.then((response) => {
					resolve(response);
				})
				.catch((e) => reject(e));
		});
	}
}

export const authService = new AuthService();
