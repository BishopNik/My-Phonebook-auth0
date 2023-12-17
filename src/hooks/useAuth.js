/** @format */

import { useSelector } from 'react-redux';
import {
	selectUser,
	selectIsLoggedIn,
	selectIsRefreshing,
	selectIsLogging,
	selectStatusResend,
	selectIsResend,
	statusUserError,
} from 'redux/auth/selectors';

export const useAuth = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isRefreshing = useSelector(selectIsRefreshing);
	const user = useSelector(selectUser);
	const isLogging = useSelector(selectIsLogging);
	const statusResend = useSelector(selectStatusResend);
	const isResend = useSelector(selectIsResend);
	const errorUser = useSelector(statusUserError);

	return {
		isLoggedIn,
		isRefreshing,
		user,
		isLogging,
		statusResend,
		isResend,
		errorUser,
	};
};
