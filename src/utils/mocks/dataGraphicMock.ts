interface DataGraphicMock {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string;
		borderColor: string;
		borderWidth: number;
	}[];
}

const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];
const appointmentsAttended = [59, 29, 15, 30, 26, 64, 10, 45, 100, 80, 73, 33];
const appointmentsScheduled = [100, 80, 73, 33, 59, 29, 15, 30, 26, 64, 10, 45];

export const dataGraphicMock: DataGraphicMock = {
	labels: months.map((month) => month),
	datasets: [
		{
			label: 'Consultas Atendidas',
			data: appointmentsAttended,
			backgroundColor: 'rgba(30, 64, 175, 1)',
			borderColor: 'rgba(59, 130, 246, 0.5)',
			borderWidth: 1,
		},
		{
			label: 'Consultas Agendadas',
			data: appointmentsScheduled,
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
			borderColor: 'rgba(248, 113, 113, 0.5)',
			borderWidth: 1,
		},
	],
};
