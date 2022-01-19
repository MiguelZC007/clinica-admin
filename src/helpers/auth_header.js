export const authHeader = () => {
	const session = JSON.parse(localStorage.getItem('auth'));
	if (session) {
		return `Bearer ${session.token.access_token}`;
	} else {
		return '';
	}
};
