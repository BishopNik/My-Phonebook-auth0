/** @format */

import React, { useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ImgBox } from '../styled/shared.styled';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://github.com/BishopNik'>
				Bishop projects
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const defaultTheme = createTheme();

const Main = () => {
	useEffect(() => {}, []);

	return (
		<Container>
			<ThemeProvider theme={defaultTheme}>
				<ImgBox>
					<img
						fetchpriority='high'
						data-pin-no-hover='true'
						src='https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg'
						sizes='(max-width: 479px) 100vw, (min-aspect-ratio: 626/417) calc((100vh - 184px) * 1.501199040767386), (max-width: 1095px) calc(100vw - 40px), calc(100vw - 540px)'
						width='65%'
						alt='Фото Портрет красивого бородатого латиноамериканского мужчины с вьющимися волосами'
						srcSet='https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=360 360w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=740 740w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=826 826w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=900 900w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=996 996w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=1060 1060w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=1380 1380w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=1480 1480w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=1800 1800w, https://img.freepik.com/premium-photo/portrait-of-handsome-bearded-hispanic-man-with-curly-hair_251136-43905.jpg?w=2000 2000w'
					/>
				</ImgBox>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</ThemeProvider>
		</Container>
	);
};

export default Main;
