import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
	Checkbox,
	FormControlLabel,
	MenuItem,
	Modal,
	Select,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MainContext } from '../../contexts/MainContext';
import { useForm } from '../../hooks/useForm';
import axios from '../../boot/axios';

export const CreateProductForm = ({
	action,
	openData,
	product,
	handleClose,
	handleModify,
}) => {
	const { loading } = useSelector((state) => state.ui);
	const { setLoading } = React.useContext(MainContext);
	const dispatch = useDispatch();
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};
	const [open, setOpen] = React.useState(openData);
	const [categories, setCategories] = React.useState([]);
	const [formValues, handleInputChange] = useForm(product);

	React.useEffect(() => {
		setLoading(true);
		axios
			.get('/v1/categories')
			.then((response) => {
				setCategories(response.data);
			})
			.catch((e) => {
				console.log(e);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const { name, price, sub_category, description, category_id, state, programmable } =
		formValues;

	const handleSubmit = (event) => {
		event.preventDefault();
		if (action === 'CREATE') {
			axios
				.post('/v1/products', {
					name: name,
					price: price,
					sub_category: sub_category,
					description: description,
					category_id: category_id,
					state: state,
					programmable: programmable,
				})
				.then((response) => {
					handleModify(response.data);
					handleClose();
				})
				.catch((e) => console.log(e));
		}
		if (action === 'UPDATE') {
			axios
				.put('/v1/products/' + product.id, {
					name: name,
					price: price,
					sub_category: sub_category,
					description: description,
					category_id: category_id,
					state: state,
					programmable: programmable,
				})
				.then((response) => {
					handleModify(response.data);

					handleClose();
				})
				.catch((e) => console.log(e));
		}
	};

	const formValidator = () => {
		return true;
	};

	return (
		<React.Fragment>
			<Modal open={open} onClose={handleClose}>
				<Box sx={{ ...style, width: 400 }}>
					<Grid container component='main'>
						<Typography component='h1' variant='h5'>
							Producto
						</Typography>
						<Box
							component='form'
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='name'
								label='name'
								name='name'
								autoComplete='name'
								autoFocus
								value={name}
								onChange={handleInputChange}
							/>
							<TextField
								margin='normal'
								fullWidth
								name='price'
								label='price'
								type='number'
								id='price'
								value={price}
								onChange={handleInputChange}
							/>
							<TextField
								margin='normal'
								fullWidth
								name='sub_category'
								label='sub_category'
								type='text'
								id='sub_category'
								value={sub_category}
								onChange={handleInputChange}
							/>
							<TextField
								margin='normal'
								fullWidth
								name='description'
								label='description'
								type='text'
								id='description'
								value={description}
								onChange={handleInputChange}
							/>

							<Select
								fullWidth
								labelId='demo-simple-select-label'
								id='category_id'
								name='category_id'
								value={category_id}
								label='category'
								onChange={handleInputChange}>
								{categories.map((category) => {
									return (
										<MenuItem key={category.id} value={category.id}>
											{category.name}
										</MenuItem>
									);
								})}
							</Select>
							<FormControlLabel
								control={
									<Checkbox
										name='state'
										label='state'
										id='state'
										checked={state}
										onChange={handleInputChange}
									/>
								}
								label='Estado'
							/>
							<FormControlLabel
								control={
									<Checkbox
										name='programmable'
										label='programmable'
										id='programmable'
										checked={programmable}
										onChange={handleInputChange}
									/>
								}
								label='Programable'
							/>

							<Button
								disabled={loading}
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
								Guardar
							</Button>
						</Box>
					</Grid>
				</Box>
			</Modal>
		</React.Fragment>
	);
};
