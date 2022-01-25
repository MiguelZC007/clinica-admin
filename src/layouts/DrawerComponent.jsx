import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, useTheme } from '@mui/material/styles';
import { iconColor, itemsList } from './item-list';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// ...theme.mixins.toolbar,
	justifyContent: 'flex-end',
	height: 45,
}));

export const DrawerComponent = ({ dispatch, open, handleDrawerClose }) => {
	// const { rol } = useSelector((state) => state.auth);
	const location = useLocation();
	const history = useHistory();
	const [openList, setOpenList] = useState(false);

	const theme = useTheme();

	const goToPage = (e, path) => {
		e.preventDefault();
		if (path === '/login') {
			history.replace(path);
		}
		history.push(path);
	};

	return (
		<React.Fragment>
			<List dense={true}>
				{itemsList.map((item, index) => {
					return (
						<ListItem
							sx={{
								bgcolor: location.pathname === item.path && '#b9e0e1',
							}}
							key={index}
							button
							onClick={(e) => {
								goToPage(e, item.path);
							}}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItem>
					);
				})}
				{/* <ListItem button onClick={() => setOpenList(!openList)}>
					<ListItemIcon>
						<SettingsIcon color={iconColor} />
					</ListItemIcon>
					<ListItemText primary='Ajustes ' />
					{openList ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openList} timeout='auto' unmountOnExit>
					<List dense={true} component='div' disablePadding>
						{itemsSetting.map((item, index) => (
							<ListItem
								sx={{
									pl: 4,
									bgcolor: location.pathname === item.path && '#bbdefb',
								}}
								key={index}
								button
								onClick={() => {
									history.push(item.path);
								}}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.name} />
							</ListItem>
						))}
					</List>
				</Collapse> */}
			</List>
			<Divider />
			<List dense={true}>
				<ListItem
					button
					onClick={(e) => {
						localStorage.clear();
						goToPage(e, '/auth/login');
					}}>
					<ListItemIcon>
						<LogoutIcon color={iconColor} />
					</ListItemIcon>
					<ListItemText primary='Salir' />
				</ListItem>
			</List>
		</React.Fragment>
		// <Drawer
		// 	sx={{
		// 		width: drawerWidth,
		// 		flexShrink: 0,
		// 		'& .MuiDrawer-paper': {
		// 			width: drawerWidth,
		// 			boxSizing: 'border-box',
		// 		},
		// 	}}
		// 	variant='persistent'
		// 	anchor='left'
		// 	open={open}>
		// 	<DrawerHeader>
		// 		<IconButton size='small' onClick={handleDrawerClose}>
		// 			{theme.direction === 'ltr' ? (
		// 				<ChevronLeftIcon fontSize='small' />
		// 			) : (
		// 				<ChevronRightIcon fontSize='small' />
		// 			)}
		// 		</IconButton>
		// 	</DrawerHeader>
		// 	<Divider />
		// 	<List dense={true}>
		// 		{itemsList.map((item, index) => {
		// 			return (
		// 				<ListItem
		// 					sx={{
		// 						bgcolor: location.pathname === item.path && '#b9e0e1',
		// 					}}
		// 					key={index}
		// 					button
		// 					onClick={(e) => {
		// 						goToPage(e, item.path);
		// 					}}>
		// 					<ListItemIcon>{item.icon}</ListItemIcon>
		// 					<ListItemText primary={item.name} />
		// 				</ListItem>
		// 			);
		// 		})}
		// 		{/* <ListItem button onClick={() => setOpenList(!openList)}>
		// 			<ListItemIcon>
		// 				<SettingsIcon color={iconColor} />
		// 			</ListItemIcon>
		// 			<ListItemText primary='Ajustes ' />
		// 			{openList ? <ExpandLess /> : <ExpandMore />}
		// 		</ListItem>
		// 		<Collapse in={openList} timeout='auto' unmountOnExit>
		// 			<List dense={true} component='div' disablePadding>
		// 				{itemsSetting.map((item, index) => (
		// 					<ListItem
		// 						sx={{
		// 							pl: 4,
		// 							bgcolor: location.pathname === item.path && '#bbdefb',
		// 						}}
		// 						key={index}
		// 						button
		// 						onClick={() => {
		// 							history.push(item.path);
		// 						}}>
		// 						<ListItemIcon>{item.icon}</ListItemIcon>
		// 						<ListItemText primary={item.name} />
		// 					</ListItem>
		// 				))}
		// 			</List>
		// 		</Collapse> */}
		// 	</List>
		// 	<Divider />
		// 	<List dense={true}>
		// 		<ListItem
		// 			button
		// 			onClick={(e) => {
		// 				goToPage(e, '/auth/login');
		// 			}}>
		// 			<ListItemIcon>
		// 				<LogoutIcon color={iconColor} />
		// 			</ListItemIcon>
		// 			<ListItemText primary='Salir' />
		// 		</ListItem>
		// 	</List>
		// </Drawer>
	);
};
