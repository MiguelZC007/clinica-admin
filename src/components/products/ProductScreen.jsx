import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Checkbox, IconButton, Grid, Paper, TableContainer } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { MainContext } from '../../contexts/MainContext';
import axios from '../../boot/axios';
import { CreateProductForm } from './CreateProductForm';
import Swal from 'sweetalert2';

export const ProductScreen = () => {
	const { setLoading } = React.useContext(MainContext);
	const [open, setOpen] = React.useState(false);
	const [products, setProducts] = React.useState([]);
	const [action, setAction] = React.useState('');
	const [product, setProduct] = React.useState({
		id: '',
		name: '',
		price: 123,
		sub_category: '',
		description: '',
		category_id: '',
		state: true,
		programmable: false,
	});

	const handleDelete = (id) => {
		axios
			.delete('/v1/products/' + id)
			.then((response) => {
				handleModify(response.data);
				Swal.fire({
					title: 'Success!',
					text: 'Eliminado Correctamente',
					icon: 'success',
					confirmButtonText: 'ok',
					color: 'green',
				});
			})
			.catch((e) => {
				setLoading(false);
				Swal.fire({
					title: 'Error!',
					text: e.response.data.message,
					icon: 'error',
					confirmButtonText: 'ok',
					color: 'red',
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	React.useEffect(() => {
		setLoading(true);
		axios
			.get('/v1/products')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((e) => {
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleModify = (product) => {
		var data = products;
		let compare = data.filter((item) => item.id === product.id);
		compare.length > 0
			? (data = data.map((item) => {
					item.id === product.id ? (item = product) : (item = item);
					return item;
			  }))
			: data.push(product);
		setProducts(data);
	};

	return (
		<React.Fragment>
			<Grid container justifyContent='center' margin='10px'>
				<Grid item>
					<Button
						variant='contained'
						onClick={() => {
							setAction('CREATE');
							setProduct({
								id: '',
								name: '',
								price: 0,
								sub_category: '',
								description: '',
								category_id: '',
								state: true,
								programmable: false,
							});
							setOpen(true);
						}}>
						Crear Producto
					</Button>
				</Grid>
			</Grid>
			<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
				<TableContainer sx={{ maxHeight: '70vh' }}>
					<Table size='small' stickyHeader sx={{ width: '100%' }}>
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: '20%' }}>Nombre</TableCell>
								<TableCell sx={{ width: '10%' }}>Precio</TableCell>
								<TableCell sx={{ width: '10%' }}>Estado</TableCell>
								<TableCell sx={{ width: '10%' }}>Programable</TableCell>
								<TableCell sx={{ width: '10%' }}>Sub Categoria</TableCell>
								<TableCell sx={{ width: '10%' }}>Descripcion</TableCell>
								<TableCell sx={{ width: '10%' }} align='right'>
									Categoria
								</TableCell>
								<TableCell sx={{ width: '20%' }} align='center'>
									Acciones
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((row) => (
								<React.Fragment key={row.id}>
									<TableRow>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.price}</TableCell>
										<TableCell align='center'>
											<Checkbox size='small' checked={row.state} />
										</TableCell>
										<TableCell align='center'>
											<Checkbox
												size='small'
												checked={row.programmable}
											/>
										</TableCell>
										<TableCell>{row.sub_category}</TableCell>
										<TableCell>{row.description}</TableCell>
										<TableCell align='right'>
											{row.cat.name}
										</TableCell>
										<TableCell align='center'>
											<IconButton
												onClick={(e) => {
													e.preventDefault();
													setAction('UPDATE');
													setProduct({
														id: row.id,
														name: row.name,
														price: row.price,
														sub_category: row.sub_category,
														description: row.description,
														category_id: row.cat.id,
														state: row.state,
														programmable: row.programmable,
													});
													setOpen(!open);
												}}>
												<ModeEditIcon sx={{ color: 'orange' }} />
											</IconButton>
											<IconButton
												onClick={(e) => {
													e.preventDefault();
													handleDelete(row.id);
												}}>
												<DeleteIcon sx={{ color: 'red' }} />
											</IconButton>
										</TableCell>
									</TableRow>
								</React.Fragment>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{open && (
				<CreateProductForm
					product={product}
					openData={open}
					action={action}
					handleModify={handleModify}
					handleClose={() => setOpen(false)}></CreateProductForm>
			)}
		</React.Fragment>
	);
};
