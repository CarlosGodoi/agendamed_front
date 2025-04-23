import useAuthContext from '@/hooks/useAuthContext';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const PublicRoutes = () => {
	const { signed } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();

	console.log('PublicRoutes - signed status:', signed);

	useEffect(() => {
		// Apenas redirecionamos se estivermos em uma rota pública específica
		// e o usuário estiver autenticado
		if (signed && location.pathname === '/login') {
			navigate('/', { replace: true });
		}
	}, [signed, navigate, location.pathname]);

	// Sempre renderizamos o Outlet, e o redirecionamento é feito via useEffect
	return <Outlet />;
};

export default PublicRoutes;
