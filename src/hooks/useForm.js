import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState);
	const reset = () => {
		setValues(initialState);
	};
	const handleChange = ({ target }) => {
		if (target.type === 'checkbox') {
			setValues({
				...values,
				[target.name]: target.checked,
			});
		} else {
			setValues({
				...values,
				[target.name]: target.value,
			});
		}
	};
	return [values, handleChange, reset];
};
