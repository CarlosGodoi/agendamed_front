export interface IAppointmentsData {
	id: string;
	appointmentDateTime: string;
	status: string;
	observation: string;
	created_at: string;
	updated_at: string;
	patientId: string;
	doctorId: string;
	specialtyId: string;
	patient: {
		name: string;
		cpf: string;
		phone: string;
	};
	doctor: {
		name: string;
	};
	specialty: {
		name: string;
	};
}
