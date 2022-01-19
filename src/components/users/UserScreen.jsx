import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Checkbox, IconButton, TableContainer, Grid, Paper } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { MainContext } from '../../contexts/MainContext';
import axios from '../../boot/axios';
import Swal from 'sweetalert2';

export const UserScreen = () => {
	const { setLoading } = React.useContext(MainContext);
	const [open, setOpen] = React.useState(false);
	const [users, setUsers] = React.useState([]);
	const [action, setAction] = React.useState('');
	const [user, setUser] = React.useState({
		id: '',
		name: '',
		lastname: '',
		email: '',
		ci: '',
		cellphone: '',
		birthdate: '',
		address1: '',
		rol: '',
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
			.get('/v1/user-rols/employees')
			.then((response) => {
				setUsers(response.data);
			})
			.catch((e) => {
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleModify = (data) => {};

	return (
		<React.Fragment>
			<Grid container justifyContent='center' margin='10px'>
				<Grid item>
					<Button
						variant='contained'
						onClick={() => {
							setAction('CREATE');
							setUser({
								id: '',
								name: '',
								lastname: '',
								email: '',
								ci: '',
								cellphone: '',
								birthdate: '',
								address1: '',
								rol: '',
							});
							setOpen(true);
						}}>
						Registrar Empleado
					</Button>
				</Grid>
			</Grid>
			<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
				<TableContainer sx={{ maxHeight: '75vh' }}>
					<Table stickyHeader sx={{ width: '100%' }} size='small'>
						<TableHead>
							<TableRow>
								{Object.keys(user).map((item) => {
									return (
										item != 'id' && (
											<TableCell
												sx={{ width: '20%' }}
												align='center'>
												{item}
											</TableCell>
										)
									);
								})}
								<TableCell sx={{ width: '20%' }} align='center'>
									Acciones
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((row) => (
								<TableRow key={row.id}>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.lastname}</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>{row.ci}</TableCell>
									<TableCell>{row.cellphone}</TableCell>
									<TableCell>{row.birthdate}</TableCell>
									<TableCell>{row.address1}</TableCell>
									<TableCell>{row.rol}</TableCell>
									<TableCell>
										<IconButton
											onClick={(e) => {
												e.preventDefault();
												setAction('UPDATE');
												setUser({
													id: row.id,
													name: row.name,
													lastname: row.lastname,
													email: row.email,
													ci: row.ci,
													cellphone: row.cellphone,
													birthdate: row.birthdate,
													address1: row.address1,
													rol: row.rol,
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
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{/* {open && (
				<CreateProductForm
					product={product}
					openData={open}
					action={action}
					handleModify={handleModify}
					handleClose={() => setOpen(false)}></CreateProductForm>
			)} */}
		</React.Fragment>
	);
};
