import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MenuItem, Modal, Select, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import axios from '../../boot/axios';
import { MainContext } from '../../contexts/MainContext';

export const SubLaboratoryForm = ({
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
	};
	const { loading, setLoading } = React.useContext(MainContext);
	const [open, setOpen] = React.useState(openData);
	const [products, setProducts] = React.useState([]);
	const [ranges, setRanges] = React.useState([]);
	const [formValues, handleInputChange] = useForm(data);
	const { name, product_id, reagent_id } = formValues;

	React.useEffect(() => {
		setLoading(true);
		axios
			.get('/v1/products/laboratorios')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((e) => {
				console.log(e);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
		setLoading(true);
		axios
			.get('/v1/reagent')
			.then((response) => {
				setRanges(response.data);
			})
			.catch((e) => {
				console.log(e);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (action === 'CREATE') {
			axios
				.post('/v1/sub-laboratory', {
					name: name,
					product_id: product_id,
					reagent_id: reagent_id,
				})
				.then((response) => {
					handleModify(response.data);
					handleClose();
				})
				.catch((e) => console.log(e));
		}
		if (action === 'UPDATE') {
			axios
				.put('/v1/sub-laboratory/' + data.id, {
					name: name,
					product_id: product_id,
					reagent_id: reagent_id,
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
							Producto Resultado
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

							<Select
								fullWidth
								id='product_id'
								name='product_id'
								value={product_id}
								label='product'
								onChange={handleInputChange}>
								{products.map((product) => {
									return (
										<MenuItem key={product.id} value={product.id}>
											{product.name}
										</MenuItem>
									);
								})}
							</Select>

							<Select
								fullWidth
								id='reagent_id'
								name='reagent_id'
								value={reagent_id}
								label='reagent'
								onChange={handleInputChange}>
								{ranges.map((range) => {
									return (
										<MenuItem key={range.id} value={range.id}>
											{range.name}
										</MenuItem>
									);
								})}
							</Select>

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
