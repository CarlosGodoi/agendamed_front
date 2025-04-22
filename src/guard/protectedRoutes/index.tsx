import useAuthContext from '@/hooks/useAuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
	const { signed } = useAuthContext();

	if (!signed) {
		return <Navigate replace to="/login" />;
	}

	return <Outlet />;
};
