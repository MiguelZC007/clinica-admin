import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
	Modal,
	Typography,
	Select,
	MenuItem,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import axios from '../../boot/axios';

export const AcceptanceRangeForm = ({
	action,
	openData,
	data,
	handleClose,
	handleModify,
}) => {
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
		maxHeight: '70vh',
		overflow: 'auto',
	};
	const { loading } = useSelector((state) => state.ui);
	const [open, setOpen] = React.useState(openData);
	const [formValues, handleInputChange] = useForm(data);

	const {
		name,
		description,
		from,
		to,
		unit_measurement,
		maker,
		danger_from,
		danger_to,
		type,
		state,
	} = formValues;

	const handleSubmit = (event) => {
		event.preventDefault();
		if (action === 'CREATE') {
			axios
				.post('/v1/acceptance-range', {
					name: name,
					description: description,
					from: Number(from),
					to: Number(to),
					unit_measurement: unit_measurement,
					maker: maker,
					danger_from: Number(danger_from),
					danger_to: Number(danger_to),
					type: type,
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
				.put('/v1/acceptance-range/' + data.id, {
					name: name,
					description: description,
					from: Number(from),
					to: Number(to),
					unit_measurement: unit_measurement,
					maker: maker,
					danger_from: Number(danger_from),
					danger_to: Number(danger_to),
					type: type,
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
							Rango de Aceptacion
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

							<TextField
								margin='normal'
								fullWidth
								name='from'
								label='from'
								type='number'
								id='from'
								value={from}
								onChange={handleInputChange}
							/>

							<TextField
								margin='normal'
								fullWidth
								name='to'
								label='to'
								type='number'
								id='to'
								value={to}
								onChange={handleInputChange}
							/>

							<TextField
								margin='normal'
								fullWidth
								name='unit_measurement'
								label='unit_measurement'
								type='text'
								id='unit_measurement'
								value={unit_measurement}
								onChange={handleInputChange}
							/>

							<TextField
								margin='normal'
								fullWidth
								name='maker'
								label='maker'
								type='text'
								id='maker'
								value={maker}
								onChange={handleInputChange}
							/>

							<TextField
								margin='normal'
								fullWidth
								name='danger_from'
								label='danger_from'
								type='number'
								id='danger_from'
								value={danger_from}
								onChange={handleInputChange}
							/>

							<TextField
								margin='normal'
								fullWidth
								name='danger_to'
								label='danger_to'
								type='number'
								id='danger_to'
								value={danger_to}
								onChange={handleInputChange}
							/>

							<Select
								fullWidth
								id='type'
								name='type'
								value={type}
								label='type'
								onChange={handleInputChange}>
								<MenuItem key={1} value={'REACTIVO'}>
									Reactivo
								</MenuItem>
								<MenuItem key={2} value={'CONTEO'}>
									Conteo
								</MenuItem>
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
