import { StatusType } from '../interfaces/status';

export interface IAppointmentsData {
	id: number;
	name: string;
	cpf: string;
	phone: string;
	created_at: string;
	doctorName: string;
	status: StatusType;
}

export const appointmentsDataMock: IAppointmentsData[] = [
	{
		id: 1,
		name: 'José da Silva',
		cpf: '123.456.789-00',
		phone: '(51) 99087-6788',
		created_at: '23/01/2025',
		doctorName: 'Eduardo da Cruz',
		status: 'AGENDADA',
	},
	{
		id: 2,
		name: 'João Pereira',
		cpf: '789.467.900-10',
		phone: '(51) 98677-3290',
		created_at: '13/01/2025',
		doctorName: 'Edvanio do Santos',
		status: 'CANCELADA',
	},
	{
		id: 3,
		name: 'Alessandra Santos',
		cpf: '543.213.879-02',
		phone: '(51) 97897-4522',
		created_at: '09/08/2024',
		doctorName: 'Roberta Antunes',
		status: 'CONCLUÍDA',
	},
	{
		id: 4,
		name: 'José da Silva',
		cpf: '123.456.789-00',
		phone: '(51) 99087-6788',
		created_at: '18/02/2025',
		doctorName: 'Eduardo da Cruz',
		status: 'AGENDADA',
	},
	{
		id: 5,
		name: 'João Pereira',
		cpf: '789.467.900-10',
		phone: '(51) 98677-3290',
		created_at: '23/02/2025',
		doctorName: 'Edvanio do Santos',
		status: 'CANCELADA',
	},
	{
		id: 6,
		name: 'Alessandra Santos',
		cpf: '543.213.879-02',
		phone: '(51) 97897-4522',
		created_at: '25/02/2025',
		doctorName: 'Roberta Antunes',
		status: 'CONCLUÍDA',
	},
	{
		id: 7,
		name: 'José da Silva',
		cpf: '123.456.789-00',
		phone: '(51) 99087-6788',
		created_at: '30/09/2024',
		doctorName: 'Eduardo da Cruz',
		status: 'AGENDADA',
	},
	{
		id: 8,
		name: 'João Pereira',
		cpf: '789.467.900-10',
		phone: '(51) 98677-3290',
		created_at: '07/02/2025',
		doctorName: 'Edvanio do Santos',
		status: 'CANCELADA',
	},
	{
		id: 9,
		name: 'Alessandra Santos',
		cpf: '543.213.879-02',
		phone: '(51) 97897-4522',
		created_at: '23/01/2025',
		doctorName: 'Roberta Antunes',
		status: 'CANCELADA',
	},
];
