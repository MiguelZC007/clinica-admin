import { types } from "../types/types";

const initialState = {
	isAuthenticated: localStorage.getItem('auth') ? true : false,
	data: localStorage.getItem('auth') ? localStorage.getItem('auth') : {},
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.login:
			return {
				isAuthenticated: true,
				data:action.payload
			};

		case types.logout:
			return {
				isAuthenticated: false,
				data: {},
			};
		default:
			return state;
	}
};