export const API_ROUTES = {
	auth: {
		base: '/auth',
		login: '/auth/login',
	},
	appointments: {
		base: '/appointments',
		getAll: '/appointments',
		reports: '/appointments/reports',
		create: '/appointments/register',
		updateStatusAppointment: (appointmentId: string) =>
			`/appointments/${appointmentId}/status`,
	},
	specialties: {
		base: '/specialties',
		getAll: '/specialties',
		register: '/specialties/register',
		delete: (specialtyId: string) => `/specialty/delete/${specialtyId}`,
	},
	doctor: {
		base: '/doctors',
		getAll: '/doctors',
		create: '/doctor/register',
		delete: (doctorId: string) => `/doctor/delete/${doctorId}`,
	},
	patients: {
		base: '/patients',
		getAll: '/patients',
		create: '/patients/register',
		getById: (patientId: string) => `/patient/${patientId}`,
		update: (patientId: string) => `/patient/update/${patientId}`,
	},
};
