import { lazy } from 'react';
import { ROLE } from '@/enums/profile';
import { Outlet } from 'react-router-dom';

const Home = lazy(() => import('@/app/home'));
const Appointments = lazy(() => import('@/app/appointments'));
const Specialties = lazy(() => import('@/app/specialties'));
const Patients = lazy(() => import('@/app/patients'));
const Doctors = lazy(() => import('@/app/doctors'));

interface PrivateRouteChild {
	Component: React.ComponentType;
	pathChild: string;
	indexRoute?: boolean;
	permission: string[];
}

interface PrivateRoute {
	path: string;
	Page: React.ComponentType;
	children: PrivateRouteChild[];
	permission: string[];
}

export const privateRoutes: PrivateRoute[] = [
	{
		path: 'dashboard',
		Page: Home,
		children: [
			{
				Component: Home,
				pathChild: '',
				indexRoute: true,
				permission: [ROLE.ADMIN, ROLE.OPERATOR],
			},
		],
		permission: [ROLE.ADMIN, ROLE.OPERATOR, ROLE.DOCTOR],
	},
	{
		path: 'agendamentos',
		Page: Appointments,
		children: [
			{
				Component: Appointments,
				pathChild: '',
				indexRoute: true,
				permission: [ROLE.ADMIN, ROLE.OPERATOR],
			},
		],
		permission: [ROLE.ADMIN, ROLE.OPERATOR, ROLE.DOCTOR],
	},
	{
		path: 'pacientes',
		Page: Outlet,
		permission: [ROLE.ADMIN, ROLE.OPERATOR, ROLE.DOCTOR],
		children: [
			{
				Component: Patients,
				pathChild: '',
				indexRoute: true,
				permission: [ROLE.ADMIN, ROLE.OPERATOR],
			},
		],
	},
	{
		path: 'especialidades',
		Page: Specialties,
		children: [
			{
				Component: Specialties,
				pathChild: '',
				indexRoute: true,
				permission: [ROLE.ADMIN, ROLE.OPERATOR],
			},
		],
		permission: [ROLE.ADMIN, ROLE.OPERATOR, ROLE.DOCTOR],
	},
	{
		path: 'medicos',
		Page: Doctors,
		children: [
			{
				Component: Doctors,
				pathChild: '',
				indexRoute: true,
				permission: [ROLE.ADMIN, ROLE.OPERATOR],
			},
		],
		permission: [ROLE.ADMIN, ROLE.OPERATOR, ROLE.DOCTOR],
	},
];
