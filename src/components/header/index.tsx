import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Logo } from '../logo';
import { NavLink, useNavigate } from 'react-router-dom'; // Removido useLocation
import clsx from 'clsx';
import useAuthContext from '@/hooks/useAuthContext';

export const Header: React.FC = () => {
	const { user, signOut } = useAuthContext();
	const [userName, setUserName] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user.name) {
			setTimeout(() => {
				setUserName(user.name);
			}, 300);
		} else {
			setUserName('Usuário');
		}
	}, [user]);

	const handleSigOut = () => {
		signOut();
		navigate('/login');
	};

	const navLinks = [
		{ name: 'Home', path: '/dashboard' },
		{ name: 'Agendamentos', path: '/agendamentos' },
		{ name: 'Pacientes', path: '/pacientes' },
		{ name: 'Especialidades', path: '/especialidades' },
		{ name: 'Médicos', path: '/medicos' },
		{ name: 'Sair', action: handleSigOut },
	];

	return (
		<header className="flex h-20 justify-around items-center bg-primary">
			<div className="flex-1 items-start">
				<Logo />
			</div>
			<div className="flex-1 justify-center items-center">
				<nav className="flex justify-center items-center gap-8">
					{navLinks.map((link) =>
						link.path ? (
							<NavLink
								key={link.path}
								to={link.path}
								className={({ isActive }) =>
									clsx(
										'text-lg font-medium transition-colors',
										isActive
											? 'text-secondary'
											: 'text-gray_400 hover:text-white'
									)
								}
							>
								{link.name}
							</NavLink>
						) : (
							<a
								key={link.name}
								onClick={link.action}
								className="text-lg font-medium text-gray_400 hover:text-white cursor-pointer transition-colors"
							>
								{link.name}
							</a>
						)
					)}
				</nav>
			</div>
			<div className="flex-1 flex justify-end items-center gap-4 mr-10">
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>{userName?.charAt(0) || '?'}</AvatarFallback>
				</Avatar>
				<p className="text-lg text-white font-medium">{userName}</p>
			</div>
		</header>
	);
};
