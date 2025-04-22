import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { ProtectedRoutes } from '@/guard/protectedRoutes';
import { useRequest } from '@/hooks/useRequest';
import { privateRoutes } from './private.routes';
import PublicRoutes from '@/guard/publicRoutes';
import useAuthContext from '@/hooks/useAuthContext';

const Login = lazy(() => import('@/app/login'));

const Loading = () => <div>Carregando...</div>;

export const MappedRoutes = () => {
	const { user } = useAuthContext();
	const { apiRequest } = useRequest();

	useEffect(() => {
		const beforeUnload = async (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.stopPropagation();
			await apiRequest('post', '/auth/logout')
				.then(() => console.log('logout'))
				.catch((error) => console.log(error));

			e.returnValue = '';
		};

		window.addEventListener('beforeunload', beforeUnload);
		return () => window.removeEventListener('beforeunload', beforeUnload);
	}, [apiRequest]);

	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					{/* Rotas protegidas */}
					<Route path="/" element={<ProtectedRoutes />} />
					<Route index element={<Navigate replace to="/dashboard" />} />

					{/* Mapeando rotas privadas */}
					{privateRoutes.map(({ Page, children, path, permission }, index) => {
						if (user?.role && permission.includes(user.role)) {
							return (
								<Route key={index} path={path} element={<Page />}>
									{/* Verificando se existem children */}
									{children.length > 0 &&
										children.map(
											(
												{
													Component,
													pathChild,
													indexRoute,
													permission: permissionChild,
												},
												ind
											) => {
												if (permissionChild.includes(user.role)) {
													return (
														<Route
															index={indexRoute}
															key={ind}
															path={pathChild}
															element={<Component />}
														/>
													);
												}
												return null; // Evita erro caso a condição não seja satisfeita
											}
										)}
								</Route>
							);
						}
						return null;
					})}

					{/* Rotas públicas */}
					<Route path="/" element={<PublicRoutes />}>
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<Navigate replace to="/login" />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};
