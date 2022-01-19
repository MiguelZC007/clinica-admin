import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Logo from '../../assets/logo.webp';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export const HomeScreen = () => {
	return (
		<React.Fragment>
			<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
				<Grid container spacing={3}>
					<Grid alignContent={'center'} alignItems={'center'} item xs={12}>
						<Card>
							<CardMedia component='img' image={Logo} alt='Paella dish' />
						</Card>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};
