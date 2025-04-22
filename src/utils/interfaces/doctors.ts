export interface IDoctor {
	id: string;
	name: string;
	cpf: string;
	crm: string;
	created_at: string;
	updated_at: string;
	specialtyId: string;
	specialty: {
		name: string;
	};
}
