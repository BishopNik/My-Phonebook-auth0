/** @format */

import { Toaster } from 'react-hot-toast';
import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from 'hooks';
import { PrivateRoute } from './PrivateRoute';
import SharedLayout from './SharedLayout';
import Loader from 'components/Loader';
import { resetError } from 'redux/auth/authSlice';
import { toastError } from 'components/Helpers';

const Phonebook = lazy(() => import('pages/Phonebook'));
const Main = lazy(() => import('pages/Main'));
const ChangeSettings = lazy(() => import('pages/ChangeSettings'));
const UnknownPage = lazy(() => import('pages/UnknownPage'));

function App() {
	const dispatch = useDispatch();
	const { isRefreshing, errorUser, user } = useAuth();
	useEffect(() => {
		if (user) dispatch(refreshUser({ user }));
	}, [dispatch, user]);

	useEffect(() => {
		if (errorUser !== null && errorUser !== 'Unable to fetch user') toastError(`${errorUser}`);
		dispatch(resetError());
	}, [dispatch, errorUser]);

	return isRefreshing ? (
		<Loader />
	) : (
		<>
			<Routes>
				<Route path='/' element={<SharedLayout />}>
					<Route
						path='phonebook'
						element={<PrivateRoute redirectTo='/main' component={<Phonebook />} />}
					/>
					<Route
						path='settings'
						element={<PrivateRoute redirectTo='/main' component={<ChangeSettings />} />}
					/>
					<Route path='main' element={<Main />} />
					<Route index element={<Main />} />
					<Route path='*' element={<UnknownPage />} />
				</Route>
			</Routes>

			<Toaster
				position='top-right'
				reverseOrder={false}
				gutter={8}
				toastOptions={{
					duration: 5000,
					style: {
						background: '#fdfbea',
						color: '#000000',
					},
				}}
			/>
		</>
	);
}

export default App;
