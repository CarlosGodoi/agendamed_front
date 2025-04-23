import { ReactNode, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRequest } from '@/hooks/useRequest';
import { AuthContext, TUser } from './authContext';

interface IProps {
	children: ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
	const { apiRequest } = useRequest();
	const [user, setUser] = useState<TUser | null>(null);
	const [loading, setLoading] = useState(true);
	const signed = !!user;

	async function signIn(data: {
		email: string;
		password: string;
	}): Promise<{ status: boolean; message: string }> {
		try {
			const response = await apiRequest('post', '/auth', data);

			if (response?.accessToken) {
				const { accessToken, refreshToken, user } = response;

				localStorage.setItem('token', accessToken);
				Cookie.set('token', accessToken, {
					path: '/',
					expires: 1,
					sameSite: 'strict',
				});

				if (refreshToken) {
					Cookie.set('refreshToken', refreshToken, {
						path: '/',
						expires: 7,
						sameSite: 'strict',
					});
				}

				if (user) {
					setUser(user);
					Cookie.set('user', JSON.stringify(user), {
						path: '/',
						expires: 1,
						sameSite: 'strict',
					});
				}

				return { status: true, message: 'Login realizado com sucesso' };
			} else {
				return {
					status: false,
					message: 'Falha na autenticação. Verifique suas credenciais.',
				};
			}
		} catch (error) {
			if (
				(error as { response?: { status: number } }).response?.status === 401
			) {
				return { status: false, message: 'Credenciais inválidas' };
			}
			toast('error', {
				hideProgressBar: true,
				autoClose: 2000,
				type: 'error',
				theme: 'colored',
			});
			return { status: false, message: 'Erro ao realizar login' };
		}
	}

	async function signOut() {
		setUser(null);
		localStorage.removeItem('token');
		Cookie.remove('token');
		Cookie.remove('user');
		Cookie.remove('refreshToken');
	}

	const updateUserContext = ({
		name,
		email,
	}: {
		name: string;
		email: string;
	}) => {
		if (user) {
			const updatedUser = { ...user, name, email };
			setUser(updatedUser);
			Cookie.set('user', JSON.stringify(updatedUser), {
				path: '/',
				expires: 1,
				sameSite: 'strict',
			});
		}
	};

	useEffect(() => {
		setLoading(true);
		const userCookie = Cookie.get('user');
		if (userCookie) {
			try {
				const parsedUser = JSON.parse(userCookie) as TUser;

				setUser(parsedUser);
			} catch (error) {
				console.error('Error parsing user cookie:', error);
				if (error instanceof SyntaxError) setUser(null);
			}
		} else {
			setUser(null);
		}
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, signIn, signed, signOut, updateUserContext, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
