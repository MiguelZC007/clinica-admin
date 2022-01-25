import {
	Inventory2,
	PeopleAlt,
	AccessTime,
	Person,
	Assessment,
	Category,
	Biotech,
	Science,
	EMobiledata,
	AccountCircle,
	AddReaction,
	AirlineSeatIndividualSuite,
} from '@mui/icons-material';
export const iconColor = 'primary';
export const drawerWidth = 240;

export const itemsList = [
	{
		name: 'Usuarios',
		path: '/users',
		icon: <PeopleAlt color={iconColor} />,
	},
	{
		name: 'Categorias',
		path: '/categories',
		icon: <Category color={iconColor} />,
	},
	{
		name: 'Productos',
		path: '/products',
		icon: <Inventory2 color={iconColor} />,
	},
	{
		name: 'Sub Laboratorios',
		path: '/sub-laboratory',
		icon: <Biotech color={iconColor} />,
	},
	{
		name: 'Especialidades',
		path: '/specialties',
		icon: <EMobiledata color={iconColor} />,
	},
	{
		name: 'Roles',
		path: '/roles',
		icon: <AccountCircle color={iconColor} />,
	},
	{
		name: 'Sintomas',
		path: '/symptoms',
		icon: <AddReaction color={iconColor} />,
	},
	{
		name: 'Enfermedades de Base',
		path: '/underlying-disease',
		icon: <AirlineSeatIndividualSuite color={iconColor} />,
	},
	{
		name: 'Reactivos',
		path: '/reagent',
		icon: <Science color={iconColor} />,
	},

	{
		name: 'Reportes',
		path: '/report',
		icon: <Assessment color={iconColor} />,
	},
];
