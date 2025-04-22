import React from 'react';
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AppointmentsReportsResponse } from '@/app/home';

interface IBarGraphicProps {
	data: AppointmentsReportsResponse;
}

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend
);

export const BarGraphic: React.FC<IBarGraphicProps> = ({ data }) => {
	const charData = {
		labels: data.monthlyData.map((item) => `Mês ${item.month}`),
		datasets: [
			{
				label: 'Consultas concluídas',
				data: data.monthlyData.map((item) => item.attendedAppointments),
				backgroundColor: 'rgba(144,238,144, 0.7)',
			},
			{
				label: 'Consultas agendadas',
				data: data.monthlyData.map((item) => item.scheduledAppointments),
				backgroundColor: 'rgba(255,215,0, 0.7)',
			},
		],
	};
	return (
		<div className="bg-white rounded-lg p-5 md:p-10 shadow-md w-1/2 min-w-[300px]">
			<Bar
				data={charData}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
					plugins: {
						legend: {
							position: 'top',
							fullSize: false,
						},
						title: {
							display: true,
							text: 'Gráfico de Consultas',
							padding: {
								top: 10,
								bottom: 10,
							},
						},
					},
				}}
				className="w-full h-[400px]"
			/>
		</div>
	);
};
