/** @format */

import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks';

export const PrivateRoute = ({ component: Component, redirectTo = '/main' }) => {
	const { isLoggedIn } = useAuth();

	return !isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
