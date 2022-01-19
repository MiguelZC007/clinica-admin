import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export const iconColor = 'primary';
export const drawerWidth = 240;

export const itemsList = [
	{
		name: 'Usuarios',
		path: '/users',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Productos',
		path: '/products',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Productos-Resultados',
		path: '/product-result',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Categorias',
		path: '/categories',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Especialidades',
		path: '/specialties',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Roles',
		path: '/roles',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Sintomas',
		path: '/symptoms',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Enfermedades de Base',
		path: '/underlying-disease',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	{
		name: 'Rangos de Aceptacion',
		path: '/acceptance-range',
		icon: <PeopleAltIcon color={iconColor} />,
	},
	// {
	// 	name: 'Agenda',
	// 	path: '/schedule',
	// 	icon: <PermContactCalendarIcon color={iconColor} />,
	// },
	// {
	// 	name: 'Agenda',
	// 	path: '/calendar',
	// 	icon: <InsertInvitationIcon color={iconColor} />,
	// },
	// {
	// 	name: 'Ventas',
	// 	path: '/cashier',
	// 	icon: <MonetizationOnIcon color={iconColor} />,
	// },
	// {
	// 	name: 'Historia clinica',
	// 	path: '/medical-history',
	// 	icon: <AssignmentIcon color={iconColor} />,
	// },
	// {
	// 	name: 'Signos vitales',
	// 	path: '/vital-signs',
	// 	icon: <LocalHospitalIcon color={iconColor} />,
	// },
	{
		name: 'Reportes',
		path: '/report',
		icon: <AssessmentIcon color={iconColor} />,
	},
];

export const itemsSetting = [
	{
		name: 'Horarios de trabajo',
		path: '/profile',
		icon: <PersonIcon color={iconColor} />,
	},
	{
		name: 'Dias libres',
		path: '/day-off',
		icon: <AccessTimeIcon color={iconColor} />,
	},
];

export const itemsAlone = [
	{
		name: 'Re-agendar',
		path: '/reschedule',
	},
	{
		name: 'Recibo de venta',
		path: '/sale-print',
	},
	{
		name: 'Reporte',
		path: '/report-print',
	},
];
