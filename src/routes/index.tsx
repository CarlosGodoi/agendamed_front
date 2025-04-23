import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { ProtectedRoutes } from '@/guard/protectedRoutes';
import { useRequest } from '@/hooks/useRequest';
import { privateRoutes } from './private.routes';
import useAuthContext from '@/hooks/useAuthContext';
import Home from '@/app/home';

const Login = lazy(() => import('@/app/login'));

const Loading = () => <div>Carregando...</div>;

export const MappedRoutes = () => {
	const { signed } = useAuthContext();
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
		<Suspense fallback={<Loading />}>
			<Routes>
				{/* Rota raiz para redirecionar para dashboard */}
				<Route path="/" element={<ProtectedRoutes />}>
					<Route index element={<Navigate replace to="dashboard" />} />{' '}
					{/* <-- sem barra */}
					<Route path="dashboard" element={<Home />} />
					{privateRoutes
						.filter((route) => route.path !== 'dashboard') // <-- compare sem a barra também
						.map(({ Page, children, path }, index) => {
							return (
								<Route key={index} path={path} element={<Page />}>
									{children.map(({ Component, pathChild }, ind) => {
										return (
											<Route
												key={ind}
												path={pathChild} // também deve ser relativo, sem barra!
												element={<Component />}
											/>
										);
									})}
								</Route>
							);
						})}
				</Route>

				{/* Rota de login isolada */}
				<Route
					path="/login"
					element={signed ? <Navigate replace to="/" /> : <Login />}
				/>

				{/* Fallback para qualquer outra rota */}
				<Route
					path="*"
					element={<Navigate replace to={signed ? '/' : '/login'} />}
				/>
			</Routes>
		</Suspense>
	);
};
