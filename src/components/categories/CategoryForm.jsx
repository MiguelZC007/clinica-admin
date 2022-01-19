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
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import axios from '../../boot/axios';

export const CategoryForm = ({ action, openData, data, handleClose, handleModify }) => {
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
	const { loading } = useSelector((state) => state.ui);
	const [open, setOpen] = React.useState(openData);
	const [formValues, handleInputChange] = useForm(data);

	const { name, description, state } = formValues;

	const handleSubmit = (event) => {
		event.preventDefault();
		if (action === 'CREATE') {
			axios
				.post('/v1/categories', {
					name: name,
					description: description,
					state: state,
				})
				.then((response) => {
					handleModify(response.data);
					handleClose();
				})
				.catch((e) => console.log(e));
		}
		if (action === 'UPDATE') {
			axios
				.put('/v1/categories/' + data.id, {
					name: name,
					description: description,
					state: state,
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
							Categoria
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
								name='description'
								label='description'
								type='text'
								id='description'
								value={description}
								onChange={handleInputChange}
							/>

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
