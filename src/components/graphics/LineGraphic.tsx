import React from 'react';
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AppointmentsReportsResponse } from '@/app/home';

interface ILineGraphicProps {
	data: AppointmentsReportsResponse;
}

ChartJS.register(
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend
);

export const LineGraphic: React.FC<ILineGraphicProps> = ({ data }) => {
	if (!data?.monthlyData?.length) return null;

	const chartLineData = {
		labels: data.monthlyData.map((item) => `Mês ${item.month}`),
		datasets: [
			{
				label: 'Consultas desmarcadas',
				data: data.monthlyData.map((item) => item.cancelledAppointments),
				borderColor: 'rgba(255,99,71, 0.7)',
				backgroundColor: 'rgba(255, 0, 0, 0.7)',
				fill: false,
				tension: 0.1,
			},
		],
	};

	return (
		<div className="bg-white rounded-lg p-5 md:p-10 shadow-md w-1/2 min-w-[300px]">
			<Line
				key={JSON.stringify(chartLineData)}
				data={chartLineData}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: { beginAtZero: true },
					},
					plugins: {
						legend: { position: 'top', fullSize: false },
						title: {
							display: true,
							text: 'Gráfico de Consultas',
							padding: { top: 10, bottom: 10 },
						},
					},
				}}
				className="w-full h-[400px]"
			/>
		</div>
	);
};
