import useAuthContext from '@/hooks/useAuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
	const { signed } = useAuthContext();

	return signed ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
